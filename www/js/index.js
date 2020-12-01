function getdis() {
    var n=2;
    document.addEventListener("deviceready", onDeviceReady, false);
    };

function onDeviceReady() {
 
        var beaconslot=[
          //  [identifier, uuid, major, minor],
            ["beacon2", '1233aacc-0dc1-40a7-8085-303a6d64ddb5', "4", "54"],
            ["beacon1", '1233aacc-0dc1-40a7-8085-303a6d64ddb5', "4", "55"],
            ["beacon3", '1233aacc-0dc1-40a7-8085-303a6d64ddb5', "4", "58"]
        ];

    // delegateの作成と設定
    var delegate = new cordova.plugins.locationManager.Delegate();
    
 
    delegate.didRangeBeaconsInRegion = function(pluginResult) {
        var beaconData = pluginResult.beacons[0];
        n=document.getElementById("nnum").value;
        document.getElementById("num").innerHTML="<div>N= "+ n +"</div>";
        distancebe=((Math.pow(10.0, (beaconData.tx - beaconData.rssi) / (10.0*n) )));//距離の計算
        var susdis=beaconData.proximity
        if(susdis=="ProximityNear")
        {susdis2="near";
        }else if(susdis=="ProximityFar"){
            susdis2="far";
        }
        else  if(susdis=="ProximityImmediate"){
            susdis2="immediate";
        };
            var setid ="beacon"+pluginResult.beacons[0].minor;
            document.getElementById(setid).innerHTML = "<div><p>ID:"+pluginResult.beacons[0].major+"   status:"+pluginResult.beacons[0].minor+"</p><p>"+" 距離 = "+distancebe+"  推定:"+susdis2+"</p></div>";

            
        //log
        if(logging==true){
            loglog(beaconData);
        }
        };
    // delegate の設定
    cordova.plugins.locationManager.setDelegate(delegate);
    //
    beaconslot.forEach(function(beaconslot) {

        cordova.plugins.locationManager.startRangingBeaconsInRegion(new cordova.plugins.locationManager.BeaconRegion(beaconslot[0],beaconslot[1],beaconslot[2],beaconslot[3]))
        .fail(function(e) { console.error(e); })
        .done(); 

        
   });


    }
///////////logging
var logging =false;
var logitem=[];
    function startlog(){
        
        logging =true;
        console.log(logging);
    };
    
    function loglog(beaconData){
        let date = new Date();
        let starttime=date.getFullYear()
        + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
        + '/' + ('0' + date.getDate()).slice(-2)
        + ' ' + ('0' + date.getHours()).slice(-2)
        + ':' + ('0' + date.getMinutes()).slice(-2)
        + ':' + ('0' + date.getSeconds()).slice(-2)
            let logele=[starttime,beaconData.major,beaconData.minor,distancebe]
         logitem.push(logele);
         console.log(logitem);
    };
        
    function  stoplog(){
        logging =false;


    };
   function  handleDownload(){
       console.log(logitem);
        //savelog
        let csvContent = "data:text/csv;charset=utf-8\n" 
      + logitem.map(e => e.join(",")).join("\n");

      console.log(csvContent);

      //DL csv
      var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
      var content = csvContent;
      var blob = new Blob([ bom, content ], { "type" : "text/csv" });
    
    //
    window.requestFileSystem(LocalFileSystem.TEMPORARY, 0,
        function(fileSystem) {
    createFile(fileSystem.root, blob, "sample.csv");
        });
    function createFile(dirEntry, fileData, fileName) {
        dirEntry.getFile(fileName, { create: true, exclusive: false }, 
          function (fileEntry) {
             // ファイルの保存先
            console.log(fileEntry.toURL());
      
            // ファイルへの書き込み
            writeFile(fileEntry, fileData);
          }, function(e) {
            console.log("error: " + e.code);
          }
        );
      }

      function writeFile(fileEntry, dataObj) {
        fileEntry.createWriter(function (fileWriter) {
      
          fileWriter.onwriteend = function() {
            alart("保存完了");
            console.log("Success write()");
          };
          fileWriter.onerror = function(e) {
            console.log("Failed file write: " + e.toString());
          };
      
          fileWriter.write(dataObj);
        });
      }

   }

   
    getdis();
