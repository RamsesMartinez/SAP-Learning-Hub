var ServiceLayerContext = require('ServiceLayercontext.js');
var http = require('HttpModule.js');
var Order = require('EntityType/Document.js');

function POST() {
  var responseBody = '';
  var jsonObj = http.request.getJsonObject();
  if (!jsonObj) {
    throw http.ScriptException(http.HttpStatus.HTTP_BAD_REQUEST, "missing request payload");
  }
  
  var order = Order.create(jsonObj);
  order.Comments = "Added via SL ScriptEngine";
  
  var slContext = new ServiceLayerContext();
  var res = slContext.Orders.add(order);
  
  if(!res.isOK()) {
    return http.response.send(http.HttpStatus.HTTP_BAD_REQUEST, res.body);
  } else {
    responseBody = "{ \"Order\": [{\"DocEntry\": " + res.body.DocEntry + "]}}";
    return http.response.send(http.HttpStatus.HTTP_CREATED, responseBody);
  }
}
