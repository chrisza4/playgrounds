(ns todomvc.footer
  (:require [reagent.core :as r]))

(defn todo-footer [props]
  [:footer {:class "footer"}
   [:span {:class "todo-count"}
    [:strong (str (:count props) " item(s) left")]]
   (let [class-name-for #(if (= (:filter props) %) "selected" "")]
    [:ul {:class "filters"}
     [:li [:span {:class (class-name-for "all")
                  :on-click #((:on-filter props) "all")} "All"]]
     [:li [:span {:class (class-name-for "active")
                  :on-click #((:on-filter props) "active")} "Active"]]
     [:li [:span {:class (class-name-for "completed")
                  :on-click #((:on-filter props) "completed")} "Completed"]]])
   [:button {:class "clear-completed"} "Clear completed"]])
