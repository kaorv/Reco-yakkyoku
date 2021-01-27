//
//  LoginViewController.swift
//  reco_central
//
//  Created by 中野薫 on 2020/07/12.
//  Copyright © 2020 中野薫. All rights reserved.
//

import UIKit
import WebKit

class LoginViewController: UIViewController {

    @IBOutlet weak var webview: WKWebView!
    override func viewDidLoad() {
        super.viewDidLoad()
        if let url = URL(string: "http://~:49170/accountadd") {  // URL文字列の表記間違いなどで、URL()がnilになる場合があるため、nilにならない場合のみ以下のload()が実行されるようにしている
          self.webview.load(URLRequest(url: url))
        }

        // Do any additional setup after loading the view.
    }


}
