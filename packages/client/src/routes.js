/* import {Home} from "./layouts" */
import React from "react"

/* import Loading from "./components/loaders/layout-loader.js" */

// Code Splitting: lazy loaded routes
/* const getAnnouncement = Loadable({ */
/*   loader: () => */
/*     import(/1* webpackChunkName: 'announcement' *1/ "./layouts/announcement"), */
/*   loading: Loading */
/* }) */

const hello = () => <div>hello</div>

export const routes = [
  {
    exact: true,
    path: "/",
    component: hello
  }
]
