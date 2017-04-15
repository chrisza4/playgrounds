(ns todomvc.core
  (:require [reagent.core :as r]
            [todomvc.core.header :as todo-header]
            [todomvc.core.item :as todo-item]
            [cljs-uuid-utils.core :as uuid]))

(def todo-data (r/atom (array-map)))

(defn add-todo [title]
  (let [new-uuid (uuid/uuid-string (uuid/make-random-uuid))]
       (swap! todo-data assoc new-uuid {:id new-uuid :title title})))

(add-todo "Red")
(add-todo "Green")
(add-todo "Refactor")

(defn todo-board [props]
  [:div
    [:div{:class "todoapp"}
      [todo-header/todo-header {:on-save #(js/alert "save")}]
      [:ul {:class "todo-list"}
       (map
         #(let [{:keys [editing completed title id]} %]
               (todo-item/todo-item-component {:editing editing
                                               :completed completed
                                               :title title
                                               :key id}))
         (vals (:items props)))]]])

(defn todo-app []
  (todo-board {:items @todo-data}))
