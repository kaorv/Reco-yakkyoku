//
//  fileuploadermoveViewController.swift
//  reco_central
//
//  Created by 中野薫 on 2020/08/16.
//  Copyright © 2020 中野薫. All rights reserved.
//

import UIKit

class fileuploadermoveViewController: UIViewController {
    
    var username = ""
    var password = ""
    var IP = ""
    var pagenum = 0
    var strArray = [String]()
    var userdir = [String]()
    var userdirname = ""
    var arraycount = 0;
    var pagelimit = 0;
    var nextpagenum = 0;
    @IBOutlet var buttonArray: [UIButton] = []
    @IBOutlet var filenameArray: [UILabel] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print(pagenum)
        let fm = FileManager.default
        let documentsPath = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).first!
        //let documentURL = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!
        print(documentsPath)
        let filePath = documentsPath + "/sample.txt"
        if !fm.fileExists(atPath: filePath) {
            fm.createFile(atPath: filePath, contents: nil, attributes: [:])
        }
        let fileNames = try? FileManager.default.contentsOfDirectory(atPath: documentsPath)
        print(fileNames!)
        
        arraycount = fileNames!.count
        
        pagelimit = arraycount/5
        
        //pagenum = 0,arraycount = 4
        if pagenum == pagelimit {
            let first = ( arraycount / 5 ) * 5
            let end = arraycount - 1
            for i in first...end{
                let name = fileNames![i]
                let lim = i - pagenum * 5
                filenameArray[lim].text = name
                buttonArray[lim].setTitle("upload", for: .normal)
            }
        } else {
            let first = pagenum * 5
            let end = pagenum * 5 + 4
            for i in first...end{
                let name = fileNames![i]
                let lim = i - pagenum * 5
                filenameArray[lim].text = name
                buttonArray[lim].setTitle("upload", for: .normal)
            }
        }
        // Do any additional setup after loading the view.
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
        
        if segue.identifier == "tonext" {
            let nextpageVC = segue.destination as! fileuploaderViewController
            let user = username;
            let pass = password;
            let next = nextpagenum;
            print("next:")
            print(next)
            nextpageVC.username = user;
            nextpageVC.password = pass;
            nextpageVC.IP = IP;
            nextpageVC.pagenum = next;
        }
        
        if segue.identifier == "toback" {
            let backpageVC = segue.destination as! fileuploaderViewController
            let user = username;
            let pass = password;
            let next = nextpagenum;
            print("next:")
            print(next)
            backpageVC.username = user;
            backpageVC.password = pass;
            backpageVC.IP = IP;
            backpageVC.pagenum = next;
        }
    }
    
    @IBAction func backtop(_ sender: Any) {
        performSegue(withIdentifier: "totop", sender: nil);
    }
    
    @IBAction func uploader0(_ sender: Any) {
        let fn = filenameArray[0].text
        strArray = fn!.components(separatedBy: ".")
        userdir = username.components(separatedBy: ".")
        userdirname = userdir[0] + userdir[1]
        
        var req = URLRequest(url: URL(string: "http://\(IP):8000/fileuploader.php?username=\(userdirname)")!)
        req.httpMethod = "POST"
        let path = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0].appendingPathComponent(strArray[0]).appendingPathExtension(strArray[1])
        print(path)
        print(fn!)
        URLSession.shared.uploadTask(with: req, fromFile: path) { (data, res, err) in
             print("success!")
        }.resume()
    }
    
    @IBAction func uploader1(_ sender: Any) {
        let fn = filenameArray[1].text
        strArray = fn!.components(separatedBy: ".")
        userdir = username.components(separatedBy: ".")
        userdirname = userdir[0] + userdir[1]
        var req = URLRequest(url: URL(string: "http://\(IP):8000/fileuploader.php?username=\(userdirname)")!)
        req.httpMethod = "POST"
        let path = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0].appendingPathComponent(strArray[0]).appendingPathExtension(strArray[1])
        print(path)
        print(fn!)
        URLSession.shared.uploadTask(with: req, fromFile: path) { (data, res, err) in
             print("success!")
        }.resume()
    }
    
    @IBAction func uploader2(_ sender: Any) {
        let fn = filenameArray[2].text
        strArray = fn!.components(separatedBy: ".")
        userdir = username.components(separatedBy: ".")
        userdirname = userdir[0] + userdir[1]
        
        var req = URLRequest(url: URL(string: "http://\(IP):8000/fileuploader.php?username=\(userdirname)")!)
        req.httpMethod = "POST"
        let path = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0].appendingPathComponent(strArray[0]).appendingPathExtension(strArray[1])
        print(path)
        print(fn!)
        URLSession.shared.uploadTask(with: req, fromFile: path) { (data, res, err) in
             print("success!")
        }.resume()
    }
    
    @IBAction func uploader3(_ sender: Any) {
        let fn = filenameArray[3].text
        strArray = fn!.components(separatedBy: ".")
        userdir = username.components(separatedBy: ".")
        userdirname = userdir[0] + userdir[1]
        
        var req = URLRequest(url: URL(string: "http://\(IP):8000/fileuploader.php?username=\(userdirname)")!)
        req.httpMethod = "POST"
        let path = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0].appendingPathComponent(strArray[0]).appendingPathExtension(strArray[1])
        print(path)
        print(fn!)
        URLSession.shared.uploadTask(with: req, fromFile: path) { (data, res, err) in
             print("success!")
        }.resume()
    }
    
    @IBAction func uploader4(_ sender: Any) {
        let fn = filenameArray[4].text
        strArray = fn!.components(separatedBy: ".")
        userdir = username.components(separatedBy: ".")
        userdirname = userdir[0] + userdir[1]
        
        var req = URLRequest(url: URL(string: "http://\(IP):8000/fileuploader.php?username=\(userdirname)")!)
        req.httpMethod = "POST"
        let path = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0].appendingPathComponent(strArray[0]).appendingPathExtension(strArray[1])
        print(path)
        print(fn!)
        URLSession.shared.uploadTask(with: req, fromFile: path) { (data, res, err) in
             print("success!")
        }.resume()
    }
    
    @IBAction func backpage(_ sender: Any) {
        if pagenum > 0{
            nextpagenum = pagenum - 1;
            performSegue(withIdentifier: "toback", sender: nil);
        } else {
            print("none page")
        }
        
    }
    
    @IBAction func nextpage(_ sender: Any) {
        if pagelimit > pagenum{
            nextpagenum = pagenum + 1;
            performSegue(withIdentifier: "tonext", sender: nil);
        } else {
            print("none page")
        }
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
