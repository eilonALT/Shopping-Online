import { ActionsSubject, createReducer, on } from '@ngrx/store'
import { Product } from '../models/product'
import { getProducts, setProducts } from '../actions/products.actions'
import { Action } from 'rxjs/internal/scheduler/Action';

const initialState: Product[] = [];

export const productsReducer = createReducer(
    initialState,
    on(getProducts, (state) => {
        return state;
    }),
    on(setProducts, (state, actions) => {
        return actions.Products;
    })
)