//
//  RedView.swift
//  TestSubViews
//
//  Created by Chakrit Likitkhajorn on 1/5/2560 BE.
//  Copyright © 2560 Chakrit Likitkhajorn. All rights reserved.
//

import UIKit

class RedView: UIView {

  
    // Only override draw() if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
  
  public var helloText: String = "Hello v1"
  
  override func draw(_ rect: CGRect) {
    lblTitle.text = helloText
  }
 

  @IBOutlet weak var lblTitle: UILabel!
  @IBOutlet weak var btnSayHi: UIButton!
  
  
  @IBAction func hiClicked(_ sender: Any) {
    self.lblTitle.text = "Hello user"
    self.btnSayHi.setTitle("Your welcome", for: .normal)
  }
}
