// State name
// Initial value
// Functions

import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const moviesSlice =  createSlice({
    name: 'movies',
    initialState: {
        value: [],
        limit: 5
    },
    reducers: {
        getMoviesData: (state, action) => {
            console.log(action)
            state.value = action.payload
        },
        updateLimit: (state) => {
            state.limit += 5
        }
    }
})

export const {getMoviesData, updateLimit} = moviesSlice.actions
export default moviesSlice.reducer