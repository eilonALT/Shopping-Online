import { Category } from "../models/category";
import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";

export const selectCategoryState = createSelector(
    createFeatureSelector("category"),
    (state: Category) => state
);