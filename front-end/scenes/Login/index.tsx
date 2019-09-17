// React && 3rd Party
import React from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

// App
import LoginForm from './LoginForm';
// @ts-ignore
import { login } from 'root/actions/userActions';

const Login: React.FC<RouteComponentProps> = props => {
  const dispatch = useDispatch();
  const { history } = props;

  const handleSubmit = (values: any) => {
    const { username, password } = values;
    dispatch(login(username, password))
    .then(() => {
      history.push('/posts');
    })
    ;
  }

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  )
}

export default Login;
