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
    getdis();
