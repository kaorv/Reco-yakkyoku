//
//  listmoveViewController.swift
//  reco_central
//
//  Created by 中野薫 on 2020/08/10.
//  Copyright © 2020 中野薫. All rights reserved.
//

import UIKit

class listmoveViewController: UIViewController {
    
    var username = "";
    var password = "";
    var pagenum = 0;
    var limitpage = 0;
    var IP = ""
    @IBOutlet weak var maxpage: UILabel!
    @IBOutlet var dateArray: [UILabel] = []
    @IBOutlet var itemArray: [UIButton] = []
    @IBOutlet weak var userid: UILabel!
    
        override func viewDidLoad() {
            super.viewDidLoad()
            userid.text = username;
            let stringUrl = "http://\(IP):8000/list.php?username=\(username)&password=\(password)"
                    let url = URL(string: stringUrl.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)!)!
                    let req = URLRequest(url: url)

                    let task = URLSession.shared.dataTask(with: req, completionHandler: {
                        (data, res, err) in if data != nil {
                            let text = NSString(data: data!, encoding: String.Encoding.utf8.rawValue)
                            DispatchQueue.main.async(execute: {
                                //文字列 date=item,date=item,...を,区切りで配列に格納する。
                                var splitarr:[String] = (text?.components(separatedBy: ","))!
                                //結果 : [date=item,date=item,...]
                                print(splitarr)
                                splitarr.removeLast()
                                        
                                        
                                //変数群
                                var numdic  = [Int: String]()
                                let first = self.pagenum*3 //ページネーションの計算
                                let end = (self.pagenum+1)*3-1 //ページネーションの計算
                                var inlabeldic  = [String: String]()
                                var ini = 0; //初期値
                                self.maxpage.text = String(splitarr.count)
                                        
                                //splitarrを昇順の番号をつけて辞書に格納する。
                                for j in 0...splitarr.count-1{
                                    numdic.updateValue(splitarr[j], forKey: j)
                                }
                                        
                                        
                                //結果 : [0:"date=item",1:"date=item",...]
                                //何もない場合の結果：[0:"",1:"",...]
                                        
                                //pagenumページに表示するitemだけを取り出しdate=itemを[date,item]の
                                //配列に変換し、それらを再びinlabeldicに格納する。
                                for i in first...end{
//                                    print("i")
//                                    print(i)
                                    print(numdic)
                                    let pagedic = numdic[i]
//                                    print("pagedic")
//                                    print(pagedic!)
                                    if pagedic != nil{
                                        let valarr:[String] = pagedic!.components(separatedBy: "=")
                                        print(valarr)
                                        let key = "\(valarr[0])" + String(i)
                                        inlabeldic.updateValue(valarr[1], forKey: key)
                                    } else {
//                                      inlabeldic.updateValue("nil", forKey: "nil")
                                    }
                                            
                                }
                                //inlabeldicの各インデックス、各値をlabelとボタンの値に格納する。
                                for (key, value) in inlabeldic{
                                    print(key)
                                    self.dateArray[ini].text = "\(key)"
                                    self.itemArray[ini].setTitle("\(value)", for: .normal)
                                    ini = ini + 1
                                }
                            })
                        }else{
                            DispatchQueue.main.async(execute: {
                            })
                        }
                        
            })
    task.resume()
    }
        
        override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
            
            if segue.identifier == "totop" {
                let topVC = segue.destination as! topViewController
                let user = username
                let pass = password
                print(user)
                print(pass)
                topVC.username = user
                topVC.password = pass
                topVC.IP = IP
            }
            
            if segue.identifier == "tonextpage" {
                let listmoveVC = segue.destination as! listViewController
                pagenum = pagenum + 1;
                let user = username
                let pass = password
                let page = pagenum;
//                print("passpagenumplus:")
//                print(page)
                listmoveVC.username = user
                listmoveVC.password = pass
                listmoveVC.pagenum = page
                listmoveVC.IP = IP
            }
            
            if segue.identifier == "tobackpage" {
                let listmoveVC = segue.destination as! listViewController
                pagenum = pagenum - 1;
                let user = username
                let pass = password
                let page = pagenum
//                print("passpagenumminus:")
//                print(page)
                listmoveVC.username = user
                listmoveVC.password = pass
                listmoveVC.pagenum = page
                listmoveVC.IP = IP
            }
            if segue.identifier == "first" {
                let detailsVC = segue.destination as! detailsViewController
                let item = itemArray[0].currentTitle
                let user = username
                let pass = password
                let page = pagenum
                let from = "move"
                detailsVC.from = from
                detailsVC.username = user
                detailsVC.password = pass
                detailsVC.pagenum = page
                detailsVC.itemname = item ?? String()
                detailsVC.IP = IP
            }
            if segue.identifier == "second" {
                let detailsVC = segue.destination as! detailsViewController
                let item = itemArray[1].currentTitle
                let user = username
                let pass = password
                let page = pagenum
                let from = "move"
                detailsVC.from = from
                detailsVC.username = user
                detailsVC.password = pass
                detailsVC.pagenum = page
                detailsVC.itemname = item ?? String()
                detailsVC.IP = IP
            }
            if segue.identifier == "third" {
                let detailsVC = segue.destination as! detailsViewController
                let item = itemArray[2].currentTitle
                let user = username
                let pass = password
                let page = pagenum
                let from = "move"
                detailsVC.from = from
                detailsVC.username = user
                detailsVC.password = pass
                detailsVC.pagenum = page
                detailsVC.itemname = item ?? String()
                detailsVC.IP = IP
            }
        }
        
        @IBAction func totop(_ sender: Any) {
            performSegue(withIdentifier: "totop", sender: nil);
        }
        
        @IBAction func next(_ sender: Any) {
            let num = maxpage.text!
            print("num:")
            print((Int(num)! / 4) - 1)
            print("pagenum")
            print(pagenum)
            if pagenum < (Int(num)! / 4) - 1 {
                performSegue(withIdentifier: "tonextpage", sender: nil);
            }
        }
        
        @IBAction func back(_ sender: Any) {
            if pagenum > 0{
                performSegue(withIdentifier: "tobackpage", sender: nil);
            }
        }
    @IBAction func first(_ sender: Any) {
        if itemArray[0].currentTitle != nil {
            performSegue(withIdentifier: "first", sender: nil);
        }
    }
    
    @IBAction func second(_ sender: Any) {
        if itemArray[1].currentTitle != nil {
            performSegue(withIdentifier: "second", sender: nil);
        }
    }
    
        
    @IBAction func third(_ sender: Any) {
        if itemArray[2].currentTitle != nil {
            performSegue(withIdentifier: "third", sender: nil);
        }
    }
    
    }
