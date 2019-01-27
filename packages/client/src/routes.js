import React from "react"
import Loadable from "react-loadable"

import {
  Announcement,
  Home,
  ChangePassword,
  ForgotPassword,
  /* GettingStarted, */
  Test,
  Settings,
  ShoppingCart,
  /* Sponsorship, */
  CourseEdit,
  CourseIntroduction,
  CourseSettings,
  /* CourseDetails, */
  /* MyCourses, */
  CourseCtrl,
  CoursesCreated,
  Levels,
  /* NotFound, */
  noAuth,
  requireAuth,
  requireAdmin,
  Dashboard,
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
  SocketIOCtrl,
  ZoneCtrl
} from "./layouts"

const Loading = () => <h1>Loading...</h1>

// Code Splitting: lazy loaded routes
const getAbout = Loadable({
  loader: () => import("./layouts/about"),
  loading: Loading
})

const getAdmin = Loadable({
  loader: () => import("./layouts/admin"),
  loading: Loading
})

const getContact = Loadable({
  loader: () => import("./layouts/contact"),
  loading: Loading
})

const getCourses = Loadable({
  loader: () => import("./layouts/courses"),
  loading: Loading
})

const getLoginCtrl = Loadable({
  loader: () => import("./layouts/login/login-ctrl.js"),
  loading: Loading
})

const getPricing = Loadable({
  loader: () => import("./layouts/pricing"),
  loading: Loading
})

const getSignupCtrl = Loadable({
  loader: () => import("./layouts/signup/signup-ctrl.js"),
  loading: Loading
})

const getZones = Loadable({
  loader: () => import("./layouts/zones"),
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
    component: Announcement,
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
    component: ChangePassword
  },
  {
    exact: true,
    path: "/forgot-password",
    component: ForgotPassword
  },
  {
    component: requireAuth(Dashboard),
    exact: true,
    path: "/Dashboard"
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
  // {
  //   path: '/CourseDetails/:name',
  //   component: props => {
  //     const one = language.languages.filter(
  //       language => props.match.params.name === language.name
  //     )
  //     return (
  //       <CourseDetails
  //         languages={language.languages}
  //         language={one[0]}
  //         {...props}
  //       />
  //     )
  //   },
  //   loadData: () => getSomeData()
  // },
  {
    component: getCourses,
    exact: true,
    path: "/courses"
  },
  {
    component: requireAuth(CourseCtrl),
    exact: true,
    path: "/courses/create"
  },
  {
    component: requireAuth(CoursesCreated),
    exact: true,
    path: "/courses/created"
  },
  {
    component: noAuth(getLoginCtrl),
    exact: true,
    path: "/login"
  },
  {
    component: requireAuth(CourseEdit),
    exact: true,
    path: "/course/:id",
    routes: [
      {
        path: "/course/course-introduction",
        component: CourseIntroduction
      },
      {
        path: "/course/course-settings",
        component: CourseSettings
      },
      {
        path: "/course/levels",
        component: Levels
      }
    ]
  },
  {
    component: getPricing,
    exact: true,
    path: "/pricing"
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
    component: requireAuth(Settings)
  },
  {
    path: "/shoppingcart",
    component: requireAuth(ShoppingCart)
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
    component: requireAuth(getZones)
  },
  {
    component: requireAuth(SocketIOCtrl),
    exact: true,
    path: "/zone/:id",
    routes: [
      {
        exact: true,
        path: "/course/test",
        component: requireAuth(Test)
      },
      {
        exact: true,
        path: "/course/course-introduction",
        component: requireAuth(CourseIntroduction)
      },
      {
        exact: true,
        path: "/course/course-settings",
        component: requireAuth(CourseSettings)
      },
      {
        exact: true,
        path: "/course/levels",
        component: requireAuth(Levels)
      }
    ]
  },
  {
    component: requireAuth(ZoneCtrl),
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
    // exact: true,
    path: "/test",
    component: Test
  }
  // {
  //   component: NotFound,
  //   loadData: () => getSomeData()
  // }
]
