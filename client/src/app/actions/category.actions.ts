import { createAction, props } from '@ngrx/store';
import { Category } from '../models/category';

export const getCategory = createAction('[Category] getCategory');
export const setCategory = createAction('[Category] setCategory', props<{ category: any }>());
