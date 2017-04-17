(ns todomvc.core
  (:require [reagent.core :as r]
            [todomvc.core.header :as todo-header]
            [todomvc.core.item :as todo-item]
            [todomvc.footer :as todo-footer]
            [todomvc.state :as todo-state]))

(defonce init (do
                (todo-state/add "Red")
                (todo-state/add "Green")
                (todo-state/add "Refactor")))

(defn filter-todo [todos type]
  (case type
    "all" todos
    "active" (filter #(not (:completed %)) todos)
    "completed" (filter #(:completed %) todos)))

(defn todo-board [{:keys [items]}]
 (let [todo-filter (r/atom "all")
       filtered-todos (filter-todo (vals items) @todo-filter)]
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
       filtered-todos))]
    [todo-footer/todo-footer {:count (count (filter-todo filtered-todos "active"))
                              :filter @todo-filter
                              :on-filter #(reset! todo-filter %)}]]]))

(defn todo-app []
  [todo-board {:items @todo-state/todo-data}])
