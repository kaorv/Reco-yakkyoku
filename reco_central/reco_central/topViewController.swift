//
//  topViewController.swift
//  reco_central
//
//  Created by 中野薫 on 2020/08/09.
//  Copyright © 2020 中野薫. All rights reserved.
//

import UIKit
import CoreBluetooth

class topViewController: UIViewController , CBCentralManagerDelegate, CBPeripheralDelegate  {
    
    
    var centralManager: CBCentralManager!
    var peripheral: CBPeripheral!
    var myPeripheral = [String]()//追加
    var characteristic: CBCharacteristic!
    var remotePeripheral: NSMutableArray = []
    var characteristics: NSArray=[]
    let serviceuuid = CBUUID(string:"B05A6F6D-6164-4384-A062-B4FE8C8FA900")
    let characteristicUUID = CBUUID(string: "95D10367-A094-4698-A995-1102A8C701BB")
    var username = "";
    var password = "";
    var IP = "";
    
    @IBOutlet weak var loginuser: UILabel!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        loginuser.text = username;
        //centralManagerを起動
        centralManager = CBCentralManager(delegate: self, queue: nil)
    }
    
    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        centralManager.scanForPeripherals(withServices: [serviceuuid], options:  [CBCentralManagerScanOptionAllowDuplicatesKey : true])
    }
    
    func centralManager(_ central: CBCentralManager,didDiscover peripheral: CBPeripheral,advertisementData: [String : Any],rssi RSSI: NSNumber)
    {
        
        print("RSSI:")
        print(RSSI as! Int)
        let rssival = RSSI as! Int
        if rssival > -50 {
            performSegue(withIdentifier: "toble", sender: nil);
            centralManager.stopScan()
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if segue.identifier == "buylist" {
            let listVC = segue.destination as! listViewController
            let user = username;
            let pass = password;
            listVC.username = user;
            listVC.password = pass;
            listVC.IP = IP;
        }
        
        if segue.identifier == "toble" {
            let bleVC = segue.destination as! ViewController
            let user = username;
            let pass = password;
            bleVC.username = user;
            bleVC.password = pass;
            bleVC.IP = IP;
        }
        
        if segue.identifier == "logout" {
            
        }
        
        if segue.identifier == "uploader" {
            let uploaderVC = segue.destination as! fileuploaderViewController
            let user = username;
            let pass = password;
            uploaderVC.username = user;
            uploaderVC.password = pass;
            uploaderVC.IP = IP;
        }
    }
    
    @IBAction func buylist(_ sender: Any) {
        performSegue(withIdentifier: "buylist", sender: nil);
    }
    

    @IBAction func toble(_ sender: Any) {
        performSegue(withIdentifier: "toble", sender: nil);
    }
    

    @IBAction func logout(_ sender: Any) {
        performSegue(withIdentifier: "logout", sender: nil);
    }
    //ファイルアップロード
//    @IBAction func fileuploader(_ sender: Any) {
//        performSegue(withIdentifier: "uploader", sender: nil);
//    }
}
