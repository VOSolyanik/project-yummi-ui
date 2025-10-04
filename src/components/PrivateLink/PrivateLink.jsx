import { useAuth } from '@hooks/useAuth.js';
import { useAuthModal } from '@hooks/useAuthModal';

const PrivateLink = ({
  as: Component = 'a',
  children,
  ...props
}) => {
  const { isAuthenticated } = useAuth();
  const { openSignInModal } = useAuthModal();

  const handleClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault(); // block navigation
      openSignInModal();
    }
  };

  return (
    <Component onClick={handleClick} {...props}>
      {children}
    </Component>
  );
};

export default PrivateLink;
