sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";
    var that;
    return Controller.extend("project1.controller.View1", {
        onInit: function () {
            that = this;

            var oParameters = {
                urlParameters: {
                    "$expand": "itemDetails"
                }
            };
            that.getOwnerComponent().getModel().read("/WorkflowTaskCollection(SAPOrigin='ERP BE',WorkitemID=guid'1f5d6b28-911e-4ed2-9f44-5eb0d5674a30')/headerDetails", {
                urlParameters: oParameters.urlParameters,
                success: function (oData, response) {
                    // Handle successful response
                    console.log("Data received: ", oData);
                    console.log("Data response: ", response);
                },
                error: function (error) {
                    console.log("Error: ", error);
                }
            });
            
            
        }
    });
});
