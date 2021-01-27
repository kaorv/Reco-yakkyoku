var router = require("express").Router();
//macではbleno-mac winではbleno
//const bleno = require("bleno-mac");
const bleno = require('bleno');
const BlenoPrimaryService = bleno.PrimaryService;
//アドバタイズ情報
const SERVECE_UUID = "B05A6F6D-6164-4384-A062-B4FE8C8FA900"; 
const CHARACTERISTIC_UUID = "95D10367-A094-4698-A995-1102A8C701BB"; 
const DEVICE_NAME = "test-peripheral-device-reco";
var webclient = require("request");

const domain = "~"

//bluetooth認証処理
router.get("/bleauth/",(req,res) => {
  const Characteristic = bleno.Characteristic;
  const characteristic = new Characteristic({
    uuid: CHARACTERISTIC_UUID,
    properties: ["write"],
    value: null,
    //writerequestがあったら呼び出される
    onWriteRequest: (data, offset, WriteWithoutResponse, callback) => {
      console.log("centralからwriteリクエストを受けました");
      //渡ってきたusernameをdataに格納する
      this.value = data;
      // bleno.stopAdvertising();
      // thisname = data;
      console.log( "受け取ったメッセージ = " + data);
      //res.render("./search/index.ejs",{data:data,domain:domain})
      //awsのパブリックDNSを添付
      let url = 'https://' + domain + ':49160/webcam?username='+ data +'&password=pass';
      // let url ="https://www.oit.ac.jp/japanese/topics/index.php?i=6226";
      console.log(`${url} : に移動します。`);
      //res.redirect(url);
      res.writeContinue()
      res.writeHead(302,{
        'Location':url
      });           
      res.end();
    }
  });
  //bluetoothがonになったら呼ばれる
  bleno.on("stateChange", (state) => {
    console.log(`on -> stateChange: ${state}`);
    // bleno.startAdvertising(DEVICE_NAME, [SERVECE_UUID]);
    if (state === "poweredOn") {
      bleno.startAdvertising(DEVICE_NAME, [SERVECE_UUID]);
    }
    // else {
    //   state = "poweredOn"
    //   bleno.startAdvertising(DEVICE_NAME, [SERVECE_UUID]);
    // }
  });
  //アドバタイズ開始
  bleno.on("advertisingStart", (error) => {
    console.log(`on -> advertisingStart: ${(error ? "error " + error : "success")}`);
    if(error) return;
  
    const discover = new BlenoPrimaryService({
      uuid: SERVECE_UUID,
      characteristics: [characteristic]
    });
    bleno.setServices([discover]);
    
  });
});

module.exports = router;