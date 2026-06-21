import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import {
  openIngreient,
  selectChoosedIngredient
} from '../../services/constructorSlice';
import { useParams } from 'react-router-dom';
import { AppDispatch, useDispatch } from '../../services/store';
import { TIngredient } from '@utils-types';
import { selectAllingredients } from '../../services/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams();
  const allIngredients = useSelector(selectAllingredients);

  const ingredientData = allIngredients.find((ingr) => ingr._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
