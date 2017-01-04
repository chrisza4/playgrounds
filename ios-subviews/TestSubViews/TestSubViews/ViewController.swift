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
    let redView = self.loadViewFromNibIntoSubview(topView, nibNamed: "RedView") as! RedView
    redView.helloText = "Hello v2 from ViewController"
    self.loadViewFromNibIntoSubview(bottomView, nibNamed: "BlueView")
  }
  
  @discardableResult
  func loadViewFromNibIntoSubview(_ view: UIView, nibNamed: String) -> UIView? {
    if let subView = Bundle.main.loadNibNamed(nibNamed, owner: self, options: nil)!.first as? UIView {
      view.addSubview(subView)
      subView.translatesAutoresizingMaskIntoConstraints = false
      view.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-0-[view]-0-|", options: NSLayoutFormatOptions(rawValue: 0), metrics: nil, views: ["view":subView]))
      view.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:|-0-[view]-0-|", options: NSLayoutFormatOptions(rawValue: 0), metrics: nil, views: ["view":subView]))
      return subView
    } else {
      return nil
    }
  }

  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
  }

}

