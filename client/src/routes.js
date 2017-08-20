import Home from './layouts/Home.js'
import About from './layouts/About.js'
import Contact from './layouts/Contact.js'
import Login from './layouts/Login.js'
import Zones from './layouts/Zones.js'
import NewEvent from './layouts/NewEvent.js'
import Settings from './layouts/Settings.js'
import Signup from './layouts/Signup.js'
import Languages from './layouts/Languages.js'
import NotFound from './components/Misc/NotFound.js'
import requireAuth from './utils/requireAuth.js'
import Korean from './layouts/Korean.js'
import Dashboard from './layouts/Dashboard.js'
import Korean1 from './layouts/Korean/Level1.js'

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
    component: Languages,
    loadData: () => getSomeData()
  },
  {
    path: '/new-event',
    component: requireAuth(NewEvent),
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
    path: '/Zones',
    component: requireAuth(Zones),
    loadData: () => getSomeData()
  },
  {
    exact: true,
    path: '/Korean',
    component: Korean,
    loadData: () => getSomeData()
  },
  {
    path: '/korean/1',
    component: Korean1,
    loadData: () => getSomeData()
  },
  {
    component: NotFound,
    loadData: () => getSomeData()
  }
]
