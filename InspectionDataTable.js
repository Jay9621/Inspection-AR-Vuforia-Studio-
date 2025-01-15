// Create an InfoTable with the inspection data
var params = {
    values: {
        srNo: srNo, // Number
        inspectionDetail: inspectionDetail, // String
        comment: comment, // String
        username: username, // String
        passFail: passFail // String
    }
};

// Add the row to the Data Table
Things["TSDPL_P1_DataTable"].AddDataTableEntry(params);
