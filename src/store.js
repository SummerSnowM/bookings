import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './features/usersSlice'

export default configureStore({
    reducer: {
        users: usersReducer,
    }
})