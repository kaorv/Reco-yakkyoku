//
//  detailsViewController.swift
//  reco_central
//
//  Created by 中野薫 on 2020/08/10.
//  Copyright © 2020 中野薫. All rights reserved.
//

import UIKit

class detailsViewController: UIViewController {
    
    @IBOutlet weak var itemnamelabel: UILabel!
    @IBOutlet weak var detail: UILabel!
    var username = "";
    var password = "";
    var pagenum = 0;
    var itemname = "";
    var from = "";
    var IP = "";
    
    override func viewDidLoad() {
        super.viewDidLoad()
        itemnamelabel.text = itemname
        
        let item = itemname;
        let stringUrl = "http://\(IP):8000/detail.php?item=\(item)"
        let url = URL(string: stringUrl.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)!)!
        let req = URLRequest(url: url)
        let task = URLSession.shared.dataTask(
            with: req,
            completionHandler: {
                (data, res, err) in
                if data != nil {
                    let text = NSString(data: data!, encoding: String.Encoding.utf8.rawValue)
                    print(text!)
                    DispatchQueue.main.async(execute: {
                        
                        self.detail.text = text as String?
                    })
                }else{
                    DispatchQueue.main.async(execute: {
//                    self.resultlabel.text = "ERROR"
                })
            }
        })
        task.resume()
}
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "back" {
            let listVC = segue.destination as! listViewController
            let user = username
            let pass = password
            let page = pagenum
            print(user)
            print(pass)
            listVC.username = user
            listVC.password = pass
            listVC.pagenum = page
            listVC.IP = IP
        }
        if segue.identifier == "backmove" {
            let listVC = segue.destination as! listmoveViewController
            let user = username
            let pass = password
            let page = pagenum
            print(user)
            print(pass)
            listVC.username = user
            listVC.password = pass
            listVC.pagenum = page
            listVC.IP = IP
        }
    }
    
    @IBAction func back(_ sender: Any) {
        if from == "original"{
            performSegue(withIdentifier: "back", sender: nil);
        }
        if from == "move"{
            performSegue(withIdentifier: "backmove", sender: nil);
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
