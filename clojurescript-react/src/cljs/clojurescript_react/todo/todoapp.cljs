(ns todomvc.core
  (:require [reagent.core :as r]
            [todomvc.core.header :as todo-header]
            [todomvc.core.item :as todo-item]
            [todomvc.state :as todo-state]))

(defonce init (do
                (todo-state/add-todo "Red")
                (todo-state/add-todo "Green")
                (todo-state/add-todo "Refactor")))

(defn todo-board [props]
  [:div
    [:div{:class "todoapp"}
      [todo-header/todo-header {:on-save todo-state/add-todo}]
      [:ul {:class "todo-list"}
       (map
         #(let [{:keys [editing completed title id]} %]
               (todo-item/todo-item-component {:editing editing
                                               :completed completed
                                               :title title
                                               :key id}))
         (vals (:items props)))]]])

(defn todo-app []
  (todo-board {:items @todo-state/todo-data}))
