import { createSlice } from '@reduxjs/toolkit';

export const asideSlice = createSlice({
    name: 'aside',
    initialState: false,
    reducers: {
        setAside: (state, action) => {
            return action.payload;
        }

    }
})

export const { setAside } = asideSlice.actions;

export default asideSlice.reducer;
