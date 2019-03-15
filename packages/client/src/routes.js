import Loading from "./components/loaders/layout-loader.js"
import Loadable from "react-loadable"

// Code Splitting: lazy loaded routes
/* const getAnnouncement = Loadable({ */
/*   loader: () => */
/*     import(/1* webpackChunkName: 'announcement' *1/ "./layouts/announcement"), */
/*   loading: Loading */
/* }) */

const getAbout = Loadable({
  loader: () => import(/* webpackChunkName: 'about' */ "./layouts/about"),
  loading: Loading
})

import {Home} from "./layouts"

export const routes = [
  {
    component: Home,
    exact: true,
    path: "/"
  },
  {
    component: getAbout,
    exact: true,
    path: "/about"
  }
]
