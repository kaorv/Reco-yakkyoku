const bleno = require("bleno");
const BlenoPrimaryService = bleno.PrimaryService;
const SERVECE_UUID = "B05A6F6D-6164-4384-A062-B4FE8C8FA900"; 
const CHARACTERISTIC_UUID = "95D10367-A094-4698-A995-1102A8C701BB"; 
const DEVICE_NAME = "test-peripheral-device-reco";

const Characteristic = bleno.Characteristic;
const characteristic = new Characteristic({
  uuid: CHARACTERISTIC_UUID,
  properties: ["read","write","notify"],
  value: null,
  onWriteRequest: (data, offset, withoutResponse, callback) => {
    console.log("centralからwriteリクエストを受けました");
    this.value = data;
    thisname = data;
    console.log( "受け取ったメッセージ = " + data);
  }
});

bleno.on("stateChange", (state) => {
  console.log(`on -> stateChange: ${state}`);
  if (state === "poweredOn") {
    bleno.startAdvertising(DEVICE_NAME, [SERVECE_UUID]);
  } else {
    bleno.stopAdvertising();
  }
});
//advertise
bleno.on("advertisingStart", (error) => {
  console.log(`on -> advertisingStart: ${(error ? "error " + error : "success")}`);
  if(error) return;

  const discover = new BlenoPrimaryService({
    uuid: SERVECE_UUID,
    characteristics: [characteristic]
  });
  bleno.setServices([discover]);  
});