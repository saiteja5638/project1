sap.ui.define([
    "sap/ui/core/mvc/Controller",
      "sap/m/MessageToast"
],
function (Controller,MessageToast) {
    "use strict";
    var that;
    return Controller.extend("project1.controller.View1", {
        onInit: function () {
            that = this;

            const wsUrl = "wss://060a0275trial-dev-websockects-srv.cfapps.us10-001.hana.ondemand.com";
            this.ws = new WebSocket(wsUrl);
            this.base64String = ""; // Initialize to store chunks

            // WebSocket event handlers
            this.ws.onopen = () => {
                MessageToast.show("Connected to WebSocket server");
            };

            this.ws.onmessage = (event) => {
                const message = JSON.parse(event.data);

                switch (message.action) {
                    case "onFileTransferStart":
                        this.onFileTransferStart(message);
                        break;
                    case "onFileTransferChunk":
                        this.onFileTransferChunk(message.stringData);
                        break;
                    case "onFileTransferComplete":
                        this.onFileTransferComplete(message.ID);
                        break;
                    case "onFileTransferError":
                        MessageToast.show("Error: " + message.error);
                        break;
                    default:
                        console.warn("Unknown action:", message.action);
                }
            };

            this.ws.onclose = () => {
                MessageToast.show("WebSocket connection closed");
            };

   
        },
        onFileTransferStart: function (message) {
            MessageToast.show("File transfer started for file ID: " + message.ID);
            this.base64String = ""; // Reset base64 string
        },

        onFileTransferChunk: function (chunk) {
            this.base64String += chunk; // Append each chunk to the base64 string
        },

        onFileTransferComplete: function (fileID) {
            MessageToast.show("File transfer complete for file ID: " + fileID);
            console.log( this.base64String)

            var videoPath = this.base64String
            var htmlContent = "<video width='320' height='240' controls>";
            htmlContent += "<source src='" + videoPath + "' type='video/mp4'>";
            htmlContent += "Your browser does not support the video tag.";
            htmlContent += "</video>";

            var htmlVideo = new sap.ui.core.HTML({
                content: htmlContent
            });
            var oPage = that.getView().byId("_IDGenPage");
            htmlVideo.placeAt(oPage);
            console.log("plage")
        },
        handleFileChange: function(oEvent) {
            var oFile = oEvent.getParameter("files")[0];
            var reader = new FileReader();

            reader.onload = function(e) {
                var base64Data = e.target.result;
                // Now you have the Base64 string of the MP4 file
                console.log(base64Data);
                this.handleActionCall(base64Data);
            }.bind(this);

            reader.readAsDataURL(oFile);
        },
        handleActionCall: function(base64Data) {
 
            that.getOwnerComponent().getModel().callFunction("/onWaiting", {
                method: "GET",
                urlParameters: {
                    ID: '856'
                },
                success: function(oData, response) {
                    
                    console.log(oData);
                },
                error: function(oError) {
                
                    console.error(oError);
                }
            });
      
        },
        onSubmt:function()
        {
             that.getOwnerComponent().getModel().read('/E_LEARN',{
                success:function(response)
                {
                    console.log(response)
                },
                error:function(er)
                {
                    console.log(er)
                }
             })
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
            // that.getOwnerComponent().getModel().read("/QUOT_HEADER_DATA",{
            //     success:function(response)
            //     {
   
            //     },
            //     error:function(error)
            //     {
            //         console.log(error)
            //     }
            // })
        },
        onListBinding:function()
        {
            // let getKey = that.byId("IconTabFilter").mAggregations._header.getSelectedKey()
            // if (getKey == "Plantsinfo") {

            //     if(that.byId("ListData").getItems().length>0)
            //         {
            //             that.byId("ListData").getItems().forEach(i=>{
            //                that.byId("ListData").removeItem(i)
            //             })
                        
            //         }

            //     that.getOwnerComponent().getModel().read("/QUOT_HEADER_DATA",{
            //         success:function(response)
            //         {
            //             let res_data = response.results;
            //             let List =  that.byId("ListData")
            //             res_data.forEach(element => {
            //                 let Item = new sap.m.StandardListItem({
            //                      title:element.ZQUOTATION,
            //                      description:element.NAME1,
            //                      info:element.ORT01
            //                 })
            //                 List.addItem(Item)
            //             });
            //         },
            //         error:function(error)
            //         {
            //             console.log(error)
            //         }
            //     })

            // }
            // if (getKey == "QualityInfo") {
            //     if(that.byId("ListData").getItems().length>0)
            //         {
            //             that.byId("ListData").getItems().forEach(i=>{
            //                that.byId("ListData").removeItem(i)
            //             })
                        
            //         }
            //         that.getOwnerComponent().getModel().read("/QUOT_ITEM_DATA",{
            //             success:function(response)
            //             {
            //                 let res_data = response.results;
            //                 let List =  that.byId("ListData")
            //                 res_data.forEach(element => {
            //                     let Item = new sap.m.StandardListItem({
            //                          title:element.MATNR,
            //                          description:element.MAKTX,
            //                          info:element.ZQUOTATION
            //                     })
            //                     List.addItem(Item)
            //                 });
            //             },
            //             error:function(error)
            //             {
            //                 console.log(error)
            //             }
            //         })
            // }
        }

    });
});
