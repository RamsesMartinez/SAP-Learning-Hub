var ServiceLayerContext = require('ServiceLayerContext.js');
var http = require('HttpModule.js');
var Order = require('EntityType/Document.js');
var DeliveryNote = require('EntityType/Document.js');

function POST() {
  var responseBody = '';
  var jsonObj = http.request.getJsonObj();
  
  if (!jsonObj) {
    throw http.ScriptException(http.HttpStatus.HTTP_BAD_REQUEST, 'missing request payload');
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
    return http.response.send(http.HttpStatus.HTTP_BAD_REQUEST, res.body);
  }
  // get the newly created order from the response body
  var newOrder = Order.create(res.body);
  
  // create a delivery based on the order 
  var deliveryNote = new DeliveryNote();
  deliveryNote.DocDueDate = newOrder.DocDueDate;
  deliveryNote.CardCode = nerOrder.CardCode;
  deliveryNote.DocumentLines = new DeliveryNote.DocumentLineCollection();
  
  for (var ln = 0; ln < order.DocumentLines.length; ++ln) {
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
    return http.response.send(http.HttpStatus.HTTP_BAD_REQUEST, res.body);
  }
  else {
    slContext.commitTransaction();
    /**
    * responseBody = "{ \"Order\": [{\"DocEntry\":" + newOrder.DocEntry
    *   + "}], \"DeliveryNote\": [{\"DocEntry\":" + res.body.DocEntry +"}]}";
    */
    
    responseBody = '{"Order": [{"DocEntry":' + newOrder.DocEntry + 
      '}], "DeliveryNote": [{"DocEntry":' + res.body.DocEntry +'}]}';
    return http.response.send(http.HttpStatus.HTTP_CREATED, responseBody);
  }
}
