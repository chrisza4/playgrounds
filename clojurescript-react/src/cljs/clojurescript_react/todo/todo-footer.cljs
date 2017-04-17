(ns todomvc.footer
  (:require [reagent.core :as r]))

(defn todo-footer [props]
  [:footer {:class "footer"}
   [:span {:class "todo-count"}
    [:strong (str (:count props) " item(s) left")]]
   (let [class-name-for #(if (= (:filter props) %) "selected" "")
         create-li
          (fn [filter-type title]
           [:li [:span {:class (class-name-for filter-type)
                        :on-click #((:on-filter props) filter-type)} title]])]
    [:ul {:class "filters"}
     (create-li "all" "All")
     (create-li "active" "Active")
     (create-li "completed" "Completed")])
   [:button {:class "clear-completed"} "Clear completed"]])
