var ServiceLayerContext = require('ServiceLayerContext.js');
var http = require('HttpModule.js');
var Order = require('EntityType/Document.js');

function GET() {
  var queryOption = "$select=DocNum, DocTotal, CardName, CardCode & $filter=contains(CardCode, 'B1DevELB1') & $top=5 & $orderby=CardCode",
      slContext = new ServiceLayerContext(),
      retCaseSensitive = slContext.Orders.query(queryOption),
      retCaseInsensitive = slContext.query("Orders", queryOption, true);

  http.response.setStatus(http.HttpStatus.HTTP_OK);
  http.response.setContent({ "CaseSensitive": retCaseSensitive.toArray(), "CaseInsensitive": retCaseInsensitive.toArray() });
  http.response.send();
}

/**
 * Entry function the POST http request.
 * POST /b1s/v1/scripts/SYS/OrderEntity
 *
 */
function POST() {
  var responseBody = '';

  // Check the http request body
  var jsonObj = http.request.getJsonObj();
  if (!jsonObj) {
    throw http.ScriptException(
        http.HttpStatus.HTTP_BAD_REQUEST, "Fail to get the content of JSON format from the request payload");
  }

  // Initialize the Order variable with the http request body
  var order = Order.create(jsonObj);
  // Add the specific comment
  order.Comments = "Created via ServiceLayer Script Engine";
  // User console.logs to better understand your script's behaviour
  console.log("OrderComment request body " + JSON.stringify(order));

  // Initialize Service Layer Context
  var slContext = new ServiceLayerContext();

  // Add the Orders entity
  var dataSrvRes = slContext.Orders.add(order);
  
  if(!dataSrvRes.isOK()) {
    return http.response.send(http.HttpStatus.HTTP_BAD_REQUEST, dataSrvRes.body);
  }
  // Add operation succesfully executed
  else {
    // Return only Docentry, DocNum, DocTotal and Comments properties
    responseBody = '{ "Order": [{"DocEntry": ' + dataSrvRes.body.DocEntry + ', "DocNum": ' + dataSrvRes.body.DocNum +
      ', "DocTotal": ' + dataSrvRes.body.DocTotal + ', "Comments": "' + dataSrvRes.body.Comments + '"}]}';
    return http.response.send(http.HttpStatus.HTTP_CREATED, responseBody);
  }
}


/**
 * Entry function the GET http request.
 * Returns only fields DocEntry, DocNum, DocTotal and Comments
 * GET /b1s/v1/script/SYS/OrderEntity(key)
 *
 */

function GET() {
  var responseBody = "";
  // Get the Order's key from the http request key value
  var key = http.request.getEntituKey();
  if (!key) {
    throw http.ScriptException(http.HttpStatus.HTTP_BAD_REQUEST, "Fail to get entity key from request URL");
  }

  // Initialize Service Layer Context
  var slContext = new ServiceLayerContext();

  // Retrieve the Order from Service Layer context
  var dataSrvRes = slContext.Orders.get(key);
  // Order retrieve operation failed
  if (!dataSrvRes.isOK()) {
    http.response.send(dataSrvRes.state, dataSrvRes.body);
  }
  // Order retrieved succesfully
  else {
    responseBody = '{ "Order": [{"DocEntry": ' + dataSrvRes.body.DocEntry + ', "DocNum": ' + dataSrvRes.body.DocNum +
      ', "DocTotal": ' + dataSrvRes.body.DocTotal + ', "Comments": "' + dataSrvRes.body.Comments + '"}]}';
    http.response.send(dataSrvRes.status, responseBody);
  }
}


/**
 * Entry function the PATCH http request.
 * PATCH /b1s/v1/script/SYS/OrderEntity(key)
 *
 * {"Comments": "Updated from Script Engine"}
 */

function PATH() {
  // Get the Order's key from the http request key value
  var key = http.request.getEntityKey();
  if (!key) {
    throw http.ScriptException(http.HttpStatus.HTTP_BAD_REQUEST, "Fail to get entity key from request URL");
  }

  // Check the http request body
  var jsonObj = http.request.getJsonObj();
  if (!jsonObj) {
    throw http-ScriptException(http.HttpStatus.HTTP_BAD_REQUEST, "fail to get content of JSON format the request payload");
  }

  // Initialize Service Layer Context
  var slContext = new ServiceLayerContext();

  // Update the Orders entity
  var dataSrvRes = slContext.Orders.update(jsonObj, key);
  // Order updated successfully
  if (dataSrvRes.isOK()) {
    http.response.send(dataSrvRes.status, dataSrvRes.body);
  }
  // Order Updated operation failed
  else {
    http.response.send(dataSrvRes.status, dataSrvRes.body);
  }
}


/**
 * Entry function the FELETE http request
 * DELETE /b1s/v1/scripts/SYS/OrderEntity(key)
 *
 * Operation Not implemented for this entity
 */
function DELETE() {
  http.response.setStatus(http.HttpStatus.HTTP_NOT_IMPLEMENTED);
  http.response.send();
}