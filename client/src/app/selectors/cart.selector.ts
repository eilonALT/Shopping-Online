import { Cart } from "../models/cart";
import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";

export const selectCartState = createSelector(
    createFeatureSelector("cart"),
    (state: Cart) => state
);