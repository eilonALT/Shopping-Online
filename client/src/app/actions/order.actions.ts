import { createAction, props } from '@ngrx/store';
import { Order } from '../models/order';

export const getOrder = createAction('[Order] getOrder');
export const setOrder = createAction('[Order] setOrder', props<{ order: any }>());
