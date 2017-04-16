(ns todomvc.core.item
  (:require [reagent.core :as r]))

(defn todo-input [{:keys [title on-save]}]
  (let [edit-value (r/atom title)]
    (fn []
      [:input {:class "edit"
               :value @edit-value
               :auto-focus true
               :on-change #(reset! edit-value (-> % .-target .-value))
               :on-key-down #(case (.-which %)
                               13 (on-save @edit-value)
                               nil)}])))

(defn todo-item-component [{:keys [editing
                                   completed
                                   title
                                   key
                                   on-toggle
                                   on-delete
                                   on-edit
                                   on-edit-title]}]
  (let [edit-value (r/atom "")]
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
      [:label {:on-double-click #(on-edit key)} title]
      [:button {:class "destroy"
                :on-click #(on-delete key)}]]
     (when editing
      [todo-input {:title title
                   :on-save #(do
                               (on-edit-title key %)
                               (on-edit key))}])]))
