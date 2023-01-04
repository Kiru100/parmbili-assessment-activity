import { configureStore } from "@reduxjs/toolkit";
import tilesReducer from "../__reducers/tiles.reducer";
import usersReducer from "../__reducers/users.reducer";

export const store = configureStore({
    reducer:{
        tiles: tilesReducer,
        users: usersReducer
    },
});
