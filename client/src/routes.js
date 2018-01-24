import {
  Admin,
  Home,
  About,
  Connections,
  Contact,
  ForgotPassword,
  GettingStarted,
  Login,
  Settings,
  Signup,
  Sponsorship,
  Courses,
  CourseDetails,
  NotFound,
  requireAuth,
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

//data
import React from 'react'
import language from './data/language.json'

export const routes = [
  {
    exact: true,
    path: '/',
    component: Home,
    loadData: () => getSomeData()
  },
  {
    path: '/Admin',
    component: requireAuth(Admin),
    loadData: () => getSomeData()
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    loadData: () => getSomeData()
  },
  {
    path: '/Dashboard',
    component: requireAuth(Dashboard),
    loadData: () => getSomeData()
  },
  {
    path: '/Home',
    component: Home,
    loadData: () => getSomeData()
  },
  {
    path: '/About',
    component: About,
    loadData: () => getSomeData()
  },
  {
    path: '/getting-started',
    component: requireAuth(GettingStarted),
    loadData: () => getSomeData()
  },
  {
    path: '/Contact',
    component: Contact,
    loadData: () => getSomeData()
  },
  {
    path: '/Login',
    component: Login,
    loadData: () => getSomeData()
  },
  {
    path: '/courses',
    component: props => <Courses languages={language.languages} {...props} />,
    loadData: () => getSomeData()
  },
  {
    path: '/CourseDetails/:name',
    component: props => {
      const one = language.languages.filter(
        language => props.match.params.name === language.name
      )
      return (
        <CourseDetails
          languages={language.languages}
          language={one[0]}
          {...props}
        />
      )
    },
    loadData: () => getSomeData()
  },
  {
    path: '/pricing',
    component: Pricing,
    loadData: () => getSomeData()
  },
  {
    path: '/redux',
    component: Redux,
    loadData: () => getSomeData()
  },
  {
    path: '/reset-password',
    component: ResetPassword,
    loadData: () => getSomeData()
  },
  {
    path: '/Settings',
    component: requireAuth(Settings),
    loadData: () => getSomeData()
  },
  {
    path: '/Signup',
    component: Signup,
    loadData: () => getSomeData()
  },
  {
    path: '/Sponsorship',
    component: Sponsorship,
    loadData: () => getSomeData()
  },
  {
    path: '/Connections',
    component: requireAuth(Connections),
    loadData: () => getSomeData()
  },
  {
    path: '/korean/1',
    component: Korean1,
    loadData: () => getSomeData()
  },
  {
    path: '/korean/2',
    component: Korean2,
    loadData: () => getSomeData()
  },
  {
    path: '/korean/3',
    component: Korean3,
    loadData: () => getSomeData()
  },
  {
    path: '/korean/4',
    component: Korean4,
    loadData: () => getSomeData()
  },
  {
    path: '/korean/5',
    component: Korean5,
    loadData: () => getSomeData()
  },
  {
    path: '/korean/6',
    component: Korean6,
    loadData: () => getSomeData()
  },
  {
    path: '/korean/7',
    component: Korean7,
    loadData: () => getSomeData()
  },
  {
    path: '/korean/8',
    component: Korean8,
    loadData: () => getSomeData()
  },
  {
    path: '/spanish/1',
    component: Spanish1,
    loadData: () => getSomeData()
  },
  {
    path: '/spanish/3',
    component: Spanish3,
    loadData: () => getSomeData()
  },
  {
    path: '/spanish/2',
    component: Spanish2,
    loadData: () => getSomeData()
  },
  {
    path: '/french/1',
    component: French1,
    loadData: () => getSomeData()
  },
  {
    path: '/french/2',
    component: French2,
    loadData: () => getSomeData()
  },
  {
    component: NotFound,
    loadData: () => getSomeData()
  }
]
