(ns clojurescript-react.core
    (:require [reagent.core :as reagent :refer [atom]]
              [reagent.session :as session]
              [secretary.core :as secretary :include-macros true]
              [accountant.core :as accountant]
              [todomvc.core :as todo]))

;; -------------------------
;; Views

(defn home-page []
  [:div
    [:h2 "Welcome to clojurescript-react: Chris"]
    [:div [:a {:href "/about"} "go to about page"]]
    [:div [:a {:href "/todo"} "go to todo app"]]
    [:div [:a {:href "/todo"} "go to todo app"]]])


(defn about-page []
  [:div [:h2 "Todo by clojurescript react"]])

(defn todo-page []
  [todo/todo-app])

(defn current-page []
  [:div [(session/get :current-page)]])

;; -------------------------
;; Routes

(secretary/defroute "/" []
  (session/put! :current-page #'home-page))

(secretary/defroute "/about" []
  (session/put! :current-page #'about-page))

(secretary/defroute "/todo" []
  (session/put! :current-page #'todo-page))

;; -------------------------
;; Initialize app

(defn mount-root []
  (reagent/render [#'current-page] (.getElementById js/document "app")))

(defn init! []
  (accountant/configure-navigation!
    {:nav-handler
     (fn [path]
       (secretary/dispatch! path))
     :path-exists?
     (fn [path]
       (secretary/locate-route path))})
  (accountant/dispatch-current!)
  (mount-root))
