import { createAction, props } from '@ngrx/store';
// import { Product } from '../models/product';

export const getProducts = createAction('[Product] getProducts');
export const setProducts = createAction('[Product] setProducts', props<{ Products: any }>());
