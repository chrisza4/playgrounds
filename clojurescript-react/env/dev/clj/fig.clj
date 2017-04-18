(ns fig
  (:require [figwheel-sidecar.repl-api :as ra]))

(defn start []
  (ra/start-figwheel!)
  (ra/cljs-repl))
