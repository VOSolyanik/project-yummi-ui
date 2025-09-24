import { Helmet } from 'react-helmet-async';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Sign In - Yummi</title>
        <meta name="description" content="Sign in to your Yummi account to access personalized features" />
      </Helmet>
      <LoginForm />
    </>
  );
};

export default LoginPage;
