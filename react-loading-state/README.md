# React loading state

Example of how to manage loading state in react app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

Everything is packed in the App.js

- LoadingPage ---> Component that we concern
- LoadingPageContainer ---> Connect component to redux

In ComponentDidMount, we find out if data already fetched from server
In render, we render data if only data is already fetched
Otherwise, we render loading state
