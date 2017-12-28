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

showData(Statement, 'C', 100);