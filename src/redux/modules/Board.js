import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isEdit : true,
    isopen : false,
    boardId : 0,
}

export const modalSlice = createSlice({
    name: 'Board',
    initialState,
    reducers:{
        openHandler : (state, action) => {
            state.isopen = !state.isopen
        },
        editModeHandler : (state, action) => {
            state.isEdit = !state.isEdit
        },
        storeBoardId : (state, action) => {
            console.log(action.payload)
            state.boardId = action.payload
        }
    }
})


export const {openHandler, editModeHandler, storeBoardId} = modalSlice.actions;
export default modalSlice.reducer;