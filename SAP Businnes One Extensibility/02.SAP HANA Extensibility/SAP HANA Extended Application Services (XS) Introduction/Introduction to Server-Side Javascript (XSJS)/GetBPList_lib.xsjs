// Complete Library Path and Library Name 
// in this case /RamsesProject/xsjs/sampleLib.xsjslib
$.import("RamsesProject.xsjs", "sampleLib");

// GetData_xsjslib.xsjs?bpType=C&top=5
var query = 'SELECT TOP ? "CardCode", "CardName", "CardType", "Balance" ' +
            'FROM "GRUPO_DAISA"."OCRD" WHERE "CardType"= ?';
var bpType = $.request.parameters.get('bpType');
var topNb = $.request.parameters.get('top');

// [Complete Library Path].[Library Name].[Library Function Name]
$.RamsesProject.xsjs.sampleLib.showData(query, bpType, topNb);