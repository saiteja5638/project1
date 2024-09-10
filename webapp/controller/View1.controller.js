sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";
    var that;
    return Controller.extend("project1.controller.View1", {
        onInit: function () {
            that = this;

            // var oParameters = {
            //     urlParameters: {
            //         "$expand": "itemDetails"
            //     }
            // };
            // that.getOwnerComponent().getModel().read("/WorkflowTaskCollection(SAPOrigin='ERP BE',WorkitemID=guid'1f5d6b28-911e-4ed2-9f44-5eb0d5674a30')/headerDetails", {
            //     urlParameters: oParameters.urlParameters,
            //     success: function (oData, response) {
            //         // Handle successful response
            //         console.log("Data received: ", oData);
            //         console.log("Data response: ", response);
            //     },
            //     error: function (error) {
            //         console.log("Error: ", error);
            //     }
            // });
            
            
        },
        onPressNavToDetail: function () {
            this.getSplitAppObj().to(this.createId("detailDetail"));
        },

        onPressDetailBack: function () {
            this.getSplitAppObj().backDetail();
        },

        onPressMasterBack: function () {
            this.getSplitAppObj().backMaster();
        },

        onPressGoToMaster: function () {
            this.getSplitAppObj().toMaster(this.createId("_IDGenPage2"));
        },

        onListItemPress: function (oEvent) {
            var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

            this.getSplitAppObj().toDetail(this.createId(sToPageId));
        },

        onPressModeBtn: function (oEvent) {
            var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

            this.getSplitAppObj().setMode(sSplitAppMode);
            MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, { duration: 5000 });
        },

        getSplitAppObj: function () {
            var result = this.byId("_IDGenSplitApp");
            if (!result) {
                Log.info("SplitApp object can't be found");
            }
            return result;
        }
    });
});
