sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("project1.controller.App", {
        onInit: function() {
        },
        onSideNavButtonPress:function(oEvent)
        {
          if(oEvent.mParameters.item.mProperties.key=="Home")
          {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
              oRouter.navTo("View1");
          }
          else
          {
            var oToolPage = this.byId("toolPage");
            var bSideExpanded = oToolPage.getSideExpanded();
  
            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
          }
       
        }
      });
    }
  );
  