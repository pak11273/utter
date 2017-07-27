import Home from './layouts/Home.js'
import About from './layouts/About.js'
import Contact from './layouts/Contact.js'
// import Login from './layouts/Login.js'
// import Settings from './layouts/Settings.js'
import Signup from './layouts/Signup.js'
// import Test1 from './layouts/Test1.js'
// import Test2 from './layouts/Test2.js'
// import NotFound from './components/Misc/NotFound.js'

export const routes = [
  {
    exact: true,
    path: '/',
    component: Home,
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
  // {
  //   path: '/Login',
  //   component: Login,
  //   loadData: () => getSomeData()
  // },
  // {
  //   path: '/Settings',
  //   component: Settings,
  //   loadData: () => getSomeData()
  // },
  {
    path: '/Signup',
    component: Signup,
    loadData: () => getSomeData()
  }
  // {
  //   path: '/test1',
  //   component: Test1,
  //   loadData: () => getSomeData()
  // },
  // {
  //   path: '/test2',
  //   component: Test2,
  //   loadData: () => getSomeData()
  // },
  // {
  //   component: NotFound,
  //   loadData: () => getSomeData()
  // }
]
