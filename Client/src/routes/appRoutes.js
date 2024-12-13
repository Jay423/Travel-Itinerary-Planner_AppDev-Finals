// src/routes/appRoutes.js
import Home from '../pages/homepage/homePage';
import Login from '../pages/login/loginUser';
import Register from '../pages/register/registerUser';
import Plan from '../pages/plan/planPage';
import Landing from '../pages/landingpage/LandingPage';

const appRoutes = [
  { path: '/', component: Landing },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/plan', component: Plan },
  { path: '/home', component: Home },
  { path: '/landing', component: Landing },
];

export default appRoutes;
