# Hot reload webpack experiment

I experiment how-to use hot module reload on old jquery legacy code.

Solution is quite nice

1. Use webpack.config as state in this repository
2. Change `publicpath` in the webpack.config.js under `devServer` to be the port that you will serve webpack
3. in entry point, use

```
if (module.hot) {
  module.hot.accept('./jqueryModule1', () => {
    executeWhenReady()
  })

  module.hot.accept('./reactModule', () => {
    render(ReactComponent)
  })
}
```

to load the module that needed and tell webpack what to do for hot reloading for each module

Done deal~!!!
