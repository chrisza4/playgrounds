(ns todomvc.state
  (:require [reagent.core :as r]
            [cljs-uuid-utils.core :as uuid]))

(def todo-data (r/atom (array-map)))

(defn add-todo [title]
  (let [new-uuid (uuid/uuid-string (uuid/make-random-uuid))]
       (swap! todo-data assoc new-uuid {:id new-uuid
                                        :title title
                                        :completed false
                                        :editing false})))
