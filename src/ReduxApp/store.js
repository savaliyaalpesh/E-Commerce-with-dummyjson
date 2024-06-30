import { configureStore } from '@reduxjs/toolkit'
import counterReduser from '../Component/CartSlice/CartSlice'
export const store = configureStore({
    reducer: {
        counter: counterReduser
    },
    
})