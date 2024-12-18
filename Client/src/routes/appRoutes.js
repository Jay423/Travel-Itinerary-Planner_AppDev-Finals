import Home from '../pages/homepage/HomePage';
import Login from '../pages/login/loginUser';
import Register from '../pages/register/registerUser';
import Landing from '../pages/landingpage/LandingPage';
import Calendar from '../pages/calendarapp/calendar';
import Profile from '../pages/Profile/pfp';
import TripPlanner from '../pages/tripplanner/TripPlanner';
import NotFound from '../components/error';

const appRoutes = [
  { path: '/', component: Landing },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/landing', component: Landing },
  { path: '/calendar', component: Calendar },
  { path: '/pfp', component: Profile },
  { path: '/trip', component: TripPlanner },
  { path: '*', component: NotFound }, 
];

export default appRoutes;