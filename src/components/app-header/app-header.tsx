import { FC, useEffect } from 'react';
import { AppHeaderUI } from '@ui';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import { getUser, selectUserState } from '../../services/userSlice';

export const AppHeader: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector(selectUserState);

  return <AppHeaderUI userName={user?.name ?? ''} />;
};
