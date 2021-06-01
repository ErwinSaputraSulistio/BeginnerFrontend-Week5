import './App.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ResetPassword from './pages/auth/ResetPassword'
import Verification from './pages/auth/Verification'
import ProfilePage from './pages/auth/ProfilePage'
import HomePage from './pages/main/HomePage'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import NowShowing from './pages/main/MovieDetails/NowShowing'
import UpcomingMovies from './pages/main/MovieDetails/UpcomingMovies'
import OrderPage from './pages/main/OrderPage'
import PaymentPage from './pages/main/PaymentPage'
import TicketResult from './pages/main/TicketResult'
import AddOrUpdateMovies from './pages/admin/addOrUpdateMovies'
import store from './configs/redux/Store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/reset-password/:id" component={ResetPassword}/>
          <Route path="/verification/:id" component={Verification}/>
          <Route path="/profile-page" component={ProfilePage}/>
          <Route path="/home-page" component={HomePage}/>
          <Route path="/now-showing/search" component={NowShowing}/>
          <Route path="/now-showing/:id" component={NowShowing}/>
          <Route path="/upcoming-movies/:id" component={UpcomingMovies}/>
          <Route path="/order-page/:id" component={OrderPage}/>
          <Route path="/payment-page/:id" component={PaymentPage}/>
          <Route path="/ticket-result/:id" component={TicketResult}/>
          <Route path="/admin/add-or-update-movies" component={AddOrUpdateMovies}/>
          <Route component={HomePage}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
