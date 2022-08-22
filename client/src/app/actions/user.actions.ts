import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const login = createAction('[User] Login', props<{ user: User }>());
export const logout = createAction('[User] Logout');