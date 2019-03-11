import Loadable from "react-loadable"

import {
  Home,
  /* GettingStarted, */
  /* Sponsorship, */
  /* NotFound, */
  noAuth,
  requireAuth,
  requireAdmin
  /* Korean1, */
  /* Korean2, */
  /* Korean3, */
  /* Korean4, */
  /* Korean5, */
  /* Korean6, */
  /* Korean7, */
  /* Korean8, */
  /* ResetPassword, */
  /* Spanish1, */
  /* Spanish2, */
  /* Spanish3, */
  /* French1, */
  /* French2, */
  /* Redux */
} from "./layouts"

import Loading from "./components/loaders/layout-loader.js"

// Code Splitting: lazy loaded routes
const getAnnouncement = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'announcement' */ "./layouts/announcement"),
  loading: Loading
})

const getAbout = Loadable({
  loader: () => import(/* webpackChunkName: 'about' */ "./layouts/about"),
  loading: Loading
})

const getAdmin = Loadable({
  loader: () => import("./layouts/admin"),
  loading: Loading
})

const getChangePassword = Loadable({
  loader: () => import("./layouts/change_password/change-password-ctrl.js"),
  loading: Loading
})

const getConfirmEmail = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'confirm-email' */ "./layouts/confirm-email"),
  loading: Loading
})

const getContact = Loadable({
  loader: () => import(/* webpackChunkName: 'contact' */ "./layouts/contact"),
  loading: Loading
})

const getCourses = Loadable({
  loader: () => import("./layouts/courses/containers/courses"),
  loading: Loading
})

const getCoursesCreated = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'courses-created' */ "./layouts/courses/containers/courses-created.js"),
  loading: Loading
})

const getCourseCtrl = Loadable({
  loader: () => import("./layouts/courses/containers/course-create.js"),
  loading: Loading
})

const getCourseUpdate = Loadable({
  loader: () => import("./layouts/courses/containers/course-update.js"),
  loading: Loading
})

const getCourseIntroduction = Loadable({
  loader: () => import("./layouts/courses/containers/course-introduction.js"),
  loading: Loading
})

const getCourseSettings = Loadable({
  loader: () => import("./layouts/courses/containers/course-settings.js"),
  loading: Loading
})

const getDashboard = Loadable({
  loader: () => import("./layouts/dashboard.js"),
  loading: Loading
})

const getExamples = Loadable({
  loader: () => import("./layouts/examples/containers/examples-update.js"),
  loading: Loading
})

const getFaq = Loadable({
  loader: () => import("./layouts/faq.js"),
  loading: Loading
})

const getGrammar = Loadable({
  loader: () => import("./layouts/grammar/containers/grammar-update.js"),
  loading: Loading
})

const getForgotPassword = Loadable({
  loader: () => import("./layouts/forgot_password/forgot-password-ctrl.js"),
  loading: Loading
})

const getLevels = Loadable({
  loader: () => import("./layouts/levels/containers/levels-update.js"),
  loading: Loading
})

const getNotFound = Loadable({
  loader: () => import("./components/misc/not-found.js"),
  loading: Loading
})

const getLoginCtrl = Loadable({
  loader: () => import("./layouts/login/login-ctrl.js"),
  loading: Loading
})

const getNotes = Loadable({
  loader: () => import("./layouts/notes/containers/notes-update.js"),
  loading: Loading
})

const getPhrases = Loadable({
  loader: () => import("./layouts/phrases/containers/phrases-update.js"),
  loading: Loading
})

const getPricing = Loadable({
  loader: () => import("./layouts/pricing"),
  loading: Loading
})

const getProfile = Loadable({
  loader: () => import("./layouts/profile"),
  loading: Loading
})

const getProfileSettings = Loadable({
  loader: () => import("./layouts/profile/profile-settings.js"),
  loading: Loading
})

const getPrivacyPolicy = Loadable({
  loader: () => import("./layouts/privacy-policy.js"),
  loading: Loading
})

const getSettings = Loadable({
  loader: () => import("./layouts/settings"),
  loading: Loading
})

const getSignupCtrl = Loadable({
  loader: () => import("./layouts/signup/signup-ctrl.js"),
  loading: Loading
})

const getTermsOfUse = Loadable({
  loader: () => import("./layouts/terms-of-use.js"),
  loading: Loading
})

const getTest = Loadable({
  loader: () => import("./layouts/test"),
  loading: Loading
})

const getVocabulary = Loadable({
  loader: () => import("./layouts/vocabulary/containers/vocabulary-update.js"),
  loading: Loading
})

const getZoneCtrl = Loadable({
  loader: () => import("./layouts/zones/containers/zone-controller.js"),
  loading: Loading
})

const getShoppingCart = Loadable({
  loader: () => import("./layouts/shopping_cart/components/index.js"),
  loading: Loading
})

const getZones = Loadable({
  loader: () => import("./layouts/zones/containers/zones.js"),
  loading: Loading
})

const getZone = Loadable({
  loader: () => import("./layouts/zones/containers/zone.js"),
  loading: Loading
})

/* import language from "./data/language.json" */

export const routes = [
  {
    component: getAbout,
    exact: true,
    path: "/about"
  },
  {
    component: getAnnouncement,
    path: "/a"
  },
  {
    component: Home,
    exact: true,
    path: "/"
  },
  {
    component: Home,
    exact: true,
    path: "/home"
  },
  {
    path: "/admin",
    component: requireAdmin(getAdmin)
  },
  {
    exact: true,
    path: "/change-password/:token",
    component: getChangePassword
  },
  {
    exact: true,
    path: "/confirm-email/:token",
    component: getConfirmEmail
  },
  {
    exact: true,
    path: "/faq",
    component: getFaq
  },
  {
    exact: true,
    path: "/forgot-password",
    component: getForgotPassword
  },
  {
    component: requireAuth(getDashboard),
    exact: true,
    path: "/dashboard"
  },
  // {
  //   path: '/getting-started',
  //   component: requireAuth(GettingStarted),
  //   loadData: () => getSomeData()
  // },
  {
    path: "/contact",
    component: getContact
  },
  {
    component: getCourses,
    exact: true,
    path: "/courses"
  },
  {
    component: requireAuth(getCourseCtrl),
    exact: true,
    path: "/courses/create"
  },
  {
    component: requireAuth(getCoursesCreated),
    exact: true,
    path: "/courses/created"
  },
  {
    component: noAuth(getLoginCtrl),
    exact: true,
    path: "/login"
  },
  {
    component: requireAuth(getCourseUpdate),
    exact: true,
    path: "/course/:id",
    routes: [
      {
        path: "/course/course-introduction",
        component: getCourseIntroduction
      },
      {
        path: "/course/course-settings",
        component: getCourseSettings
      },
      {
        path: "/course/course-examples",
        component: getExamples
      },
      {
        path: "/course/course-levels",
        component: getLevels
      },
      {
        path: "/course/course-grammar",
        component: getGrammar
      },
      {
        path: "/course/course-notes",
        component: getNotes
      },
      {
        path: "/course/course-phrases",
        component: getPhrases
      },
      {
        path: "/course/course-vocabulary",
        component: getVocabulary
      }
    ]
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
    component: getPricing,
    exact: true,
    path: "/pricing"
  },
  {
    component: getPrivacyPolicy,
    exact: true,
    path: "/privacy-policy"
  },
  // {
  //   path: '/redux',
  //   component: Redux,
  //   loadData: () => getSomeData()
  // },
  // {
  //   path: '/reset-password',
  //   component: ResetPassword,
  //   loadData: () => getSomeData()
  // },
  {
    path: "/Settings",
    component: requireAuth(getSettings)
  },
  {
    path: "/shoppingcart",
    component: requireAuth(getShoppingCart)
  },
  {
    path: "/signup",
    component: getSignupCtrl
  },
  // {
  //   path: '/Sponsorship',
  //   component: Sponsorship,
  //   loadData: () => getSomeData()
  // },
  {
    exact: true,
    path: "/zones",
    component: noAuth(getZones)
  },
  {
    component: requireAuth(getZone),
    exact: true,
    path: "/zone/:id"
  },
  {
    component: requireAuth(getZoneCtrl),
    exact: true,
    path: "/zones/create"
  },
  // {
  //   path: '/korean/1',
  //   component: Korean1,
  //   loadData: () => getSomeData()
  // },
  // {
  //   path: '/korean/2',
  //   component: Korean2,
  //   loadData: () => getSomeData()
  // },
  // {
  //   path: '/korean/3',
  //   component: Korean3,
  //   loadData: () => getSomeData()
  // },
  // {
  //   path: '/korean/4',
  //   component: Korean4,
  //   loadData: () => getSomeData()
  // },
  // {
  //   path: '/korean/5',
  //   component: Korean5,
  //   loadData: () => getSomeData()
  // },
  // {
  //   path: '/korean/6',
  //   component: Korean6,
  //   loadData: () => getSomeData()
  // },
  // {
  //   path: '/korean/7',
  //   component: Korean7,
  //   loadData: () => getSomeData()
  // },
  // {
  //   path: '/korean/8',
  //   component: Korean8,
  //   loadData: () => getSomeData()
  // },
  // {
  //   path: '/spanish/1',
  //   component: Spanish1,
  //   loadData: () => getSomeData()
  // },
  // {
  //   path: '/spanish/3',
  //   component: Spanish3,
  //   loadData: () => getSomeData()
  // },
  // {
  //   path: '/spanish/2',
  //   component: Spanish2,
  //   loadData: () => getSomeData()
  // },
  // {
  //   path: '/french/1',
  //   component: French1,
  //   loadData: () => getSomeData()
  // },
  // {
  //   path: '/french/2',
  //   component: French2,
  //   loadData: () => getSomeData()
  // },
  {
    exact: true,
    path: "/test",
    component: getTest
  },
  {
    exact: true,
    path: "/terms-of-use",
    component: getTermsOfUse
  },
  {
    component: getNotFound
  }
]
