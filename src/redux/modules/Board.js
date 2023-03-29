import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isEdit : false,
    isopen : false,
    isReplyOpen : false,
    ReplyId : 0,
    boardId : 0,
    isOpenImage : false
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
            state.boardId = action.payload
        },
        isReplyOpenHandler:(state,action)=>{
            state.isReplyOpen = !state.isReplyOpen
            state.ReplyId = action.payload
        },
        openIamge:(state,action)=>{
            state.isOpenImage = action.payload
        }
    }
})


export const {openHandler, editModeHandler, storeBoardId, isReplyOpenHandler, openIamge} = modalSlice.actions;
export default modalSlice.reducer;