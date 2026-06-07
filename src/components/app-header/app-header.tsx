import { FC, useEffect } from 'react';
import { AppHeaderUI } from '@ui';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import { getUser, selectUser } from '../../services/userSlice';

export const AppHeader: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, isInit } = useSelector(selectUser);

  useEffect(() => {
    if (!isInit) {
      dispatch(getUser());
    }
  }, [dispatch, isInit]);

  return <AppHeaderUI userName={user?.name ?? ''} />;
};
