// src/routes/appRoutes.js
import Home from '../pages/homepage/homePage';
import Login from '../pages/login/loginUser';
import Register from '../pages/register/registerUser';
import Plan from '../pages/plan/planPage';
import Landing from '../pages/landingpage/LandingPage';
import Calendar from '../pages/calendarapp/calendar';
import Profile from '../pages/Profile/pfp';
// import TripPlanner from '../pages/tripplanner/TripPlanner';



const appRoutes = [
  { path: '/', component: Landing },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/plan', component: Plan },
  { path: '/home', component: Home },
  { path: '/landing', component: Landing },
  { path: '/calendar', component: Calendar },
  { path: '/pfp', component: Profile },
  // { path: '/trip', component: TripPlanner },
];

export default appRoutes;
