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

const getContact = Loadable({
  loader: () => import(/* webpackChunkName: 'contact' */ "./layouts/contact"),
  loading: Loading
})

const getPricing = Loadable({
  loader: () => import(/* webpackChunkName: 'pricing' */ "./layouts/pricing"),
  loading: Loading
})

const getSignup = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'signup' */ "./layouts/signup/signup-ctrl.js"),
  loading: Loading
})

import {Home} from "./layouts"

export const routes = [
  {
    component: getAbout,
    exact: true,
    path: "/about"
  },
  {
    component: getContact,
    exact: true,
    path: "/contact"
  },
  {
    component: getPricing,
    exact: true,
    path: "/pricing"
  },
  {
    component: getSignup,
    exact: true,
    path: "/signup"
  },
  {
    component: Home,
    exact: true,
    path: "/"
  }
]
