import { createSlice, current } from "@reduxjs/toolkit";

export const users = createSlice({
    name:"users",
    initialState:{
        user_data:{ total_earnings: 180, level: 0 }
    },
    reducers:{
       addTotalEarnings:(state, action)=>{
            const { earning_value } = action.payload;
            state.user_data.total_earnings += earning_value;
       },
       reduceTotalEarnings:(state, action)=>{
            const { expense_value } = action.payload;
            state.user_data.total_earnings -= expense_value;
       },
       addUserLevel:(state, action)=>{
            state.user_data.level += 1;
       }

    }
});

export const { addTotalEarnings, reduceTotalEarnings, addUserLevel } = users.actions;
export default users.reducer;