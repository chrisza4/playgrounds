(ns clojurescript-react.prod
  (:require [clojurescript-react.core :as core]))

;;ignore println statements in prod
(set! *print-fn* (fn [& _]))

(core/init!)
