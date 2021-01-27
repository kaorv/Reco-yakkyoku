//
//  ViewController.swift
//  reco_central
//
//  Created by 中野薫 on 2020/06/07.
//  Copyright © 2020 中野薫. All rights reserved.
//
import UIKit
import CoreBluetooth

class ViewController: UIViewController, CBCentralManagerDelegate, CBPeripheralDelegate  {
    
    var username = "";
    var password = "";
    var IP = "";
    var centralManager: CBCentralManager!
    var peripheral: CBPeripheral!
    @IBOutlet weak var alerttext: UILabel!
    var myPeripheral = [String]()//追加
    var characteristic: CBCharacteristic!
    var remotePeripheral: NSMutableArray = []
    var characteristics: NSArray=[]
    let serviceuuid = CBUUID(string:"B05A6F6D-6164-4384-A062-B4FE8C8FA900")
    let characteristicUUID = CBUUID(string: "95D10367-A094-4698-A995-1102A8C701BB")
    let image0 = UIImage(named: "Strong0")
    let image1 = UIImage(named: "Strong1")
    let image2 = UIImage(named: "Strong2")
    let image3 = UIImage(named: "Strong3")
    
    @IBOutlet weak var Strongs: UIImageView!
    @IBOutlet weak var rssivalues: UILabel!
    var rssicount = 0;
    
    override func viewDidLoad() {
        super.viewDidLoad()
        //centralManagerを起動
        centralManager = CBCentralManager(delegate: self, queue: nil)
        Strongs.image = image0
        alerttext.text = "そのままでお待ちください"
    }
    
    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        print("state: \(central.state)")
        centralManager.scanForPeripherals(withServices: [serviceuuid], options:  [CBCentralManagerScanOptionAllowDuplicatesKey : true])
    }
    
    //scan開始後呼び出される
    func centralManager(_ central: CBCentralManager,didDiscover peripheral: CBPeripheral,advertisementData: [String : Any],rssi RSSI: NSNumber)
    {
        
        print("RSSI:")
        print(RSSI as! Int)
        let rssival = RSSI as! Int
        if rssival < -55{
            Strongs.image = image0
            alerttext.text = "自販機に近づいてください"
        } else if rssival >= -55 && rssival < -50{
            Strongs.image = image1
            alerttext.text = "自販機に近づいてください"
        } else if rssival >= -50 && rssival < -42{
            Strongs.image = image2
            alerttext.text = "自販機に近づいてください"
        } else if rssival > -42{
            Strongs.image = image3
            alerttext.text = "そのままでお待ちください"
        }
        rssivalues.text = String(Int(truncating: RSSI))
        remotePeripheral.add(peripheral)
        print("発見したBLEデバイス: \(peripheral)")
        if RSSI as! Int > -40{
            rssicount = rssicount + 1;
            print(rssicount)
        }
        if rssicount == 5{
            centralManager.connect(peripheral, options: nil)
        }
        
    }
    
    //コネクトして呼ばれる
    func centralManager(_ central: CBCentralManager,didConnect peripheral: CBPeripheral)
    {
        print("接続成功！")
        
        self.peripheral = peripheral
        // サービス探索結果を受け取るためにデリゲートをセット
        peripheral.delegate = self
        // サービスを探索開始
        peripheral.discoverServices([serviceuuid])
    }
    func centralManager(_ central: CBCentralManager,didFailToConnect peripheral: CBPeripheral,error: Error?)
    {
        print("接続失敗・・・")
    }
    
    
    
    func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
        if let error = error {
            print("エラー: \(error)")
            return
        }
        guard let services = peripheral.services, services.count > 0 else {
            print("no services")
            return
        }
        print("\(services.count) 個のサービスを発見！ \(services)")
        
        for service in services {
            // キャラクタリスティックを探索開始 characteristicUUIDを指定
            peripheral.discoverCharacteristics([characteristicUUID], for: service)
        }
    }
    
    //NSErrorでなくError
    func peripheral(_ peripheral: CBPeripheral,
                didDiscoverCharacteristicsFor service: CBService,
                error: Error?) {
        print("キャラクタリスティック発見!")
        
        guard let characteristics = service.characteristics, characteristics.count > 0 else {
            print("no characteristics")
            return

        }
        print("\(String(describing: characteristics.count)) 個のキャラクタリスティックを発見！ \(String(describing: characteristics))")
        for aCharacteristic in characteristics{
            if (aCharacteristic as AnyObject).uuid == characteristicUUID{
                characteristic = aCharacteristic as CBCharacteristic
            }
        }
        let data: NSData! = username.data(using: String.Encoding.utf8) as NSData?//クリア
        if rssicount >= 5 {
            self.peripheral.writeValue(data as Data, for: characteristic, type: .withResponse)//クリア
            performSegue(withIdentifier: "totop", sender: nil);
            centralManager.stopScan()
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if segue.identifier == "totop" {
            let topVC = segue.destination as! topViewController
            let user = username;
            let pass = password;
            topVC.username = user;
            topVC.password = pass;
            topVC.IP = IP;
        }
    }


    @IBAction func totop(_ sender: Any) {
        performSegue(withIdentifier: "totop", sender: nil);
    }
}
