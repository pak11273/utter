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
  loading: Loading,
  delay: 200
})

const getContact = Loadable({
  loader: () => import(/* webpackChunkName: 'contact' */ "./layouts/contact"),
  loading: Loading,
  delay: 200
})

const getHome = Loadable({
  loader: () => import(/* webpackChunkName: 'contact' */ "./layouts/home"),
  loading: Loading,
  delay: 200
})

const getLogin = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'contact' */ "./layouts/login/login-ctrl.js"),
  loading: Loading,
  delay: 200
})

const getPricing = Loadable({
  loader: () => import(/* webpackChunkName: 'pricing' */ "./layouts/pricing"),
  loading: Loading,
  delay: 200
})

const getSignup = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'signup' */ "./layouts/signup/signup-ctrl.js"),
  loading: Loading,
  delay: 200
})

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
    component: getHome,
    exact: true,
    path: "/"
  },
  {
    component: getLogin,
    exact: true,
    path: "/login"
  }
]
