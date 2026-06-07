import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { AppDispatch, useSelector } from '../../services/store';
import {
  getBurgerConstructorOrger,
  selectConstructorItems,
  selectContructorIsLoading,
  selectOrderModalData,
  closeConstructorOrderModal
} from '../../services/constructorSlice';
import { useDispatch } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { Navigate, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectContructorIsLoading);
  const orderModalData = useSelector(selectOrderModalData);

  const onOrderClick = () => {
    if (!getCookie('accessToken')) {
      navigate('/login');
    }
    if (
      constructorItems.bun &&
      constructorItems.ingredients.length > 0 &&
      getCookie('accessToken')
    ) {
      dispatch(
        getBurgerConstructorOrger(
          constructorItems.ingredients.map((item) => item._id)
        )
      );
    }

    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {
    dispatch(closeConstructorOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
