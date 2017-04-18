(ns todomvc.state
  (:require [reagent.core :as r]
            [cljs-uuid-utils.core :as uuid]))

(defonce app-state (r/atom {:todo-data (array-map)
                            :todo-filter "all"}))

(defn add-todo [title]
  (let [new-uuid (uuid/uuid-string (uuid/make-random-uuid))]
       (swap! app-state assoc-in [:todo-data new-uuid] {:id new-uuid
                                                        :title title
                                                        :completed false
                                                        :editing false})))
(defn toggle-todo [id]
 (swap! app-state update-in [:todo-data id :completed] not))

(defn delete-todo [id]
  (swap! app-state update :todo-data dissoc id))

(defn toggle-edit-todo [id]
  (swap! app-state update-in [:todo-data id :editing] not))

(defn edit-todo [id title]
  (swap! app-state assoc-in [:todo-data id :title] title))

(defn change-filter [x]
  (swap! app-state assoc :todo-filter x))
