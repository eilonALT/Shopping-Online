import { Order } from "../models/order";
import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";

export const selectOrderState = createSelector(
    createFeatureSelector("order"),
    (state: Order) => state
);