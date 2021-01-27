let localStream;
let shareStream;
const peer = new Peer({
  key: '656590dd-bc77-4994-bf40-d22377677d42',
  debug: 3
});
  peer.on('open', () => {
      document.getElementById('my-id').textContent = peer.id;
      peer.listAllPeers(function(list){//Reco側機能
        console.log(list);//[]
        var isArray=list instanceof Array;
        console.log(isArray);//false
        for(var cnt=0;cnt<list.length;cnt++){
            console.log(+list[cnt]+",");
        }
        if(document.getElementById('my-id').textContent !=list[0]){
          document.getElementById('their-id').textContent=list[0];//自動ID入力
        }
    });
  });

  navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then( stream => {
      const videoElm = document.getElementById('my-video')
      videoElm.srcObject = stream;
      videoElm.play();
      localStream = stream;
    }).catch( error => {
      console.error('mediaDevice.getUserMedia() error:', error);
      return;
    });

  document.getElementById("share-finish").style.display="none";

  //画面共有
  document.getElementById("share-screen").onclick=()=>{ 
    navigator.mediaDevices.getDisplayMedia({video: true,audio:true})
    .then( stream => {
      const videoElm = document.getElementById('share-video')
      videoElm.srcObject = stream;
      videoElm.play();
      shareStream = stream;
      shareStream.addTrack(localStream.getAudioTracks()[0]);
      const theirID = document.getElementById('their-id').value;
      const mediaConnection = peer.call(theirID,shareStream);
      document.getElementById("share-finish").style.display="block";
      document.getElementById("share-screen").style.display="none";
      document.getElementById('close-call').onclick = () =>{
        mediaConnection.close();
      };
    }).catch( error => {
      console.error('mediaDevice.getUserMedia() error:', error);
      return;
    })
  }
  
  document.getElementById("share-finish").onclick=()=>{
    localStream.getVideoTracks()[0].stop();
    document.getElementById("share-finish").style.display="none";
    document.getElementById("share-screen").style.display="block";
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then( stream => {
      const videoElm = document.getElementById('my-video')
      videoElm.srcObject = stream;
      videoElm.play();
      localStream = stream;
      const theirID = document.getElementById('their-id').value;
      const mediaConnection = peer.call(theirID,localStream);
      document.getElementById('close-call').onclick = () =>{
        mediaConnection.close();
      };
    }).catch( error => {
      console.error('mediaDevice.getUserMedia() error:', error);
      return;
    });
  }

  //発信側処理
  function callyaku(){
      const theirID = document.getElementById('their-id').value;
      const mediaConnection = peer.call(theirID, localStream);
      setEventListener(mediaConnection);
      document.getElementById('close-call').onclick = () =>{
        mediaConnection.close(true);
      };
      mediaConnection.once('close',()=>{
      window.alert("会話が終了しました");
    });
  }
  
  setTimeout("callyaku()", 3000);



  const setEventListener = mediaConnection => {
    mediaConnection.on('stream', stream => {
      const videoElm = document.getElementById('their-video')
      videoElm.srcObject = stream;
      videoElm.play();
    });
  }
  
//着信側処理
  peer.on('call', mediaConnection => {
    window.alert("患者さんから着信が来ました");
    mediaConnection.answer(localStream);
    setEventListener(mediaConnection);
    //変更点
    document.getElementById('close-call').onclick = () =>{
      mediaConnection.close(true);
    };  
  });
  
  
/*--- テキストチャット ---*/
const localId = document.getElementById('my-id');//自分のpeerID
const localText = document.getElementById('local-text');//送るメッセージ
const connectTrigger = document.getElementById('make-call');//peer接続ボタン
const closeTrigger = document.getElementById('close-call');//peer切断ボタン
const sendTrigger = document.getElementById('send-trigger');//メッセージ送信ボタン
const remoteId = document.getElementById('their-id');//相手のpeerID
const messages = document.getElementById('messages');//メッセージの表示場所
const imageTrigger = document.getElementById('image-trigger');//画像送信
const outputImage = document.getElementById('output');//画像出力
  function callyaku2() {
    if (!peer.open) {
      return;
    }
    const dataConnection = peer.connect(remoteId.value);
    dataConnection.once('open', async () => {
      messages.textContent += `=== 薬剤師さんと接続されました ===\n`;
      messages.textContent += `=== 症状といつからその症状が出たか伝えてください ===\n`;      
      sendTrigger.addEventListener('click', onClickSend);
    });
    dataConnection.on('data', data => {
      messages.textContent += `薬剤師さん: ${data}\n`;
      outputImage.src=data;//画像表示
    });
    dataConnection.once('close', () => {
      messages.textContent += `=== 薬剤師さんとの接続が終了しました ===\n`;
      sendTrigger.removeEventListener('click', onClickSend);
    });
    closeTrigger.addEventListener('click', () => {
      dataConnection.close()
      //ここ
    }, {
      once: true,
    });
    function onClickSend() {
      const data = localText.value;
      dataConnection.send(data);
      messages.textContent += `あなた: ${data}\n`;
      localText.value = '';
    }
  };
  window.setTimeout("callyaku2()",3000);
  peer.on('connection', dataConnection => {
    dataConnection.once('open', async () => {
      messages.textContent += `=== Recoと接続されました ===\n`;
      peer.listAllPeers(function(list){//薬剤師側機能
        console.log(list);//[]
        var isArray=list instanceof Array;
        console.log(isArray);//false
        for(var cnt=0;cnt<list.length;cnt++){
            console.log(+list[cnt]+",");
        }
        if(document.getElementById('my-id').textContent !=list[0]){
          document.getElementById('their-id').textContent=list[0];//自動ID入力
        }
      });
      sendTrigger.addEventListener('click', onClickSend);
      imageTrigger.addEventListener('click', imageSend);
    });

    dataConnection.on('data', data => {
      messages.textContent += `患者さん: ${data}\n`;
    });

    dataConnection.once('close', () => {
      messages.textContent += `=== Recoとの接続が解除されました ===\n`;
      sendTrigger.removeEventListener('click', onClickSend);
    });

    // Register closing handler
    closeTrigger.addEventListener('click', () => dataConnection.close(), {
      once: true,
    });

    function onClickSend() {
      const data = localText.value;
      dataConnection.send(data);

      messages.textContent += `あなた: ${data}\n`;
      localText.value = '';
    }
    function imageSend() {
      const data = outputImage.src;
      console.log(data);
      dataConnection.send(data);

      messages.textContent += `あなた: 画像を送信しました\n`;
      localText.value = '';
    }
  });

  const status=document.getElementById("status");//画像選択
  const output=document.getElementById("output");
  if (window.FileList && window.File && window.FileReader) {
    document.getElementById('avatar').addEventListener('change', e => {
      output.src = '';
      status.textContent = '';
      const file = e.target.files[0];
      if (!file.type) {
        status.textContent = 'Error: The File.type property does not appear to be supported on this browser.';
        return;
      }
      if (!file.type.match('image.*')) {
        status.textContent = 'Error: The selected file does not appear to be an image.'
        return;
      }
      const reader = new FileReader();
      reader.addEventListener('load', e => {
        output.src = e.target.result;
      });
      reader.readAsDataURL(file);
    }); 
  }
  
  
//ポップアップ
myJpeg = new Array(
  // 新しいウィンドで表示する画像のURL, タイトル, 画像の幅, 画像の高さ
  //remote accsess
  "/public/medicine/naron-back.PNG", "ナロンエース", 900, 700,
  "/public/medicine/naronm-back.PNG", "ナロンエースメディカル", 900, 700,
  "/public/medicine/naronr-back.PNG", "ナロンエースR", 900, 700,
  "/public/medicine/naronroyal-back.PNG", "ナロンエースロイヤル", 900, 700,
  "/public/medicine/kanpo-back.PNG", "大正漢方胃腸薬", 900, 700,
  "/public/medicine/kanpoactive-back.PNG", "大正漢方胃腸薬アクティブ", 900, 700,
  "/public/medicine/bio-back.PNG", "新ビオフェルミンS錠", 900, 700,
  "/public/medicine/bioplus-back.PNG", "新ビオフェルミンS錠プラス", 900, 700,
  "/public/medicine/pab-back.PNG", "パブロンゴールドA", 900, 700,
  "/public/medicine/pabron-back.PNG", "パブロンエースPro錠", 900, 700
  
  );

  function myGo(myTblNo){
  myAry = myTblNo * 4;                     // 配列の先頭
  console.log("myAry"+myAry);
  myXX=myJpeg[myAry+2];              // ウィンドウ横幅
  myYY=myJpeg[myAry+3];              // ウィンドウ縦幅
  myWinName = "Win" + myTblNo;                       // ウィンドウ名
  myWinSize = "resizable=yes,width=" + myXX + ",height=" + myYY; // ウィンドウオプション
  myWin = window.open("" , myWinName , myWinSize); // ウィンドウを開く
  myWin.document.open("","_top");
  myWin.document.write( "<html>" );
  myWin.document.write( "<head>" );
  myWin.document.write( "<title>", myJpeg[myAry+1] , "</title>" );
  myWin.document.write( "</head>" );
  myWin.document.write( "<body style='text-align:center'>" );
  myWin.document.write( "<img src='" , myJpeg[myAry] , "'width=500px,height=500px>" );
  myWin.document.write("<h1>終了するときは右上の✕を押してください</h1>");
  myWin.document.write( "</body>" );
  myWin.document.write( "</html>" );
  myWin.document.close();
  myWin.moveTo(500,500);//windowの位置
}myJpeg = new Array(
  // 新しいウィンドで表示する画像のURL, タイトル, 画像の幅, 画像の高さ
  //remote accsess
  "/public/medical/luna/luna-memo1.PNG", "バファリンルナ", 900, 1200,"/public/medical/luna/luna-memo2.PNG","/public/medical/luna/luna-memo3.PNG","バファリン ルナ 40錠 1,188円",
  "/public/medical/naronar/naron-r-memo1.png", "ナロンエースR", 900, 1200,"/public/medical/naronar/naron-r-memo2.png","/public/medical/naronar/naron-r-memo3.png","ナロンエースR 16錠 760円",
  "/public/medical/naronat/naron-t-memo1.png", "ナロンエースT", 900, 1200,"/public/medical/naronat/naron-t-memo2.png","/public/medical/naronat/naron-t-memo3.png","ナロンエースT 24錠 820円",
  "/public/medical/naronal/naron-royal-memo1.png", "ナロンエースロイヤルロイヤル", 900, 1200,"/public/medical/naronal/naron-royal-memo2.png","/public/medical/naronal/naron-royal-memo3.png","ナロンエースロイヤル 24錠 980円",
  "/public/medical/naronm/naron-m-memo1.png","ナロンエースメディカル",900,1200,"/public/medical/naronm/naron-m-memo2.png","/public/medical/naronm/naron-m-memo3.png","ナロンメディカル24錠 980円",
  "/public/medical/biofegeri/biofel_geri_memo1.png", "ビオフェルミン下痢止め", 900, 1200,"/public/medical/biofegeri/biofel_geri_memo2.png","/public/medical/biofegeri/biofel_geri_memo3.png","ビオフェルミン下痢止め 30錠 1,000円",
  "/public/medical/biofeshiyou/biofe_stop_memo1.png", "ビオフェルミン止瀉薬", 900, 1200,"/public/medical/biofeshiyou/biofe_stop_memo2.png","/public/medical/biofeshiyou/biofe_stop_memo3.png","ビオフェルミン止瀉薬 12包 1,200円",
  "/public/medical/pabronap/paburon-memo1.PNG", "パブロンエースPro", 900,1200,"/public/medical/pabronap/paburon-memo2.PNG","/public/medical/pabronap/paburon-memo3.PNG","パブロンエースPro 18錠 1,380円",
  "/public/medical/pabronag/pabron_gold_a_memo1.png", "パブロンゴールドA", 900, 1200,"/public/medical/pabronag/pabron_gold_a_memo2.png","/public/medical/pabronag/pabron_gold_a_memo3.png","パブロンゴールドA 130錠 1,700円",
  "/public/medical/pabronnoseex/pabron_nosedrops_ex_memo1.png", "パブロン点鼻E", 900, 1200,"/public/medical/pabronnoseex/pabron_nosedrops_ex_memo2.png","/public/medical/pabronnoseex/pabron_nosedrops_ex_memo3.png","パブロン点鼻Ex 15ml 891円",
  "/public/medical/pabronnosece/pabron_nose_sa_memo1.png", "パブロン鼻炎カプセルS", 900, 1200,"/public/medical/pabronnosece/pabron_nose_sa_memo2.png","/public/medical/pabronnosece/pabron_nose_sa_memo3.png","パブロン鼻炎カプセルSα 24カプセル 1,200円",
  "/public/medical/pabronnoseattack/pabron_nose_attack_memo1.png","パブロン鼻炎アタックJL",900,1200,"/public/medical/pabronnoseattack/pabron_nose_attack_memo2.png","/public/medical/pabronnoseattack/pabron_nose_attack_memo3.png","パブロン鼻炎アタックJL 8.5g 1,380円",
  "/public/medical/pabronnosefast/pabron_fastnosedrops_ex_memo1.png","パブロン鼻炎速溶錠",900,1200,"/public/medical/pabronnosefast/pabron_fastnosedrops_ex_memo2.png","/public/medical/pabronnosefast/pabron_fastnosedrops_ex_memo3.png","パブロン鼻炎即溶錠 48錠 1,780円"
  );

  function myGo(myTblNo){
  myAry = myTblNo * 7;                     // 配列の先頭
  console.log("myAry"+myAry);
  myXX=myJpeg[myAry+2];              // ウィンドウ横幅
  myYY=myJpeg[myAry+3];              // ウィンドウ縦幅
  myWinName = "Win" + myTblNo;                       // ウィンドウ名
  myWinSize = "resizable=yes,width=" + myXX + ",height=" + myYY; // ウィンドウオプション
  myWin = window.open("" , myWinName , myWinSize); // ウィンドウを開く
  myWin.document.open("","_top");
  myWin.document.write( "<html>" );
  myWin.document.write( "<head>" );
  myWin.document.write( "<title>", myJpeg[myAry+1] , "</title>" );
  myWin.document.write( "</head>" );
  myWin.document.write( "<body style='text-align:center'>" );
  myWin.document.write( "<img src='" , myJpeg[myAry] , "'width=500px,height=500px>" );
  myWin.document.write( "<br>" );
  myWin.document.write( "<img src='" , myJpeg[myAry+4] , "'width=500px,height=500px>" );
  myWin.document.write( "<br>" );
  myWin.document.write( "<img src='" , myJpeg[myAry+5] , "'width=500px,height=500px>" );
  myWin.document.write( "<h2>", myJpeg[myAry+6] , "</h2>" );
  myWin.document.write( "</body>" );
  myWin.document.write( "</html>" );
  myWin.document.close();
  myWin.moveTo(500,500);//windowの位置
}