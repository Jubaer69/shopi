import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAdmin: false,
    order: [],
    isUpdate: false,
    updateElem: null
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload
        },
        setOrder: (state, action) => {
            state.order = action.payload
        },
        setIsUpdate: (state, action) => {
            state.isUpdate = action.payload
        },
        setUpdateElem: (state, action) => {
            state.updateElem = action.payload
        }
    }
})

export const { setIsAdmin, setOrder, setIsUpdate, setUpdateElem } = adminSlice.actions;
export default adminSlice.reducer;