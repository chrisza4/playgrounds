(ns todomvc.state
  (:require [reagent.core :as r]
            [cljs-uuid-utils.core :as uuid]))

(defonce todo-data (r/atom (array-map)))

(defn add [title]
  (let [new-uuid (uuid/uuid-string (uuid/make-random-uuid))]
       (swap! todo-data assoc new-uuid {:id new-uuid
                                        :title title
                                        :completed false
                                        :editing false})))
(defn toggle [id]
 (swap! todo-data update-in [id :completed] not))

(defn delete [id]
  (swap! todo-data dissoc id))

(defn toggle-edit [id]
  (swap! todo-data update-in [id :editing] not))

(defn edit [id title]
  (swap! todo-data assoc-in [id :title] title))
