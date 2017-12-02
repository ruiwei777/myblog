import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
import Navbar from 'root/components/Navbar';
import Profile from './Profile';
import Register from './Register';



class Account extends React.Component {
  render() {
    const { username, token } = this.props.user;

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