import './App.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ResetPassword from './pages/auth/ResetPassword'
import ProfilePage from './pages/auth/ProfilePage'
import HomePage from './pages/main/HomePage'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NowShowing from './pages/main/NowShowing'
import UpcomingMovies from './pages/main/UpcomingMovies'
import AddOrUpdateMovies from './pages/admin/addOrUpdateMovies'
import NotFound from './pages/NotFound'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/reset-password" component={ResetPassword}/>
        <Route path="/profile-page" component={ProfilePage}/>
        <Route path="/home-page" component={HomePage}/>
        <Route path="/now-showing/all" component={NowShowing}/>
        <Route path="/now-showing/:id" component={NowShowing}/>
        <Route path="/upcoming-movies/:id" component={UpcomingMovies}/>
        <Route path="/admin/add-or-update-movies" component={AddOrUpdateMovies}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
