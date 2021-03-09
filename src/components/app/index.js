import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import '../../App.css';
import Header from '../header'
import Landing from '../landing'
import Footer from '../footer'
import Welcome from '../welcome'
import Login from '../login'
import SignUp from '../singup'
import ErrorPage from '../errorPage'
import ForgetPassword from '../forgetPassword'
import {IconContext} from 'react-icons'


function App() {
  return (
    <Router>
      <IconContext.Provider value={{style:{verticalAlign:'middle'} }}>
        <Header/>

        <Switch>

          <Route exact path="/" component={Landing}/>
          <Route path="/welcome" component={Welcome}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/forgetPassword" component={ForgetPassword}/>
          <Route component={ErrorPage}/>

        </Switch>

        <Footer/>
      </IconContext.Provider>
    </Router>
  );
}

export default App;
