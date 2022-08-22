import { User } from "../models/user";
import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";

export const selectUserState = createSelector(
    createFeatureSelector("user"),
    (state: User) => state
);