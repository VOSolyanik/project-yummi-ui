import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

// import css from './UserPage.module.css';

import { BASE_TITLE } from '@constants/pages';

const UserPage = () => {
  const { userId } = useParams();
  const isCurrentUser = userId === 'me'; // Assuming 'me' represents the current user
  return (
    <>
      <Helmet>
        <title>
          {BASE_TITLE} - {isCurrentUser ? 'My Profile' : 'User Profile'}
        </title>
      </Helmet>
      <h1>{isCurrentUser ? 'My Profile' : 'User Profile'}</h1>
    </>
  );
};

export default UserPage;
