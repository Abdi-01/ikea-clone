import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavbarComp from './components/navbar';
import logo from './logo.svg';
import LandingPage from './pages/landingPage'
import AuthPage from './pages/authPage'
import axios from 'axios';
import { URL_API } from './helper';
import { keepLogin } from './actions'
import { connect } from 'react-redux'
import ProductManagement from './pages/productManagement';
import NotFound from './pages/notFound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    this.reLogin()
  }

  reLogin = () => {
    let idToken = localStorage.getItem("tkn_id")
    axios.get(URL_API + `/users?id=${idToken}`)
      .then(res => {
        this.props.keepLogin(res.data[0])
      })
      .catch(err => {
        console.log("Keeplogin error :", err)
      })
  }

  render() {
    return (
      <div>
        <NavbarComp />
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/auth" component={AuthPage} />
          {
            this.props.role == "admin" &&
            <>
              <Route path="/product-management" component={ProductManagement} />
            </>
          }
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

// inline condition
// 1. condition ? return A : return B, sama dengan kita buat if(condition){}else{}
// 2. condition && return, sama dengan kita buat if(condition){}
const mapStateToProps = ({ authReducer }) => {
  return {
    role: authReducer.role
  }
}

export default connect(mapStateToProps, { keepLogin })(App);
