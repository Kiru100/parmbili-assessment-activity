import { createSlice } from "@reduxjs/toolkit";

export const users = createSlice({
    name:"users",
    initialState:{
        user_data:{ total_earnings: 50, level: 0 }
    },
    reducers:{
        /* Increase total earnings of user. */
        addTotalEarnings:(state, action)=>{
            const { earning_value } = action.payload;
            state.user_data.total_earnings += earning_value;
        },
        /* Decrease total earnings of user. */
        reduceTotalEarnings:(state, action)=>{
            const { expense_value } = action.payload;
            state.user_data.total_earnings -= expense_value;
        },
        /* Increment user's level then decrease total earnings of user. */
        addUserLevel:(state, action)=>{
            const { expansion_price } = action.payload;
            state.user_data.level += 1;
            state.user_data.total_earnings -= expansion_price;
        }
    }
});

export const { addTotalEarnings, reduceTotalEarnings, addUserLevel } = users.actions;
export default users.reducer;