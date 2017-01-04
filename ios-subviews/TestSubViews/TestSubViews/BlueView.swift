//
//  BlueView.swift
//  TestSubViews
//
//  Created by Chakrit Likitkhajorn on 1/5/2560 BE.
//  Copyright © 2560 Chakrit Likitkhajorn. All rights reserved.
//

import UIKit

class BlueView: UIView {

    /*
    // Only override draw() if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    override func draw(_ rect: CGRect) {
        // Drawing code
    }
    */

  @IBOutlet weak var lblTitle: UILabel!
  @IBOutlet weak var superSwitch: UISwitch!
  
  @IBAction func switchChanged(_ sender: Any) {
    let newTitle = superSwitch.isOn ? "On" : "Off"
    lblTitle.text = newTitle
  }
}
