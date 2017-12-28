function showData(query, bpType, topNb) {
  var conn = $.hdb.getConnection();
  var rs = conn.executeQuery(query, topNb, bpType);
  
  $.response.contentType = "application/json"; // Specify output
  $.response.setBody(JSON.stringify(rs));
  $.response.status = $.net.http.OK;
  
  conn.close();
  
}

var Statement = 'SELECT TOP ? "CardCode", "CardName", "Balance"' +
                'FROM "GRUPO_DAISA"."OCRD" WHERE "CardType" = ?';
                
var CardType = $.request.parameters.get("bpType");
var Records  = $.request.parameters.get("top");

/**
* receive a url like the following:
* http://hanatest02:8000/RamsesProject/xsjs/GetBPList_Parameters.xsjs?bpType=C&top=5
*/
showData(Statement, CardType, Records);

