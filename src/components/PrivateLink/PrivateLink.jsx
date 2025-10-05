import { Link } from 'react-router-dom';

import { useAuth } from '@hooks/useAuth.js';
import { useAuthModal } from '@hooks/useAuthModal';

const PrivateLink = ({
  as: Component = Link,
  children,
  to,
  ...props
}) => {
  const { isAuthenticated } = useAuth();
  const { openSignInModal } = useAuthModal();

  const handleClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault(); // block navigation
      openSignInModal({ redirectTo: to });
    }
  };

  return (
    <Component onClick={handleClick} {...props}>
      {children}
    </Component>
  );
};

export default PrivateLink;
