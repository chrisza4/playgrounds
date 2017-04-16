(ns todomvc.core
  (:require [reagent.core :as r]
            [todomvc.core.header :as todo-header]
            [todomvc.core.item :as todo-item]
            [todomvc.state :as todo-state]))

(defonce init (do
                (todo-state/add "Red")
                (todo-state/add "Green")
                (todo-state/add "Refactor")))

(defn todo-board [props]
  [:div
    [:div{:class "todoapp"}
      [todo-header/todo-header {:on-save todo-state/add}]
      [:ul {:class "todo-list"}
       (doall
        (map
         #(let [{:keys [editing completed title id]} %]
               (todo-item/todo-item-component {:editing editing
                                               :completed completed
                                               :title title
                                               :on-toggle todo-state/toggle
                                               :on-delete todo-state/delete
                                               :on-edit todo-state/toggle-edit
                                               :on-edit-title todo-state/edit
                                               :key id}))
         (vals (:items props))))]]])

(defn todo-app []
  (todo-board {:items @todo-state/todo-data}))
