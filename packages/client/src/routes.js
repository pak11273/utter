import Loading from "./components/loaders/layout-loader.js"
import Loadable from "react-loadable"
import requireAdmin from "./utils/requireAdmin.js"
import requireAuth from "./utils/requireAuth.js"
/* import requireBeta from "./utils/requireBeta.js" */
/* import noAuth from "./utils/noAuth.js" */

const getAbout = Loadable({
  loader: () => import(/* webpackChunkName: 'about' */ "./layouts/about"),
  loading: Loading,
  delay: 200
})

const getAccount = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'account' */ "./layouts/account/index.js"),
  loading: Loading,
  delay: 200
})

const getAccountBilling = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'account-billing' */ "./layouts/account/account-billing.js"),
  loading: Loading
})

const getAccountSettings = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'account-settings' */ "./layouts/account/account-settings.js"),
  loading: Loading
})

const getAccountThanks = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'account-thanks' */ "./layouts/account/account-thanks.js"),
  loading: Loading
})

const getAdminCarousel = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'admin-carousel' */ "./layouts/admin/containers/admin-carousel.js"),
  loading: Loading
})

const getAdminSettings = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'admin-settings' */ "./layouts/admin/containers/admin-settings.js"),
  loading: Loading
})

const getAdminSocketio = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'admin-socketio' */ "./layouts/admin/containers/admin-socketio.js"),
  loading: Loading
})

const getAdminBetaTesters = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'admin-beta-testers' */ "./layouts/admin/containers/admin-beta-testers.js"),
  loading: Loading
})

const getAdminUpdate = Loadable({
  loader: () => import(/* webpackChunkName: 'admin' */ "./layouts/admin"),
  loading: Loading
})

const getAdminUsers = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'admin-users' */ "./layouts/admin/containers/admin-users.js"),
  loading: Loading
})

const getAnnouncement = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'announcement' */ "./layouts/announcement"),
  loading: Loading
})

const getApplication = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'application' */ "./layouts/application"),
  loading: Loading,
  delay: 200
})

/* const getBeta = Loadable({ */
/*   loader: () => import(/1* webpackChunkName: 'beta' *1/ "./layouts/beta-access"), */
/*   loading: Loading, */
/*   delay: 200 */
/* }) */

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

const getFeatures = Loadable({
  loader: () => import(/* webpackChunkName: 'features' */ "./layouts/features"),
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
  loader: () => import(/* webpackChunkName: 'home' */ "./layouts/home"),
  loading: Loading,
  delay: 200
})

const getLogin = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'login-ctrl' */ "./layouts/login/login-ctrl.js"),
  loading: Loading,
  delay: 200
})

const getRenewConfirmEmail = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'renew' */ "./layouts/renew-confirmation.js"),
  loading: Loading
})

const getRezone = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'rezone' */ "./layouts/zones/components/rezone.js"),
  loading: Loading,
  delay: 200
})

const getPricing = Loadable({
  loader: () => import(/* webpackChunkName: 'pricing' */ "./layouts/pricing"),
  loading: Loading,
  delay: 200
})

const getPrivateZone = Loadable({
  loader: () => import("./layouts/zones/components/private-zone.js"),
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

const getWebdesign = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'webdesign' */ "./layouts/webdesign.js"),
  loading: Loading,
  delay: 200
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
    component: requireAuth(getAccount),
    exact: true,
    path: "/account/:username",
    routes: [
      {
        exact: true,
        path: "/account/account-billing",
        component: getAccountBilling
      },
      {
        exact: true,
        path: "/account/account-settings",
        component: getAccountSettings
      },
      {
        exact: true,
        path: "/account/account-thanks",
        component: getAccountThanks
      }
    ]
  },
  {
    exact: true,
    path: "/application",
    component: getApplication
  },
  {
    component: requireAdmin(getAdminUpdate),
    exact: true,
    path: "/admin/*",
    routes: [
      {
        component: getAdminSettings,
        exact: true,
        path: "/admin/admin-settings"
      },
      {
        component: getAdminSocketio,
        exact: true,
        path: "/admin/admin-socketio"
      },
      {
        component: getAdminUsers,
        exact: true,
        path: "/admin/admin-users"
      },
      {
        component: getAdminBetaTesters,
        exact: true,
        path: "/admin/admin-beta-testers"
      },
      {
        component: getAdminCarousel,
        exact: true,
        path: "/admin/admin-carousel"
      }
    ]
  },
  {
    component: getAnnouncement,
    path: "/a"
  },
  /* { */
  /*   exact: true, */
  /*   path: "/beta-access", */
  /*   component: getBeta */
  /* }, */
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
    exact: true,
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
        component: requireAuth(getLevels),
        exact: true,
        path: "/course/course-levels"
      },
      {
        component: requireAuth(getVocabulary),
        exact: true,
        path: "/course/course-vocabulary"
      }
    ]
  },
  {
    component: requireAuth(getCourses),
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
    component: requireAuth(getPrivateZone),
    exact: true,
    path: "/zones/private"
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
    // TODO: remove when launching with stripe
    /* component: noAuth(getSignup), */
    component: getSignup,
    exact: true,
    path: "/signup"
  },
  {
    exact: true,
    path: "/features",
    component: getFeatures
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
    exact: true,
    path: "/renew-confirmation",
    component: getRenewConfirmEmail
  },
  {
    component: requireAuth(getRezone),
    exact: true,
    path: "/zones/rezone"
  },
  {
    component: getWebdesign,
    exact: true,
    path: "/webdesign"
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
    component: requireAuth(getZones),
    exact: true,
    path: "/zones"
  }
  /* { */
  /*   path: "/reset-password", */
  /*   component: getResetPassword */
  /* } */
]
