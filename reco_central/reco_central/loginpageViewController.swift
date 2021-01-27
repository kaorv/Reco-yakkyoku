import UIKit

class loginpageViewController: UIViewController {

    @IBOutlet weak var resultlabel: UILabel!
    @IBOutlet weak var username: UITextField!
    @IBOutlet weak var password: UITextField!
    @IBOutlet weak var idpasserror: UILabel!
    
    var errorcomment = "";
    var flag:Int = 0 {
        willSet{
        }
        didSet {
            performSegue(withIdentifier: "totop", sender: nil);
        }
    }
    var IP = "~";
    
    @IBAction func Login(_ sender: Any) {
        if username.text != "" && password.text != "" {
            let name = username.text!
            let pass  = password.text!
            print("startname:")
            print(name)
            print("startpass:")
            print(pass)
            let stringUrl = "http://\(IP):8000/login.php?username=\(name)&password=\(pass)"
            let url = URL(string: stringUrl.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)!)!
            let req = URLRequest(url: url)

            let task = URLSession.shared.dataTask(
                with: req,
                completionHandler: {
                (data, res, err) in
                if data != nil {
                    let text = NSString(data: data!, encoding: String.Encoding.utf8.rawValue)
                    print(text ?? String())
                    DispatchQueue.main.async(execute: {
                        if text == "success"{
                            self.flag = 1;
                        } else {
                            self.idpasserror.text = "IDまたはPASSWORDが間違っています。";
                            self.username.text = "";
                            self.password.text = "";
                        }
                    })
                }else{
                    DispatchQueue.main.async(execute: {
                        self.resultlabel.text = "ERROR"
                    })
                }
            })
            
            task.resume()
        }else{
            // 未入力
            alert("error", messageString: "It is not entered.", buttonString: "OK")
        }
    }
    

    func alert(_ titleString: String, messageString: String, buttonString: String){
        
        let alert: UIAlertController = UIAlertController(title: titleString, message: messageString, preferredStyle: .alert)
        let action = UIAlertAction(title: buttonString, style: .default) { action in
            NSLog("\(titleString):Push button!")
        }
        //Add action
        alert.addAction(action)
        //Start
        present(alert, animated: true, completion: nil)
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool{
        //Close keyboard.
        textField.resignFirstResponder()
        return true
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        idpasserror.text = errorcomment;
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        
    }
    
    @IBAction func enduserinput(_ sender: Any) {
        
    }
    
    @IBAction func endpassinput(_ sender: Any) {
        
    }
    
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let nextVC = segue.destination as! topViewController
        let user = username.text!
        let pass = password.text!
        let ip = IP
        nextVC.username = user;
        nextVC.password = pass;
        nextVC.IP = ip;
    }
}
