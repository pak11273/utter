import {
  Home,
  About,
  Connections,
  Contact,
  GettingStarted,
  Login,
  NewEvent,
  Settings,
  Signup,
  Languages,
  LanguageDetails,
  NotFound,
  requireAuth,
  Dashboard,
  Korean1,
  Korean2,
  Korean3,
  Korean4,
  Korean5,
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
    path: '/languages',
    component: props => <Languages languages={language.languages} {...props} />,
    loadData: () => getSomeData()
  },
  {
    path: '/languageDetails/:name',
    component: props => {
      const one = language.languages.filter(
        language => props.match.params.name === language.name
      )
      return (
        <LanguageDetails
          languages={language.languages}
          language={one[0]}
          {...props}
        />
      )
    },
    loadData: () => getSomeData()
  },
  {
    path: '/new-event',
    component: requireAuth(NewEvent),
    loadData: () => getSomeData()
  },
  {
    path: '/redux',
    component: Redux,
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
    component: Korean4,
    loadData: () => getSomeData()
  },
  {
    component: NotFound,
    loadData: () => getSomeData()
  }
]
