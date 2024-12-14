// src/routes/appRoutes.js
import Home from '../pages/homepage/homePage';
import Login from '../pages/login/loginUser';
import Register from '../pages/register/registerUser';
import Landing from '../pages/landingpage/LandingPage';
import Calendar from '../pages/calendarapp/calendar';

const appRoutes = [
  { path: '/', component: Landing },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/landing', component: Landing },
  { path: '/calendar', component: Calendar },
];

export default appRoutes;

