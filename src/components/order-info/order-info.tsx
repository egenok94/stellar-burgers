import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from 'react-redux';
import { selectAllingredients } from '../../services/ingredientsSlice';
import {
  selectChoosedOrder,
  selectOrderIsLoading
} from '../../services/orderSlice';
import { AppDispatch, useDispatch } from '../../services/store';
import { getOrderByNumber } from '../../services/orderSlice';
import { useLocation, useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  let ordernumber: string = '';

  if (location.pathname.match('feed')) {
    const { id } = useParams();
    ordernumber = id!;
  }

  if (location.pathname.match('profile')) {
    const { number } = useParams();
    ordernumber = number!;
  }

  useEffect(() => {
    dispatch(getOrderByNumber(Number(ordernumber)));
  }, []);

  const orderData = useSelector(selectChoosedOrder);

  const ingredients: TIngredient[] = useSelector(selectAllingredients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }
  return <OrderInfoUI orderInfo={orderInfo} />;
};
