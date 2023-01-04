import { createSlice, current } from "@reduxjs/toolkit";

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
        setTillMode:(state, action) =>{
            const { tile_index } = action.payload;
            state.tiles_list[tile_index].mode = "tilled";
        },
        setPlantMode:(state, action) =>{
            const { tile_index, plant_name } = action.payload;

            state.tiles_list[tile_index].mode = "planted";
            state.tiles_list[tile_index].plant_name = plant_name;
        },
        setPlantTimer:(state, action)=>{
            const {tile_index ,time_left} = action.payload;
            state.tiles_list[tile_index].time_left = time_left;
        },
        setSelectedTile:(state, action)=>{
            const {index, mode} = action.payload;
            state.selected_tile = {index: index, mode: mode};
        },
    }
});

export const { setTillMode, setSelectedTile, setPlantMode, setPlantTimer} = tiles.actions;
export default tiles.reducer;