Reco!App_prototype
========================================================================================================================
これは、Reco!薬局のアプリケーションです。
以下にセットアップ方法を提示します。

reco_ble...reco!のlocalで立ち上げるもの。

recoapp...外部サーバで立ち上げるもの。(AWSで説明している。)

reco_central...Swiftで立ち上げるもの。

bat_demo.js...自販機にある簡易起動バッチ.batをPCで再現した物。動きだけ。

README.drawio...図での説明、VScodeで拡張機能"Draw.io Integration"をinatallしてみるかwebAppの[Draw.io](https://app.diagrams.net/)でファイルを開く。

setup
-----------------------------------------------------------------------------------------------------------------------------
1. このgitのzipをダウンロードして任意のworkfolder(desktopで良い)に解凍する。  もし、recoapp内のsrcフォルダ内にnodemodulesが存在する場合削除する(アップロードに時間がかかってしまうためaws上で自動生成する)

2. recoappを下記recoapp_setupに従いsetupする。

3. reco!上で下記reco_ble_setupに従いsetupする。

4. macosにてreco_centralをreco_central/README.mdに従いsetupする。


test
-----------------------------------------------------------------------------------------------------------------------------
1. Reco!上をタップする。

2. 携帯を目標の場所に近づける。

3. 顔認証する。(sampleの顔画像は```/recoapp/src/images/sample/*```である。sampleであれば、どの画像でも良い。)

4. 薬剤師に接続しカートに商品を入れて購入し排出された商品を取り出し、お薬手帳アプリで購入できているかを確認する。


## 以下は、詳細を示す。

recoapp_setup
-----------------------------------------------------------------------------------------------------------------------------

### 環境  
下記インスタンスの説明参照。

### docker内環境  
/reco_prot/recoapp/docker-compose.yml参照。


### 流れ
1. AWSのEC2にてインスタンスを起動する。(以下に詳細を記載している。)

- ubuntu server 18.04 LTS (HVM), SSD Volume Type
- t2.micro
- インスタンスの設定はdefault(インスタンス数1)
- ストレージ：20GB、ボリュームタイプ：汎用SSD(gp2)(30までは無料枠)
- タグは任意で作成
- セキュリティは「すべてのトラフィック」(セキュリティは弱い)
- 起動->新しいキーペアの作成(名前は任意)
- キーペアのダウンロード(workfolderに移動)
- インスタンスの作成

2. EC2>セキュリティ>セキュリティグループのリンクをクリック>インバウンドルールを編集
ここで以下のportを穴あけする。(ソースは全て0.0.0.0/0)

- 8000
- 22
- 49160
- 8070
- 49170
- 3306
- 3000

3. カメラをAWSから用いるためにSSL化を行わなくてはいけないが、nodeで自己証明を行っているのでここでの設定は不要である。

4. コマンドプロンプトからworkfolder内で  
   キーのファイル設定を変更  
   ```chmod 400 "キーの名前"```  
   sshログイン  
   ```ssh -i "キーの名前" ubuntu@"パブリックIPv4DNS"```  

5. dockerとdocker-composeをinstallする。  
   ```sudo apt-get update```  
   ```sudo apt-get install docker.io```  
   ```sudo gpasswd -a ubuntu docker```  
   ```sudo apt install docker-compose```  

6. exitする。

7. workfolderにおいた、/recoapp/src/routes/account.jsの4行目のhostnamespaceに"パブリックIPv4DNS"を代入する。
   
8. recoappをアップロードする。(5分程度かかる)  
   workfolder内で  
   ```sftp -i "キーの名前"" ubuntu@"パブリックIPv4DNS"```  
   ```put -r recoapp```  

9. exitする。

10. sshログインする。  
   ```ssh -i "キーの名前" ubuntu@"パブリックIPv4DNS"```  
   recoappのアップロードを確認後、recoapp内に移動する。  
   ```ls```  
   ```cd recoapp```  

11. dockerイメージ作成とdockerコンテナ立ち上げを一気に行う。  
   ```docker-compose up --build -d```  

12. コンテナに入りサンプルデータを挿入する。  
   ```docker-compose exec app bash```  
   ```node insertsampledata/createrecosample.js```  
   ```node insertsampledata/insertsample.js```  

13. sampleは  
   username:sample  
   password:pass  
   で登録されている。  


### 参考 
dbを確認する場合(大きく分けて3通りある。)  
1. ```docker-compose exec myspl mysql -uroot -p```  
   でpasswordはpassでアクセスする。todoというdatabaseにdataが格納されている。  
2. ```http://"パブリックIPv4DNS":8070```  
   でphpmyadminにアクセスしてGPUで操作する。  
3. dataの詳細はrecoapp/src/insertsampledata/create_memo.txtに書いている。  

reco_ble_setup
-----------------------------------------------------------------------------------------------------------------------------

### 環境  
- Reco!(windows Embedded 8.1)  
- node:8.11.3(blenoを用いるためバージョンを落としている)  
- npm:5.6.0
- BLEドングル：CSR8510 A10(BLE4.0 ,(0x0a12,0x0001))

### 流れ
1. Reco!のworkspace(desktopで良い。)にreco_bleを配置する。

2. reco_bleの中にある/routes/account.jsの12行目にあるdomainにパブリックIPv4DNSを代入する。

3. Reco!上の簡易起動バッチ.batを起動する。(大学にあるReco!ではdesktopにショートカットを置いている。)

4. コマンドプロンプトを開き、reco_bleの中でnodemodulesをinstallする。
   ```npm install```   

5. 上記ドングルを使用する場合、/reco_ble/nodemodules/bluetooth-hci-socket/lib/usb.jsの66行目に  
   ``` ...|| usb.findByIds(0x0a12,0x0001) ||... ```  
   を追記する。(あらかじめ記述されている可能性もある。)  
   他のドングルを使用する場合は、下記の参照1のリンクの"blenoに対応するドングル一覧"をみると良い。  

6. アプリを起動する。    
   ```node app.js```    

7. chromeでアプリを起動する。  
   ```https://"パブリックIPv4DNS":49160/display```  
   "このページは安全ではありません"が出るが、任意の場所をクリックして```thisisunsafe```と打ち込むと表示される

### 参考
- [解決の参考になったURL](https://github.com/noble/node-bluetooth-hci-socket/issues/118)  
- [blenoに対応するドングル一覧](https://github.com/noble/node-bluetooth-hci-socket#compatible-bluetooth-40-usb-adapters)  
- [bleno](https://github.com/noble/bleno)  

reco_central_setup
-----------------------------------------------------------------------------------------------------------------------------

### 環境  
- macOS Catalina 10.15.7
- Swift:5.2.4
- Xcode:11.6
- 実機:iphoneSE 64GB(UIはこの実機に合わせている)

### 流れ
1. workspace(desktopで良い。)にrecocentralを配置する。

2. recocentral内のreco_central.xcodeprojを起動する。

3. loginpageViewController.swiftの18行目の変数IPの値を"パブリックIPv4DNS"に書き換える。

4. XcodeにてiphoneSEにinstallする。

5. 名前とパスワードを入力してloginする。(sampleは username:sample password:passとなっている) 

6. top画面に始まり、Bluetooth画面とお薬手帳画面がある。




