import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserOrders } from '../../services/userSlice';
import { AppDispatch, useDispatch } from '../../services/store';
import { getUserOrders } from '../../services/userSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch: AppDispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectUserOrders) ?? [];

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
