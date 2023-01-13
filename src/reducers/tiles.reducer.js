import { createSlice } from "@reduxjs/toolkit";

export const tiles = createSlice({
    name:"tiles",
    initialState:{
        selected_tile:{index: 0, mode:"empty"},
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
        /* Changes tile mode to tilled. */
        setTillMode:(state, action) =>{
            const { tile_index } = action.payload;
            state.tiles_list[tile_index].mode = "tilled";
            state.selected_tile.mode = "tilled";
        },
        /* Changes tile mode to empty then clear the interval if existing. */
        setEmptyMode:(state, action) =>{
            const { tile_index } = action.payload;
            clearInterval(state.tiles_list[tile_index].interval_id);
            state.tiles_list[tile_index] = { mode:"empty" };
        },
        /* Changes tile mode to planted then set which crop is planted. */
        setPlantMode:(state, action) =>{
            const { tile_index, plant_name } = action.payload;
            state.tiles_list[tile_index].mode = "planted";
            state.tiles_list[tile_index].plant_name = plant_name;
        },
        /* Changes tile mode to harvest if previous mode is planted. */
        setHarvestMode:(state, action)=>{
            const { tile_index } = action.payload;
        
            if(state.tiles_list[tile_index].mode === "planted"){
                state.tiles_list[tile_index].mode = "harvest";
            }
        },
        /* Add timer to plant */
        setPlantTimer:(state, action)=>{
            const {tile_index,time_left , interval_id} = action.payload;
            state.tiles_list[tile_index].time_left = time_left;
            state.tiles_list[tile_index].interval_id = interval_id;
        },
        /* Changes the value of selected tile to current one given index and mode. */
        setSelectedTile:(state, action)=>{
            const {index, mode} = action.payload;
            state.selected_tile = {index: index, mode: mode};
        },
        /* Add new sets of array to tiles_list. */
        expandTiles:(state, action)=>{
            const { to_add } = action.payload;

            for( let add_tile_index = 0; add_tile_index < to_add; add_tile_index++){
                state.tiles_list.push({ mode:"empty" });
            }
        }
    }
});

export const { setTillMode, setSelectedTile, setPlantMode, setPlantTimer, setHarvestMode, setEmptyMode, expandTiles} = tiles.actions;
export default tiles.reducer;