import { createReducer, on } from '@ngrx/store'
import { Category } from '../models/category'
import { getCategory, setCategory } from '../actions/category.actions'

const initialState: Category = new Category();

export const categoryReducer = createReducer(
    initialState,
    on(getCategory, (state) => {
        return state;
    }),
    on(setCategory, (state, actions) => {
        return actions.category;
    })
)