var ServiceLayerContext = require('ServiceLayerContext.js');
var httpModule = require('HttpModule.js');
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

function POST() {
  var responseBody = '';
  var jsonObj = httpModule.request.getJsonObj();
  if (!jsonObj) {
    throw httpModule.ScriptException(httpModule.HttpStatus.HTTP_BAD_REQUEST, "missing request payload");
  }
  
  var order = Order.create(jsonObj);
  order.Comments = "Added via SL ScriptEngine";
  
  var slContext = new ServiceLayerContext();
  var res = slContext.Orders.add(order);
  
  if(!res.isOK()) {
    return httpModule.response.send(httpModule.HttpStatus.HTTP_BAD_REQUEST, res.body);
  } else {
    responseBody = '{ "Order": [{"DocEntry": ' + res.body.DocEntry + '}]}';
    return httpModule.response.send(httpModule.HttpStatus.HTTP_CREATED, responseBody);
  }
}
