import { configureStore } from "@reduxjs/toolkit";
import tilesReducer from "../reducers/tiles.reducer";
import usersReducer from "../reducers/users.reducer";

export const store = configureStore({
    reducer:{
        tiles: tilesReducer,
        users: usersReducer
    },
});
