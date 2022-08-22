import { Product } from "../models/product";
import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";

export const selectProductsState = createSelector(
    createFeatureSelector("products"),
    (state: Product[]) => state
);

export const selectProductState = createSelector(
    createFeatureSelector("products"),
    (state: Product) => state
);