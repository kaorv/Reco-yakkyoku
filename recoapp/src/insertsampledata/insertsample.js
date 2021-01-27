/* 
  description
  -------------------------
   これはサンプルデータを挿入するためのものである.
   追加でデータを挿入する場合は基本別ファイルで行い
   この中身は変更しないものとする
*/

const mysql = require('mysql');

var mysql_setting = {
  host     : 'mysql',
  user     : 'root',
  password : 'pass',
  database : 'todo',
  };

//uerinfo

//-----------------------------------sample-----------------------------------------------
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const employee = { username: 'sample', email: 'sample@email.com' , password: 'pass'};
  connection.query('INSERT INTO userinfo SET ?', employee, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();
//----------------------------------------------------------------------------------------

//symptom1
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const symptom1 = { type1: '頭痛', description: 'This symptom was a headache.',srcurl: "/public/uiimages/head.png",srcurl2: "/public/uiimages/head_white.png" };
  connection.query('INSERT INTO symptom SET ?', symptom1, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

//symptom2
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const symptom2 = { type1: 'お腹', description: 'This symptom was a stomachache.',srcurl: "/public/uiimages/stomach.png",srcurl2: "/public/uiimages/stomach_white.png" };
  connection.query('INSERT INTO symptom SET ?', symptom2, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

//symptom3
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const symptom3 = { type1: '風邪', description: 'This symptom was a cold.',srcurl: "/public/uiimages/cold.png",srcurl2: "/public/uiimages/cold_white.png" };
  connection.query('INSERT INTO symptom SET ?', symptom3, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

//symptom4
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const symptom4 = { type1: '鼻炎', description: 'This symptom was a nose.',srcurl: "/public/uiimages/nose.png",srcurl2: "/public/uiimages/nose_white.png" };
  connection.query('INSERT INTO symptom SET ?', symptom4, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

// ナロンメディカル
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const item1 = { item:"ナロンメディカル",description:"This medicine is a cold medicine.",type1:"頭痛",type2:"風邪",limitednum:2 ,value:980,Ban:"ナロンエースR",link:"/public/uiimages/medicine/naronm/naron_m.JPG",modallink1:"/public/uiimages/medicine/naronm/naron-m-memo1.png",modallink2:"/public/uiimages/medicine/naronm/naron-m-memo2.png",modallink3:"/public/uiimages/medicine/naronm/naron-m-memo3.png" };
  connection.query('INSERT INTO item SET ?', item1, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

// ナロンエースR
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const item2 = { item:"ナロンエースR",description:"This medicine is a cold medicine.",type1:"頭痛",type2:"風邪",limitednum:1 ,value:760,Ban:"ナロンメディカル",link:"/public/uiimages/medicine/naronar/naron_r.JPG",modallink1:"/public/uiimages/medicine/naronar/naron-r-memo1.png",modallink2:"/public/uiimages/medicine/naronar/naron-r-memo2.png",modallink3:"/public/uiimages/medicine/naronar/naron-r-memo3.png" };
  connection.query('INSERT INTO item SET ?', item2, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

// ナロンエースT
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const item3 = { item:"ナロンエースT",description:"This medicine is a cold medicine.",type1:"頭痛",type2:"風邪",limitednum:3 ,value:820,Ban:"",link:"/public/uiimages/medicine/naronat/naron_t.JPG",modallink1:"/public/uiimages/medicine/naronat/naron-t-memo1.png",modallink2:"/public/uiimages/medicine/naronat/naron-t-memo2.png",modallink3:"/public/uiimages/medicine/naronat/naron-t-memo3.png" };
  connection.query('INSERT INTO item SET ?', item3, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

// luna
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const item4 = { item:"luna",description:"This medicine is a cold medicine.",type1:"頭痛",limitednum:3 ,value:1188,Ban:"",link:"/public/uiimages/medicine/luna/luna.JPG" };
  connection.query('INSERT INTO item SET ?', item4, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

// パブロンゴールドA
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const item5 = { item:"パブロンゴールドA",description:"This medicine is a cold medicine.",type1:"風邪",limitednum:2 ,value:1700,Ban:"",link:"/public/uiimages/medicine/pabronga/pabron_gold_a.jpg",modallink1:"/public/uiimages/medicine/pabronga/pabron_gold_a_memo1.png",modallink2:"/public/uiimages/medicine/pabronga/pabron_gold_a_memo2.png",modallink3:"/public/uiimages/medicine/pabronga/pabron_gold_a_memo3.png" };
  connection.query('INSERT INTO item SET ?', item5, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

// ナロンエースロイヤル
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const item6 = { item:"ナロンエースロイヤル",description:"This medicine is a headache medicine.",type1:"頭痛",limitednum:3 ,value:980,Ban:"パブロン鼻炎カプセルsα",link:"/public/uiimages/medicine/naronal/naron_royal.jpg",modallink1:"/public/uiimages/medicine/naronal/naron-royal-memo1.png",modallink2:"/public/uiimages/medicine/naronal/naron-royal-memo2.png",modallink3:"/public/uiimages/medicine/naronal/naron-royal-memo3.png" };
  connection.query('INSERT INTO item SET ?', item6, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

// パブロン鼻炎カプセルsα
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const item7 = { item:"鼻炎カプセルSα",description:"This medicine is a nose medicine.",type1:"鼻炎",limitednum:4 ,value:1200,Ban:"ナロンエースロイヤル",link:"/public/uiimages/medicine/pabronnosesa/pabron_nose_sa.jpg",modallink1:"/public/uiimages/medicine/pabronnosesa/pabron_nose_sa_memo1.png",modallink2:"/public/uiimages/medicine/pabronnosesa/pabron_nose_sa_memo2.png",modallink3:"/public/uiimages/medicine/pabronnosesa/pabron_nose_sa_memo3.png" };
  connection.query('INSERT INTO item SET ?', item7, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

// パブロン点鼻EX
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const item8 = { item:"パブロン点鼻EX",description:"This medicine is a nose medicine.",type1:"鼻炎",limitednum:4 ,value:891,Ban:"",link:"/public/uiimages/medicine/pabronnosedropsex/pabron_nosedrops_ex.png",modallink1:"/public/uiimages/medicine/pabronnosedropsex/pabron_nosedrops_ex_memo1.png",modallink2:"/public/uiimages/medicine/pabronnosedropsex/pabron_nosedrops_ex_memo2.png",modallink3:"/public/uiimages/medicine/pabronnosedropsex/pabron_nosedrops_ex_memo3.png" };
  connection.query('INSERT INTO item SET ?', item8, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

// パブロン鼻炎速溶錠ex
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const item9 = { item:"パブロン鼻炎速溶錠ex",description:"This medicine is a nose medicine.",type1:"鼻炎",limitednum:4 ,value:1780,Ban:"",link:"/public/uiimages/medicine/pabronfastnosedrops/pabron_fastnosedrops_ex.png",modallink1:"/public/uiimages/medicine/pabronfastnosedrops/pabron_fastnosedrops_ex_memo1.png",modallink2:"/public/uiimages/medicine/pabronfastnosedrops/pabron_fastnosedrops_ex_memo2.png",modallink3:"/public/uiimages/medicine/pabronfastnosedrops/pabron_fastnosedrops_ex_memo3.png" };
  connection.query('INSERT INTO item SET ?', item9, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

// パブロンエースPro
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const item10 = { item:"パブロンエースPro",description:"This medicine is a cold medicine.",type1:"風邪",limitednum:2 ,value:1200,Ban:"",link:"/public/uiimages/medicine/pabronap/pabronap-zaiko.png",modallink1:"/public/uiimages/medicine/pabronap/paburonap-memo1.png",modallink2:"/public/uiimages/medicine/pabronap/paburonap-memo2.png",modallink3:"/public/uiimages/medicine/pabronap/paburonap-memo3.png" };
  connection.query('INSERT INTO item SET ?', item10, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

// パブロン鼻炎アタックJL
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const item11 = { item:"鼻炎アタックJL",description:"This medicine is a nose medicine.",type1:"鼻炎",limitednum:2 ,value:1380,Ban:"",link:"/public/uiimages/medicine/pabronnoseattackjl/pabron_nose_attack.jpg",modallink1:"/public/uiimages/medicine/pabronnoseattackjl/pabron_nose_attack_memo1.png",modallink2:"/public/uiimages/medicine/pabronnoseattackjl/pabron_nose_attack_memo2.png",modallink3:"/public/uiimages/medicine/pabronnoseattackjl/pabron_nose_attack_memo3.png" };
  connection.query('INSERT INTO item SET ?', item11, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

// ビオフェルミン下痢止め 
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const item12 = { item:"ビオフェルミン下痢止め",description:"This medicine is a stomachache medicine.",type1:"お腹",limitednum:2 ,value:1000,Ban:"",link:"/public/uiimages/medicine/biofe_geri/biofe.jpg",modallink1:"/public/uiimages/medicine/biofe_geri/biofe_memo1.png",modallink2:"/public/uiimages/medicine/biofe_geri/biofe_memo2.png",modallink3:"/public/uiimages/medicine/biofe_geri/biofe_memo3.png" };
  connection.query('INSERT INTO item SET ?', item12, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

// ビオフェルミン止瀉薬
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const item13 = { item:"ビオフェルミン止瀉薬",description:"This medicine is a stomachache medicine.",type1:"お腹",limitednum:3 ,value:1200,Ban:"",link:"/public/uiimages/medicine/biofestop/biofe_stop.jpg",modallink1:"/public/uiimages/medicine/biofestop/biofe_stop_memo1.png",modallink2:"/public/uiimages/medicine/biofestop/biofe_stop_memo2.png",modallink3:"/public/uiimages/medicine/biofestop/biofe_stop_memo3.png" };
  connection.query('INSERT INTO item SET ?', item13, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

//自販機在庫sample
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const stock1 = { venderid:"30",item:"ナロンメディカル",stocknum:10};
  connection.query('INSERT INTO recostock SET ?', stock1, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const stock2 = { venderid:"30",item:"ナロンエースR",stocknum:20};
  connection.query('INSERT INTO recostock SET ?', stock2, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const stock3 = { venderid:"30",item:"ナロンエースT",stocknum:15};
  connection.query('INSERT INTO recostock SET ?', stock3, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const stock4 = { venderid:"30",item:"luna",stocknum:11};
  connection.query('INSERT INTO recostock SET ?', stock4, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const stock5 = { venderid:"30",item:"パブロンゴールドA",stocknum:13};
  connection.query('INSERT INTO recostock SET ?', stock5, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const stock6 = { venderid:"30",item:"ナロンエースロイヤル",stocknum:13};
  connection.query('INSERT INTO recostock SET ?', stock6, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const stock7 = { venderid:"30",item:"鼻炎カプセルSα",stocknum:11};
  connection.query('INSERT INTO recostock SET ?', stock7, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const stock8 = { venderid:"30",item:"パブロン点鼻EX",stocknum:11};
  connection.query('INSERT INTO recostock SET ?', stock8, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const stock9 = { venderid:"30",item:"パブロン鼻炎速溶錠ex",stocknum:4};
  connection.query('INSERT INTO recostock SET ?', stock9, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const stock10 = { venderid:"30",item:"パブロンエースPro",stocknum:4};
  connection.query('INSERT INTO recostock SET ?', stock10, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const stock11 = { venderid:"30",item:"鼻炎アタックJL",stocknum:4};
  connection.query('INSERT INTO recostock SET ?', stock11, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const stock13 = { venderid:"30",item:"ビオフェルミン下痢止め",stocknum:4};
  connection.query('INSERT INTO recostock SET ?', stock13, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const stock14 = { venderid:"30",item:"ビオフェルミン止瀉薬",stocknum:4};
  connection.query('INSERT INTO recostock SET ?', stock14, (err, res) => {
    if(err) throw err;
    console.log('created!');
  });
  connection.end();