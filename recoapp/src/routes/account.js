//--------------------requiremodules---------------------
// hostのdomainまたはipアドレスを記載する
// ここはhostのものに変更する必要がある
const hostnamespace = "localhost";
const recohostnamespace = "localhost";
// 各種require
var router = require("express").Router();
var { authenticate,authorize } = require("../lib/security/accountcontrol.js");
const mysql = require('mysql');
const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const { json } = require("body-parser");
// 各種ミドルウェア
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// mysql設定変数
var mysql_setting = {
  host     : 'mysql',
  user     : 'root',
  password : 'pass',
  database : 'todo',
};
var connection = mysql.createConnection(mysql_setting);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


//--------------------関数定義--------------------

function createtable(querys){
  /* 
   description
   -------------------------
    一括でテーブル作成を行う処理

   parameters
   -------------------------
    querys(array):createのsql文が格納された配列
  
   return
   -------------------------
    なし
  */
  querys.forEach((query) => {
    console.log(query);
    connection.query(query,()=>{console.log("テーブル作成に成功しました。");});
  } );
}

function droptable(querys){
  /* 
   description
   -------------------------
    一括でテーブル削除を行う処理

   parameters
   -------------------------
    querys(array):createのsql文が格納された配列
  
   return
   -------------------------
    なし
  */
  querys.forEach((query) => {
    let sql = "drop table " + query + ";";
    console.log(sql);
    connection.query(sql,()=>{console.log("仮のテーブル'" + query + "'テーブル削除に成功しました。");});
  } );
}

function get_userid(req){
  /* 
   description
   -------------------------
    useridを取得する処理

   parameters
   -------------------------
    req(array):リクエスト
  
   return
   -------------------------
    userid(char):userid
  */
  console.log("------------------");
  console.log("ログインユーザID：");
  req.user.forEach( (row) => { 
    console.log(row.userid);
    // userid格納
    userid = row.userid;
  });
  console.log("------------------");
  return userid
}

function to_settlement(req,res,pageflag) {
  /* 
   description
   -------------------------
    会計ページへ遷移する処理

   parameters
   -------------------------
    req(object):リクエストの中身
    res(object):レスポンスの中身
    pageflag(char):ページ情報
  
   return
   -------------------------
    なし
  */

  //遷移先
  let pagename = "./settlement/index.ejs";
  //.result/index.ejsへ大量購入防止機能と飲み合わせ禁止機能を備えて遷移させる
  alert_action(req,res,pageflag,"item",pagename);
}


function to_result(req,res,pageflag,inputtablename){
  /* 
   description
   -------------------------
    検索結果ページへ遷移する処理

   parameters
   -------------------------
    req(object):リクエストの中身
    res(object):レスポンスの中身
    pageflag(char):ページ情報
    inputtablename(char):(itemの名前だけ取り出したテーブル) or itemテーブル
    pagename(format:./result/index.ejs):遷移先ページ情報
  
   return
   -------------------------
    なし
   
  */
  //遷移先
  let pagename = "./result/index.ejs";
  //.result/index.ejsへ大量購入防止機能と飲み合わせ禁止機能を備えて遷移させる
  alert_action(req,res,pageflag,inputtablename,pagename);
}


function alert_action(req,res,pageflag,inputtablename,pagename){
  /* 
   description
   -------------------------
    大量購入防止機能、飲み合わせ禁止機能
    入力は以下のような"表示したい商品名をitem列とした"テーブルを任意のテーブル名で作成し,
    作成したテーブル名を引数のinputtablenameへchar型で渡す.
    全商品を渡す場合はitemとinputtablenameへ入力するだけで良い
    ex)
     ---------------
     | item        |
     ---------------
     | パブロン     |
     ---------------
     | ナロンエースT |
     ---------------
     |...          |
     ---------------

   parameters
   -------------------------
    req(object):リクエストの中身
    res(object):レスポンスの中身
    pageflag(char):前のページ情報
    inputtablename(char):(itemのitemnameだけ取り出したテーブル) or itemテーブル
    pagename(format:"./result/index.ejs"):遷移先ページ情報
  
   return
   -------------------------
    select_all_sql：薬の詳細,カートに入っている数,10日以内に購入した数を表示するselect文
    select_items_sql：カートに入っている商品名と購入履歴の商品を結合した(重複は除く)一覧を表示するselect文
    droplist：データ取得のために作成したテーブル一覧

  */

  //ユーザidを取得する
  var userid = get_userid(req);
  let droplist = ["countdetail","userbuydata","cartcount"]
  // 入力テーブルがitem以外の場合inputtableに商品の詳細情報を追加する
  console.log("inputtablename:")
  console.log(inputtablename)
  // 
  if (inputtablename != "item"){
    droplist.unshift(inputtablename);
    var detail_sql = "create table detail select item.item,itemid,value,item.link,item.modallink1,item.modallink2,item.modallink3,item.limitednum,item.Ban from " + inputtablename + " left join item on item.item = " + inputtablename + ".item;";
    inputtablename = "detail";
    droplist.unshift("detail");
  }
  //カートの中身を商品ごとに集計したテーブルを作成(cartcountテーブル)
  var cartcount_sql = "create table cartcount select item as cartitem,count(item) as cartnum from cart group by item;";
  //detailテーブルとcartcountテーブルを結合する(countdetail)　detail(キーワードに詳細をつけたテーブル) or item(全ての詳細テーブル)
  var countdetail_sql = "create table countdetail select item,itemid,value,link,modallink1,modallink2,modallink3,limitednum,Ban,ifnull(cartnum,0) as cartcount from " + inputtablename + " left join cartcount on " + inputtablename + ".item=cartcount.cartitem;";
  //ユーザの10日以内の購入履歴を作成する(userbuydata)
  var userbuydata_sql = "create table userbuydata select buyitem,count(buyitem) as buycount from buy where userid = " + userid + " and buydate > (NOW() - INTERVAL 10 DAY) group by buyitem;"
  //countdatailとuserbuydataを結合して症状にあった薬の詳細,カートに入っている数,10日以内に購入した数を取得する
  var select_all_sql = "select item,itemid,value,link,modallink1,modallink2,modallink3,limitednum,Ban,cartcount,ifnull(buycount,0) as buycount from countdetail left join userbuydata on userbuydata.buyitem = countdetail.item;";
  //カートに入っている商品名と購入履歴の商品を結合した(重複は除く)一覧を表示する
  var select_items_sql = "select item from cart group by item union distinct select buyitem as item from buy where userid=" + userid + " and buydate > (NOW() - INTERVAL 10 DAY) group by buyitem;"
  //上記create文を実行
  var querylist = [cartcount_sql,countdetail_sql,userbuydata_sql]
  if (inputtablename != "item"){
    querylist.unshift(detail_sql);
  }
  //create文を実行する
  console.log("quertlist")
  console.log(querylist);
  createtable(querylist);
  connection.query(select_all_sql,(error, rows) => {
    if (error == null) {
      connection.query(select_items_sql,(_,itemlist)=>{
        //上記で作成したテーブルは必要ないので削除する
        console.log("droplist:")
        console.log(droplist)
        droptable(droplist);
        res.render(pagename,{ content: rows,list: itemlist,domainname:hostnamespace,pageflag:pageflag});
      });
    } else { 
      console.log("データ取得に失敗しました。");
    }
  });
}


//--------------------routes機能--------------------------

//--------------------displayページ取得--------------------
router.get("/display",(_,res) =>{
  var pageflag = "display";
  connection.query('SELECT * from symptom', 
    function (error, symptoms) {
        if (error == null) {
          //商品情報を全て取得する
          connection.query('select * from item;',(error, items) => {
            if (error == null) {
              res.render("./display/index.ejs",{ recolocalhost:recohostnamespace,itemlist:items,symptomlist:symptoms,domain:hostnamespace });
            } else { console.log("データ取得に失敗しました。");}
          });
      } else { console.log("データ取得に失敗しました。");}
  });
});

//--------------------loginページ取得(PCtest用 username:japan@email.com,pass:pass)--------------------
router.get("/login",(req,res) =>{
  res.render("./account/login.ejs",{message:req.flash("message")});
});

//--------------------login処理--------------------
//sampleでは pass:pass が初期値で設定されている
//"https://' domainnamme or ipアドレス ':49160/logingo/?username=sample&password=pass"直打ちでloginできる
router.get("/logingo",authenticate());

//--------------------logout処理--------------------
router.get("/logout",(req,res)=>{
  //cartテーブル情報を削除する
  connection.query('DELETE FROM cart;',() => {
    console.log("カート情報を削除しました。");
  });
  console.log("ログアウトしました。");
  req.logout();
  // ----------recoリダイレクト
  // let url = "https://" + recohostnamespace + ":8080/top";
  // console.log(`${url}`);
  // console.log("にリダイレクトしました。")；
  // res.redirect(url);
  // ----------pctest用のリダイレクト先
  console.log("テストページにリダイレクトしました。");
  res.redirect("/display");
});

//--------------------顔認証ページ取得--------------------
router.get("/webcam",(req,res) => {
  //前ページ情報 
  var pageflag = "webcam";
  // bluetoothにてqueryでusername,passwordが送信されてくる
  var username = req.query.username;
  var password = req.query.password;
  //顔データと比較するためのユーザ情報を取得する
  connection.query('SELECT * from userinfo', 
    function (error, userinfos) {
        if (error == null) {
          console.log("------------------");
          console.log("ユーザ名一覧：");
          userinfos.forEach( (userinfo) => { 
            console.log(userinfo.username);
          });
          console.log("------------------");
          res.render("./webcamFaceRecognition.ejs",{user:username,pass:password,hosturl:hostnamespace,userinfo:userinfos});
      } else { console.log("データ取得に失敗しました。");}
  });
});

//--------------------topページ取得--------------------
router.get("/top/",authorize(),(req,res) => {
  //前ページ情報
  var pageflag = "top";
  //useridを取得する
  get_userid(req)
  //症状データを取得する
  connection.query('SELECT * from symptom', 
    function (error, symptoms) {
        if (error == null) {
          res.render("./index.ejs",{ content: symptoms,host:hostnamespace });
      } else { console.log("データ取得に失敗しました。");}
  });
});

//--------------------症状による検索結果表示ページ取得--------------------
router.get("/searchresulttype/",authorize(),(req,res) => {
  //前ページ情報
  var pageflag = "searchresulttype";
  //検索結果をkeywordに格納する
  var keyword = req.query.type;
  console.log(`検索症状 ： ${keyword}`);
  //症状にあった商品一覧テーブルを作成する(keyitemテーブル)
  var keyitem_sql = "create table keyitem select item from item where type1 ='" + keyword + "' or type2='" + keyword + "' group by item ;";
  connection.query(keyitem_sql,()=>{console.log("テーブル作成に成功しました。");});
  //検索結果ページを表示する
  to_result(req,res,pageflag,"keyitem");
});

//--------------------キーワードによる検索結果表示ページ取得--------------------
router.get("/searchresultkey/",authorize(),(req,res) => {
  //前ページ情報
  var pageflag = "searchresultkey";
  //検索結果をkeywordに格納する
  var keyword = req.query.word || "";
  console.log(`検索キーワード : ${keyword}`);
  var key = '%'+ keyword +'%';
  //症状にあった商品一覧テーブルを作成する(keyitemテーブル)
  connection.query("create table keyitem select item from item where item LIKE ?;",key,()=>{console.log("仮のテーブル'selectitem'テーブル作成に成功しました。");});
  //検索結果ページを表示する
  to_result(req,res,pageflag,"keyitem");
});

//--------------------web会議ページ取得--------------------
router.get("/webconf/",authorize(),(req,res) => {
  //前ページ情報
  var pageflag = "webconf";
  //useridを取得する
  get_userid(req)
  connection.query("select * from cart where userid = ?;",userid,(_,cartdata)=>{
    connection.query("select * from item;",userid,(_,itemdata)=>{
      connection.query("select * from buy where userid = ?;",userid,(_,buydata)=>{
        res.render("./webconf/index.ejs",{pageflag:pageflag,hostnamespace:hostnamespace,carts:cartdata,items:itemdata,buys:buydata});
      });
    });
  });
});

//--------------------カートへの追加処理--------------------
router.get("/addcart/",authorize(),(req,res) => {
  //前ページ情報
  var pageflag = "addcart";
  //追加する商品情報
  var itemname = req.query.itemname;
  var itemvalue = req.query.itemvalue;
  const incart = { item: itemname,value:itemvalue };
  //cartテーブルに商品追加する
  connection.query('INSERT INTO cart SET ?', incart, () => {
    console.log('カートに追加しました。');
  });
  //カートページを表示する
  to_settlement(req,res,pageflag);
});

//--------------------カートへの追加処理API(遷移なし)--------------------
router.get('/addapi/', authorize(),function(req, res) {
  //追加する商品情報
  var jsonData = req.query;
  //cartテーブルに商品追加する
  connection.query('INSERT INTO cart SET ?', jsonData, () => {
    console.log('カートに追加しました。');
  });
  res.send('');
});

//--------------------カートの商品削除処理--------------------
router.get("/cartitemdel/",authorize(),(req,res) => {
  //前ページ情報
  var pageflag = "cartitemdel";
  //削除する商品情報
  var delitem = req.query.delitem || "";
  //cartテーブルから商品を一つ削除する
  connection.query('DELETE FROM cart WHERE item = ? limit 1;',delitem, () => {
    console.log("cartから商品を削除しました。");
    //集計ページへ遷移する
    to_settlement(req,res,pageflag);
  });
});

//--------------------カートの商品追加処理--------------------
router.get("/cartitemadd/",authorize(),(req,res) => {
  //前ページ情報
  var pageflag = "cartitemdel";
  //追加する商品情報
  var additemname = req.query.additemname || "";
  var additemvalue = req.query.additemvalue || "";
  const incart = { item: additemname,value:additemvalue };
  //cartテーブルに商品追加する
  connection.query('INSERT INTO cart SET ?',incart, () => {
    console.log('カートに追加しました。');
    //集計ページへ遷移する
    to_settlement(req,res,pageflag);
  });
});

//--------------------集計ページ取得--------------------
router.get("/settlement/",authorize(),(req,res) => {
  //前ページ情報
  var pageflag = req.query.pageflag;
  //集計ページへ遷移する
  to_settlement(req,res,pageflag);
});

//-------------------- 支払いページ取得--------------------
router.get("/payment",(req,res) =>{
  //前ページ情報
  var pageflag = "payment";
  //合計の値段情報
  var all = req.query.all;
  //支払いページへ遷移する
  res.render("./payment/index.ejs",{paymentall:all,domain:hostnamespace});
});

//--------------------排出処置--------------------
router.get("/output/",authorize(),(_,res) => {
  //recostockテーブルとcartテーブルを結合して集計情報のtableを作成する。
  connection.query("create table cartdata select addid,cart.item,value,venderid,stocknum from cart left join recostock on cart.item = recostock.item;",()=>{console.log("仮のテーブル'cartdata'テーブル作成に成功しました。");});
  connection.query('select count(*) as count from cartdata;',(error, cartcount) => {
    if (error == null) {
      connection.query("select * from cartdata limit 1;",(_,cartdata)=>{
        console.log("仮のテーブル'cartdata'テーブルのデータを1つ取得しました。");
        connection.query("delete from cartdata limit 1;",()=>{console.log("仮のテーブル'cartdata'テーブルのデータを1つ削除しました。");});
        res.render("./output/out.ejs",{ cartcount: cartcount,cartdata :cartdata,serverurl:hostnamespace });
      });
    } else { 
      console.log("データ取得に失敗しました。");
    }
  });
});

//-------------------購買履歴の書き込み+購入フロー終了--------------------
router.get("/thanks/",authorize(),(req,res) => {
  //前ページ情報
  var pageflag = "thanks";
  //useridの取得
  get_userid(req);
  //ここで削除するcartdataテーブルは排出プログラムのために一時的に作成したテーブル
  connection.query("drop table cartdata;",()=>{console.log("仮のテーブル'cartdata'テーブル削除に成功しました。");});
  //カートの情報をcartテーブルから取得してくる
  connection.query('SELECT * from cart', function (error, rows) {
    if (error == null) {
      rows.forEach( (row) => {
        const buydata = { userid: userid,buyitem:row.item};
        //購入履歴をカートからユーザのbuyテーブルに書き込む
        connection.query('INSERT INTO buy SET ?;', buydata, () => {
          console.log('cartデータをbuyテーブルに挿入しました。');
          console.log('購入履歴をbuyテーブルに書き込みました。');
        });
      });
      res.render("./thanks/index.ejs",{ content: rows,host:hostnamespace });
    } else { console.log("データ取得に失敗しました。");}
  });
});

module.exports = router;
