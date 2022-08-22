import { createAction, props } from '@ngrx/store';
import { Cart } from '../models/cart';

export const getCart = createAction('[Cart] getCart');
export const setCart = createAction('[Cart] setCart', props<{ cart: any }>());
