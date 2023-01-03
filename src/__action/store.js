import { configureStore } from "@reduxjs/toolkit";
import tilesReducer from "../__reducers/tiles.reducer";

export const store = configureStore({
    reducer:{
        tiles: tilesReducer,
    },
});
