(ns todomvc.core.item
  (:require [reagent.core :as r]))

(defn todo-item-component [{:keys [editing
                                   completed
                                   title
                                   key
                                   on-toggle
                                   on-delete]}]
  [:li {:key key
        :class (clojure.string/join
                 " "
                 (filter some?
                        [(if editing "editing" nil)
                         (if completed "completed" nil)]))}
    [:div {:class "view"}
     [:input {:class "toggle"
              :type "checkbox"
              :checked completed
              :on-change #(on-toggle key)}]
     [:label title]
     [:button {:class "destroy"
               :on-click #(on-delete key)}]]])
