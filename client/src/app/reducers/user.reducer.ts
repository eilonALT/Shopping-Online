import { createReducer, on } from '@ngrx/store'
import { User } from '../models/user'
import { login, logout } from '../actions/user.actions'

const initialState: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {
    firstName: "",
    lastName: "",
    username: "",
    idNumber: 0,
    password: "",
    city: "",
    street: "",
    role: "user",
    cartId: "",
}

export const userReducer = createReducer(
    initialState,
    on(login, (state, actions) => {
        return actions.user
    }),
    on(logout, () => {
        return new User()
    })
)