# Test ios Subview

Very simple things, try to put multiple subview from multiple XIB into one view

There are main viewController, BlueView and RedView.

I found that Swift way to integrate programmatically subview from XIB into larger view is kinda messy, so I wrote `loadViewFromNibIntoSubview` instead.

Why apple and swift don't make it this way from the start? (or make subview useable in storyboard). This is such a really simple interface which will encourage usage of small views, which make code a lot cleaner.
