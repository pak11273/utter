import {
  Admin,
  Home,
  About,
  Connections,
  Contact,
  ForgotPassword,
  GettingStarted,
  Test,
  Login,
  Settings,
  ShoppingCart,
  Signup,
  Sponsorship,
  Courses,
  Course,
  CourseEdit,
  CourseDetails,
  MyCourses,
  CoursesCreate,
  CoursesCreated,
  NotFound,
  requireAuth,
  requireAdmin,
  Dashboard,
  Korean1,
  Korean2,
  Korean3,
  Korean4,
  Korean5,
  Korean6,
  Korean7,
  Korean8,
  Pricing,
  ResetPassword,
  Spanish1,
  Spanish2,
  Spanish3,
  French1,
  French2,
  Redux
} from './layouts'

import language from './data/language.json'

export const routes = [
  {
    component: About,
    exact: true,
    path: '/About'
  },
  {
    component: Home,
    exact: true,
    path: '/'
  },
  {
    component: Home,
    exact: true,
    path: '/home'
  },
  {
    path: '/admin',
    component: requireAdmin(Admin),
    loadData: () => getSomeData()
  },
  // {
  //   exact: true,
  //   path: '/forgot-password',
  //   component: ForgotPassword,
  //   loadData: () => getSomeData()
  // },
  {
    component: requireAuth(Dashboard),
    exact: true,
    path: '/Dashboard'
  },
  // {
  //   path: '/getting-started',
  //   component: requireAuth(GettingStarted),
  //   loadData: () => getSomeData()
  // },
  {
    path: '/contact',
    component: Contact
  },
  // {
  //   path: '/course',
  //   component: Course,
  //   loadData: () => getSomeData()
  // },
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
    component: Courses,
    exact: true,
    path: '/courses'
  },
  {
    component: requireAuth(CoursesCreated),
    exact: true,
    path: '/courses/:id'
  },
  {
    component: Login,
    exact: true,
    path: '/login'
  },
  // {
  //   component: MyCourses,
  //   exact: true,
  //   path: '/my-courses',
  //   routes: [
  //     {
  //       component: requireAuth(CoursesCreated),
  //       exact: true,
  //       path: '/my-courses'
  //     },
  //     {
  //       component: requireAuth(CoursesCreate),
  //       exact: true,
  //       path: '/my-courses/create'
  //     },
  //     {
  //       component: requireAuth(CoursesCreated),
  //       exact: true,
  //       path: '/my-courses/created'
  //     }
  //   ]
  // },
  {
    component: requireAuth(CourseEdit),
    exact: true,
    path: '/my-courses/:id/:name/edit'
  },
  {
    component: Pricing,
    exact: true,
    path: '/pricing'
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
    path: '/Settings',
    component: requireAuth(Settings),
    loadData: () => getSomeData()
  },
  {
    path: '/shoppingcart',
    component: requireAuth(ShoppingCart),
    loadData: () => getSomeData()
  },
  {
    path: '/signup',
    component: Signup,
    loadData: () => getSomeData()
  },
  // {
  //   path: '/Sponsorship',
  //   component: Sponsorship,
  //   loadData: () => getSomeData()
  // },
  {
    exact: true,
    path: '/Connections',
    component: requireAuth(Connections)
  }
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
  // {
  //   // exact: true,
  //   path: '/test',
  //   component: Test,
  //   loadData: () => getSomeData()
  // },
  // {
  //   component: NotFound,
  //   loadData: () => getSomeData()
  // }
]
