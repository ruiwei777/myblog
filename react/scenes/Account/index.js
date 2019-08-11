import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
import Navbar from 'root/components/Navbar';
import Profile from './Profile';
import Register from './Register';

import { login, loginFromCookie } from 'root/actions/userActions';
import { unmountPortal } from 'root/actions/portalActions';

import './account.scss';



class Account extends React.Component {
  componentWillMount(){
    this.props.dispatch(loginFromCookie())
  }

  submit = (values) => {
    const { username, password } = values;
    this.props.dispatch(login(username, password))
      .then((data) => {
        this.props.dispatch(unmountPortal());
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {

    return (
      <div>
        <Navbar />

        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/profile' component={Profile}></Route>
          <Route path='/register' component={Register}></Route>
        </Switch>

      </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    user: state.userReducer,
    portal: state.portalReducer
  };
}
export default connect(mapStateToProps)(Account);