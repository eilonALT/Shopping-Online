import { createReducer, on } from '@ngrx/store'
import { Order } from '../models/order'
import { getOrder, setOrder } from '../actions/order.actions'

const initialState: Order = new Order();

export const orderReducer = createReducer(
    initialState,
    on(getOrder, (state) => {
        return state;
    }),
    on(setOrder, (state, actions) => {
        return actions.order;
    })
)