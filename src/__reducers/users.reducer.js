import { createSlice, current } from "@reduxjs/toolkit";

export const users = createSlice({
    name:"users",
    initialState:{
        user_data:{ total_earnings: 50 }
    },
    reducers:{
       addTotalEarnings:(state, action)=>{
            const { earning_value } = action.payload;
            state.user_data.total_earnings += earning_value;
       },
       reduceTotalEarnings:(state, action)=>{
            const { expense_value } = action.payload;
            state.user_data.total_earnings -= expense_value;
       }
    }
});

export const { addTotalEarnings, reduceTotalEarnings } = users.actions;
export default users.reducer;