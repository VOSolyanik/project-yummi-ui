import { Helmet } from 'react-helmet-async';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Sign Up - Yummi</title>
        <meta name="description" content="Create a Yummi account to access all platform features" />
      </Helmet>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
