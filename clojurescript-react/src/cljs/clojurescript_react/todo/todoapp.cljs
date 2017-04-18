(ns todomvc.core
  (:require [reagent.core :as r]
            [todomvc.core.header :as todo-header]
            [todomvc.core.item :as todo-item]
            [todomvc.footer :as todo-footer]
            [todomvc.state :as todo-state]))

(defonce init (do
                (todo-state/add-todo "Red")
                (todo-state/add-todo "Green")
                (todo-state/add-todo "Refactor")))

(defn filter-todo [todos type]
  (case type
    "all" todos
    "active" (filter #(not (:completed %)) todos)
    "completed" (filter #(:completed %) todos)))

(defn todo-board [{:keys [items todo-filter]}]
  (let [filtered-todos (filter-todo (vals items) todo-filter)]
    [:div
     [:div {:class "todoapp"}
      [todo-header/todo-header {:on-save todo-state/add-todo}]
      [:ul {:class "todo-list"}
       (doall
         (map
           #(let [{:keys [editing completed title id]} %]
              (todo-item/todo-item-component {:editing editing
                                              :completed completed
                                              :title title
                                              :on-toggle todo-state/toggle-todo
                                              :on-delete todo-state/delete-todo
                                              :on-edit todo-state/toggle-edit-todo
                                              :on-edit-title todo-state/edit-todo
                                              :key id}))
           filtered-todos))]
      [todo-footer/todo-footer {:count (count (filter-todo filtered-todos "active"))
                                :filter todo-filter
                                :on-filter #(do
                                              (js/console.log "change to:" %)
                                              (todo-state/change-filter %))}]]]))

(defn todo-app []
  (let [{:keys [todo-data todo-filter]} @todo-state/app-state]
    [todo-board {:items todo-data
                 :todo-filter todo-filter}]))
