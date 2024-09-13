sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";
    var that;
    return Controller.extend("project1.controller.View1", {
        onInit: function () {
            that = this;
        },
        ReadCall:function()
        {
            that.getOwnerComponent().getModel().read("/QUOT_HEADER_DATA",{
                success:function(response)
                {
   
                },
                error:function(error)
                {
                    console.log(error)
                }
            })
        }

    });
});
