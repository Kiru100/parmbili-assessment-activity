import { createSlice } from "@reduxjs/toolkit";

export const tiles = createSlice({
    name:"tiles",
    initialState:{
        selected_tile:{index:0, mode:"empty"},
        tiles_list:[
            { mode:"empty" },
            { mode:"empty" },
            { mode:"empty" },
            { mode:"empty" },

            { mode:"empty" },
            { mode:"empty" },
            { mode:"empty" },
            { mode:"empty" },

            { mode:"empty" },
            { mode:"empty" },
            { mode:"empty" },
            { mode:"empty" },

            { mode:"empty" },
            { mode:"empty" },
            { mode:"empty" },
            { mode:"empty" },   
        ]
    },
    reducers:{
        setMode:(state, action) =>{
            const {tile_index, tile_mode} = action.payload;
            state.tiles_list[tile_index].mode = tile_mode;
        },
        setSelectedTile:(state, action)=>{
            const {index, mode} = action.payload;
            state.selected_tile = {index: index, mode: mode};
        }
    }
});

export const { setMode, setSelectedTile} = tiles.actions;
export default tiles.reducer;