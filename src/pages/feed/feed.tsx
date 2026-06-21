import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getFeeds,
  selectFeedsIsLoading,
  selectFeedOrders
} from '../../services/feedSlice';
import { AppDispatch, useDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch: AppDispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectFeedOrders);
  const feedIsLoading = useSelector(selectFeedsIsLoading);

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (feedIsLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
