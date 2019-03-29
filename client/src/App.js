import React from 'react';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import { Route, Switch, } from 'react-router-dom';
import { Container, } from 'semantic-ui-react';
import FetchUser from './components/FetchUser';
import ProtectedRoute from './components/ProtectedRoute';
// import EditUser from './components/EditUser';
import FindFriends from './components/FindFriends';

const App = () => (
  <>
    <Navbar />
    <FetchUser>
      <Container>
        <Switch>
          <ProtectedRoute exact path='/' component={Home}/>
          <ProtectedRoute exact path='/find' component={FindFriends}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/edituser' component={Register}/>
          <Route component={NoMatch}/>
        </Switch>
      </Container>
    </FetchUser>
  </>
)

export default App;