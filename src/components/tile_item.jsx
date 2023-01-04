import "./tile_item.scss";
import { useDispatch } from "react-redux";
import { setSelectedTile } from "../__reducers/tiles.reducer";
import { PLANT_DATA } from "../__config/constants";
import React from "react";

function TileItem({data, toggle_overlay, tile_index}){
    const dispatch = useDispatch();
    
    const handleTileClick = (event) =>{

        dispatch(setSelectedTile({index: tile_index, mode: data.mode}));
        toggle_overlay(event);
    }

    return(
        <li className={`tile_item ${data.mode}`} onClick={handleTileClick}>
            {
                data.mode === "planted" || data.mode === "harvest" ?
                    <React.Fragment>
                        <span className={`icon ${data.plant_name+"_icon" ?? ""}`}></span>
                        {
                            data.time_left ? 
                                <span className="time_left">{`${data.time_left}s`}</span> 
                                : 
                                // <span className="crop_value">{`${PLANT_DATA[data.mode].selling_price}`}</span>
                                <span className="crop_value">{`${PLANT_DATA[data.plant_name].selling_price}$`}</span>
                        }
                        
                    </React.Fragment>
                :   ""
            }
        </li>
    )
}

export default TileItem;