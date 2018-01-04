var ServiceLayerContext = require('ServiceLayerContext.js'),
    http = require('HttpModule.js'),
    SYS_PAGENTESVENTAS = require('EntityType/SYS_PAGENTESVENTAS.js');

function POST() {
    var jsonObj = http.request.getJsonObj();

    if(!jsonObj) {
        throw http.ScriptException(http.HttpStatus.HTTP_BAD_REQUEST, 'missing request payload');
    }
    http.response.send(http.HttpStatus.HTTP_CREATED, "PASO");
/**
    var sys_agentesventas = SYS_PAGENTESVENTAS.create(jsonObj);
    sys_agentesventas.U_SYS_SUCU = '001';
    console.log("ScriptSYS_PAGENTESVENTAS Modified " + JSON.stringify(sys_agentesventas));

    var slContext = new ServiceLayerContext();
    var res = slContext.SYS_PAGENTESVENTAS.create(sys_agentesventas);

    if (res.isOK()) {
        // http.response.send(http.HttpStatus.HTTP_CREATED, res.body);
        http.response.send(http.HttpStatus.HTTP_CREATED, "Exito");
    }
    else {
        // http.response.send(http.HttpStatus.HTTP_BAD_REQUEST, res.body);
        http.response.send(http.HttpStatus.HTTP_CREATED, "ERROR");
    }
 */
}
