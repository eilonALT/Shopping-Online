import { createReducer, on } from '@ngrx/store'
import { Cart } from '../models/cart'
import { getCart, setCart } from '../actions/cart.actions'

const initialState: Cart = new Cart();

export const cartReducer = createReducer(
    initialState,
    on(getCart, (state) => {
        return state;
    }),
    on(setCart, (state, actions) => {
        return actions.cart;
    })
)