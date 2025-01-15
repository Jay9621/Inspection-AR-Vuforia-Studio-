logger.warn("cart value is: " + cart);
var jsonInput = cart;

logger.warn("json input value is: " + jsonInput.array);

/////////////////////

/*
 * Input: jsonInput (JSON) 
 */
var params = {

    infoTableName: "InfoTable",
    dataShapeName : "TSDPL_P1_DataShape"
};
var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);

logger.warn("json input value is: " + jsonInput.array.length);

for(let i=0; i<jsonInput.array.length; i++){
  //Get object
  let json = jsonInput.array[i];
  
  //Adding fields for all attributes
  let keys = Object.keys(json);
    
     logger.warn("json keys value is: " + keys);
    
  for (let i = 0; i < keys.length; i++) {
   result.AddField({ name: keys[i], baseType: 'STRING' });
  }


  //Adding object
  result.AddRow(json);
}
me.json_data = result;
me.AddOrUpdateDataTableEntries({
	sourceType: undefined /* STRING */,
	values: result /* INFOTABLE */,
	location: undefined /* LOCATION */,
	source: undefined /* STRING */,
	tags: undefined /* TAGS */
});
logger.warn("json data: " + result);
