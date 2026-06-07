import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';
import { getCookie } from '../../utils/cookie';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ onlyUnAuth = false }: ProtectedRouteProps) => {
  const token = getCookie('accessToken');

  if (onlyUnAuth && token) {
    return <Navigate to='/' replace />;
  }

  if (!onlyUnAuth && !token) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};
