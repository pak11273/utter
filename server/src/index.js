require('babel-register')
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var {StaticRouter} = require('react-router')
var path = require('path')
var fs = require('fs')
var {renderToString} = require('react-dom/server')
var {ServerStyleSheet, StyleSheetManager} = require('styled-components')

// enables node to import images
require('images-require-hook')(
  ['jpg', 'jpeg', 'png', 'gif', 'svg'],
  '../../client/src/assets/images'
)

// becuz we are doing es5 here and serverApp is doing es6, you have to use .default
const App = require('../../client/src/App').default

// imports
var config = require('./config/config')
var express = require('express')
var app = require('./server')
var logger = require('./util/logger')

// static sites DO NOT USE: WILL PREVENT SERVERSIDE RENDERING
// app.use(express.static(path.join(__dirname, '/../../client/src/')))
app.use(express.static(path.join(__dirname, '/../client/src/')))

// todo: create and use logger
app
  .use(function(req, res) {
    const context = {}
    const html = ReactDOMServer.renderToString(
      React.createElement(
        StaticRouter,
        {
          location: req.url,
          context: context
        },
        React.createElement(App)
      )

      // es6 version, can't use yet
      // <StaticRouter location={req.url} context={context}>
      //   <App />
      // </StaticRouter>
    )

    if (context.url) {
      res.writeHead(301, {
        Location: context.url
      })
      res.end()
    } else {
      const sheet = new ServerStyleSheet()
      const html = renderToString(
        React.createElement(
          StyleSheetManager,
          {sheet: sheet.instance},
          React.createElement(App)
        )
        // es6 version, can't use yet
        // <StyleSheetManager sheet={sheet.instance}>
        //   <App />
        // </StyleSheetManager>
      )

      const css = sheet.getStyleTags() // or sheet.getStyleElement()

      res.write(
        `
            <!doctype html>
            <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="description" content="Isaac Pak">
            <meta name="author" content="">
            <title></title>
            <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
            <style>
            body {
              margin: 0;
                      background: #333;
                                  color: #aaa;
                                         font-family: Roboto, Arial, sans-serif;
            }
            </style>
            ${css}
            <link rel="shortcut" href="#" />
            </head>
            </head>
            <div id="app">${html}</div>
            `
      )
    }
    res.end()
  })
  .listen(config.port, function() {
    logger.log('listening on port ' + config.port)
  })
