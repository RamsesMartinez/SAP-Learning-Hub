var ServiceLayerContext = require('ServiceLayerContext.js');
var httpModule = require('HttpModule.js');
var Order = require('EntityType/Document.js');
var DeliveryNote = require('EntityType/Document.js');

function GET() {
  var respondeBody = '';
}
function POST() {
  var responseBody = '';
  var jsonObj = httpModule.request.getJsonObj();
  
  if (!jsonObj) {
    throw httpModule.ScriptException(httpModule.HttpStatus.HTTP_BAD_REQUEST, 'missing request payload');
  }
  var order = Order.create(jsonObj);
  order.Comments = 'Added via SL ScriptEngine';
  
  var slContext = new ServiceLayerContext();
  
  // start the transaction
  slContext.startTransaction();
  // create the order 
  var res = slContext.Orders.add(order);
  if (!res.isOK()) {
    slContext.rollbackTransaction();
    return httpModule.response.send(httpModule.HttpStatus.HTTP_BAD_REQUEST, res.body);
  }
  // get the newly created order from the response body
  var newOrder = Order.create(res.body);
  
  // create a delivery based on the order 
  var deliveryNote = new DeliveryNote();
  deliveryNote.DocDueDate = newOrder.DocDueDate;
  deliveryNote.CardCode = newOrder.CardCode;
  deliveryNote.DocumentLines = new DeliveryNote.DocumentLineCollection();

  for (var lineNum = 0; lineNum < order.DocumentLines.length; ++lineNum ) {
    var line = new DeliveryNote.DocumentLine();
    line.BaseType = 17;
    line.BaseEntry = newOrder.DocEntry;
    line.BaseLine = lineNum;
    deliveryNote.DocumentLines.add(line);
  }
  // Create Delivery Note 
  res = slContext.DeliveryNotes.add(deliveryNote);
  
  // end the transaction: rollback or commit
  if (!res.isOK()) {
    slContext.rollbackTransaction();
    return httpModule.response.send(httpModule.HttpStatus.HTTP_BAD_REQUEST, res.body);
  }
  else {
    slContext.commitTransaction();
    /**
    * responseBody = "{ \"Order\": [{\"DocEntry\":" + newOrder.DocEntry
    *   + "}], \"DeliveryNote\": [{\"DocEntry\":" + res.body.DocEntry +"}]}";
    */
    
    responseBody = "{\"Order\": [{\"DocEntry\":"+ newOrder.DocEntry +
      "}], \"DeliveryNote\": [{\"DocEntry\":"+ res.body.DocEntry +"}]}";
    return httpModule.response.send(httpModule.HttpStatus.HTTP_CREATED, responseBody);
  }
}

