import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './components/LandingPage';
const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/landingpage',
    component: LandingPage
  }
];

export default routes;