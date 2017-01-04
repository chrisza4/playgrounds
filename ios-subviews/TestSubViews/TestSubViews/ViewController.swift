//
//  ViewController.swift
//  TestSubViews
//
//  Created by Chakrit Likitkhajorn on 1/5/2560 BE.
//  Copyright © 2560 Chakrit Likitkhajorn. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

  @IBOutlet weak var topView: UIView!
  @IBOutlet weak var bottomView: UIView!
  
  override func viewDidLoad() {
    super.viewDidLoad()
    if let redView = Bundle.main.loadNibNamed("RedView", owner: self, options: nil)!.first as? RedView {
      topView.addSubview(redView)
      redView.translatesAutoresizingMaskIntoConstraints = false
      topView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-0-[view]-0-|", options: NSLayoutFormatOptions(rawValue: 0), metrics: nil, views: ["view":redView]))
      topView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:|-0-[view]-0-|", options: NSLayoutFormatOptions(rawValue: 0), metrics: nil, views: ["view":redView]))
    }
    if let blueView = Bundle.main.loadNibNamed("BlueView", owner: self, options: nil)!.first as? BlueView {
      bottomView.addSubview(blueView)
      blueView.translatesAutoresizingMaskIntoConstraints = false
      bottomView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-0-[view]-0-|", options: NSLayoutFormatOptions(rawValue: 0), metrics: nil, views: ["view":blueView]))
      bottomView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:|-0-[view]-0-|", options: NSLayoutFormatOptions(rawValue: 0), metrics: nil, views: ["view":blueView]))
    }
  }

  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }

}

