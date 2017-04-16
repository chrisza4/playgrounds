(ns todomvc.core.header
  (:require [reagent.core :as r]))

(def input-value (r/atom ""))

(defn todo-header [props]
  [:header {:class "header"}
    [:h1 "Todo"]
    [:input {:class "new-todo"
             :value @input-value
             :placeholder "What's need to be done"
             :on-change #(reset! input-value (-> % .-target .-value))
             :on-key-down #(if (= (.-which %) 13)
                            (do
                              ((:on-save props) @input-value)
                              (reset! input-value "")))}]])
