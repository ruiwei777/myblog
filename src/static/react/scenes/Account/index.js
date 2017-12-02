import React from 'react';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
import LoginForm from 'root/components/LoginForm';
import Navbar from 'root/components/Navbar';
import Portal from 'root/components/Portal';
import Profile from './Profile';
import Register from './Register';

import { login, loginFromCookie, saveUserIntoCookie } from 'root/services/users/actions';
import { unmountPortal } from 'root/services/portal/actions';



class Account extends React.Component {
  componentWillMount(){
    this.props.dispatch(loginFromCookie())
  }

  submit = (values) => {
    const { username, password } = values;
    this.props.dispatch(login(username, password))
      .then((data) => {
        this.props.dispatch(unmountPortal());
        this.props.dispatch(saveUserIntoCookie(data));
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { username, token } = this.props.user;
    const { shouldPortalMount } = this.props.portal;

    return (
      <div>
        {shouldPortalMount &&
          <Portal title={'Login'}>
            <LoginForm onSubmit={this.submit} />
          </Portal>
        }
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