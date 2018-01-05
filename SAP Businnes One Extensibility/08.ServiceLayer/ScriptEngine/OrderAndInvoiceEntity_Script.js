/**
 * Description: Create an order and create a delivery based on the order in a global transaction.
 *
 */
var ServiceLayerContext = require('ServiceLayerContext.js');
var httpModule = require('HttpModule.js');
var Order = require('EntityType/Document.js');
var Invoice = require('EntityType/Document.js');


/**
 * Entry function the POST http request.
 * POST /b1s/v1/script/SYS/OrderAndInvoiceEntity
 * {
 *  "CardCode": "B1DevELB1",
 *  "DocDate": "2018-05-01",
 *  "DocDueDate": "2018-05-01",
 *  "DocumentLines": [
 *    {
 *      "ItemCode": ".CO-1213ESY",
 *      "UnitPrice": 3653,
 *      "Quantity": 1
 *    },
 *    {
 *      "ItemCode": "AQ07R3827AW-52",
 *      "Quantity": 3
 *    }
 *  ]
 * }
 */
function POST() {
  var responseBody = '';

  // Check the http request body
  var jsonObj = httpModule.request.getJsonObj();
  
  if (!jsonObj) {
    throw httpModule.ScriptException(httpModule.HttpStatus.HTTP_BAD_REQUEST, 'fail to get the content of JSON format from the request payload');
  }

  // Initialize the Order variable with http request body
  var order = Order.create(jsonObj);
  order.Comments = 'Created via Service Layer Script Engine';
  console.log("OrderAndInvoiceEntity request body " + JSON.stringify(order));

  // Initialize Service Layer Context
  var slContext = new ServiceLayerContext();
  
  // Start the global transaction
  slContext.startTransaction();
  // Create the Orders Entity
  var dataSrvRes = slContext.Orders.add(order);

  // Add the Orders entity
  if (!dataSrvRes.isOK()) {
    // Rollback the global transaction
    slContext.rollbackTransaction();
    return httpModule.response.send(httpModule.HttpStatus.HTTP_BAD_REQUEST, dataSrvRes.body);
  }

  // Get the newly created order as a variable from the response body
  var newOrder = Order.create(dataSrvRes.body);
  
  // Fill the invoice variable based on the order
  var invoice = new Invoice();
  invoice.DocDate = newOrder.DocDate;
  invoice.DocDueDate = newOrder.DocDueDate;
  invoice.CardCode = newOrder.CardCode;
  invoice.DocumentLines = new Invoice.DocumentLineCollection();

  for (var lineNum = 0; lineNum < order.DocumentLines.length; ++lineNum ) {
    var line = new Invoice.DocumentLine();
    line.BaseType = 17;
    line.BaseEntry = newOrder.DocEntry;
    line.BaseLine = lineNum;
    invoice.DocumentLines.add(line);
  }

  // Add the Invoice entity
  dataSrvRes = slContext.Invoices.add(invoice);
  
  // End the transaction: rollback or commit
  if (!dataSrvRes.isOK()) {
    // Rollback the global transaction
    slContext.rollbackTransaction();
    return httpModule.response.send(httpModule.HttpStatus.HTTP_BAD_REQUEST, dataSrvRes.body);
  }
  else {
    // Commit the global transaction
    slContext.commitTransaction();
    // Return only DocEntry, DocNum, DocTotal and Comments properties from the Order and the Invoice

    responseBody = '{"Order": [{"DocEntry": ' + newOrder.DocEntry + ', "DocNum": ' + newOrder.DocNum + ', "DocTotal": ' + newOrder.DocTotal + ', "Comments": "' + newOrder.Comments + '"}],' +
      '"Invoice": [{"DocEntry": ' + dataSrvRes.body.DocEntry + ', "DocNum": ' + dataSrvRes.body.DocNum + ', "DocTotal": ' + dataSrvRes.body.DocTotal + ', "Comments": "' + dataSrvRes.body.Comments + '"}]}';
    return httpModule.response.send(httpModule.HttpStatus.HTTP_CREATED, responseBody);
  }
}


/**
 * Entry function the GET http request.
 * Returns only fields DocEntry, DocNum, DocTotal and Comments
 * GET /b1s/v1/script/SYS/OrderAndInvoiceEntity(key)
 *
 */
function GET() {
  http.response.setStatus(http.HttpStatus.HTTP_NOT_IMPLEMENTED);
  http.response.send();
}


/**
 * Entry function the PATCH http request.
 * PATCH /b1s/v1/script/SYS/OrderAndInvoiceEntity(key)
 *
 * {"Comments": "Updated from Script Engine"}
 */
function PATCH() {
  http.response.setStatus(http.HttpStatus.HTTP_NOT_IMPLEMENTED);
  http.response.send();
}


/**
 * Entry function the DELETE http request.
 * DELETE /b1s/v1/script/SYS/OrderAndInvoiceEntity(key)
 *
 */
function DELETE() {
  http.response.setStatus(http.HttpStatus.HTTP_NOT_IMPLEMENTED);
  http.response.send();
}
