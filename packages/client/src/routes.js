import Loading from "./components/loaders/layout-loader.js"
import Loadable from "react-loadable"
import requireAuth from "./utils/requireAuth.js"
import noAuth from "./utils/noAuth.js"

const getAbout = Loadable({
  loader: () => import(/* webpackChunkName: 'about' */ "./layouts/about"),
  loading: Loading,
  delay: 200
})

const getAccount = Loadable({
  loader: () => import(/* webpackChunkName: 'account' */ "./layouts/account"),
  loading: Loading,
  delay: 200
})

const getAnnouncement = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'announcement' */ "./layouts/announcement"),
  loading: Loading
})

const getChangePassword = Loadable({
  loader: () => import("./layouts/change_password/change-password-ctrl.js"),
  loading: Loading
})

const getCommunity = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'community' */ "./layouts/community"),
  loading: Loading,
  delay: 200
})

const getConfirmEmail = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'confirm-email' */ "./layouts/confirm-email"),
  loading: Loading
})

const getContact = Loadable({
  loader: () => import(/* webpackChunkName: 'contact' */ "./layouts/contact"),
  loading: Loading,
  delay: 200
})

const getCourses = Loadable({
  loader: () => import("./layouts/courses/containers/courses"),
  loading: Loading,
  delay: 200
})

const getCourseSettings = Loadable({
  loader: () => import("./layouts/courses/containers/course-settings.js"),
  loading: Loading
})

const getCourseCtrl = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'course' */ "./layouts/courses/containers/course-create.js"),
  loading: Loading,
  delay: 200
})

const getCourseIntroduction = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'course-introduction' */ "./layouts/courses/containers/course-introduction.js"),
  loading: Loading,
  delay: 200
})

const getCoursesCreated = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'courses-created' */ "./layouts/courses/containers/courses-created.js"),
  loading: Loading
})

const getCourseUpdate = Loadable({
  loader: () => import("./layouts/courses/containers/course-update.js"),
  loading: Loading,
  delay: 200
})

const getForgotPassword = Loadable({
  loader: () => import("./layouts/forgot_password/forgot-password-ctrl.js"),
  loading: Loading,
  delay: 200
})

const getLevels = Loadable({
  loader: () => import("./layouts/levels/containers/levels-update.js"),
  loading: Loading
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

const getProfile = Loadable({
  loader: () => import("./layouts/profile"),
  loading: Loading
})

const getProfileSettings = Loadable({
  loader: () => import("./layouts/profile/profile-settings.js"),
  loading: Loading
})

const getSignup = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'signup' */ "./layouts/signup/signup-ctrl.js"),
  loading: Loading,
  delay: 200
})

const getVocabulary = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'vocabulary' */ "./layouts/vocabulary/containers/vocabulary-update.js"),
  loading: Loading
})

const getZoneCtrl = Loadable({
  loader: () => import("./layouts/zones/containers/zone-controller.js"),
  loading: Loading
})

const getZone = Loadable({
  loader: () => import("./layouts/zones/containers/zone.js"),
  loading: Loading
})

const getZones = Loadable({
  loader: () => import("./layouts/zones/containers/zones.js"),
  loading: Loading
})

/* const getResetPassword = Loadable({ */
/*   loader: () => */
/*     import(/1* webpackChunkName: 'reset-password' *1/ "./layouts/reset-password.js"), */
/*   loading: Loading, */
/*   delay: 200 */
/* }) */

export const routes = [
  {
    component: getAbout,
    exact: true,
    path: "/about"
  },
  {
    component: getAccount,
    exact: true,
    path: "/account/:username"
  },
  {
    component: getAnnouncement,
    path: "/a"
  },
  {
    exact: true,
    path: "/change-password/:token",
    component: getChangePassword
  },
  {
    exact: true,
    path: "/community",
    component: getCommunity
  },
  {
    /* exact: true, */
    path: "/confirm-email/:token",
    component: getConfirmEmail
  },
  {
    component: getContact,
    exact: true,
    path: "/contact"
  },
  {
    component: requireAuth(getCourseUpdate),
    exact: true,
    path: "/course/:id",
    routes: [
      {
        component: requireAuth(getCourseSettings),
        exact: true,
        path: "/course/course-settings"
      },
      {
        component: requireAuth(getCourseIntroduction),
        exact: true,
        path: "/course/course-introduction"
      },
      {
        component: getLevels,
        exact: true,
        path: "/course/course-levels"
      },
      {
        component: getVocabulary,
        exact: true,
        path: "/course/course-vocabulary"
      }
    ]
  },
  {
    component: getCourses,
    exact: true,
    path: "/courses"
  },
  {
    component: requireAuth(getCoursesCreated),
    exact: true,
    path: "/courses/created"
  },
  {
    component: requireAuth(getCourseCtrl),
    exact: true,
    path: "/courses/create"
  },
  {
    component: getCourseSettings,
    path: "/course/course-settings"
  },
  {
    component: getPricing,
    exact: true,
    path: "/pricing"
  },
  {
    component: getProfile,
    exact: true,
    path: "/profile/:username",
    routes: [
      {
        path: "/profile/profile-settings",
        component: getProfileSettings
      }
    ]
  },
  {
    component: noAuth(getSignup),
    exact: true,
    path: "/signup"
  },
  {
    exact: true,
    path: "/forgot-password",
    component: getForgotPassword
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
  },
  {
    component: requireAuth(getZoneCtrl),
    exact: true,
    path: "/zones/create"
  },
  {
    component: requireAuth(getZone),
    exact: true,
    path: "/zone/:id"
  },
  {
    exact: true,
    path: "/zones",
    component: getZones
  }
  /* { */
  /*   path: "/reset-password", */
  /*   component: getResetPassword */
  /* } */
]
