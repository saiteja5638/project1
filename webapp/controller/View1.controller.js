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
        onUpload:function(Event)
        {
            let upload_item =  that.byId("_IDGenFileUploader")   
            let get_upload_item = Event.getParameter('files')[0]
            
            let fileReader =  new FileReader()

            fileReader.onload = function(oEvent)
            {
                let Data = oEvent.target.result
                console.log(Data)

                
            }.bind(this)

            fileReader.readAsDataURL(get_upload_item)
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
        },
        onListBinding:function()
        {
            let getKey = that.byId("IconTabFilter").mAggregations._header.getSelectedKey()
            if (getKey == "Plantsinfo") {

                if(that.byId("ListData").getItems().length>0)
                    {
                        that.byId("ListData").getItems().forEach(i=>{
                           that.byId("ListData").removeItem(i)
                        })
                        
                    }

                that.getOwnerComponent().getModel().read("/QUOT_HEADER_DATA",{
                    success:function(response)
                    {
                        let res_data = response.results;
                        let List =  that.byId("ListData")
                        res_data.forEach(element => {
                            let Item = new sap.m.StandardListItem({
                                 title:element.ZQUOTATION,
                                 description:element.NAME1,
                                 info:element.ORT01
                            })
                            List.addItem(Item)
                        });
                    },
                    error:function(error)
                    {
                        console.log(error)
                    }
                })

            }
            if (getKey == "QualityInfo") {
                if(that.byId("ListData").getItems().length>0)
                    {
                        that.byId("ListData").getItems().forEach(i=>{
                           that.byId("ListData").removeItem(i)
                        })
                        
                    }
                    that.getOwnerComponent().getModel().read("/QUOT_ITEM_DATA",{
                        success:function(response)
                        {
                            let res_data = response.results;
                            let List =  that.byId("ListData")
                            res_data.forEach(element => {
                                let Item = new sap.m.StandardListItem({
                                     title:element.MATNR,
                                     description:element.MAKTX,
                                     info:element.ZQUOTATION
                                })
                                List.addItem(Item)
                            });
                        },
                        error:function(error)
                        {
                            console.log(error)
                        }
                    })
            }
        }

    });
});
