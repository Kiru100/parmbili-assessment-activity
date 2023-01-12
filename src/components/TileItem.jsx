import "./tile_item.scss";
import { useDispatch } from "react-redux";
import { setSelectedTile } from "../reducers/tiles.reducer";
import { PLANT_DATA } from "../config/constants";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { setTillMode, setEmptyMode } from "../reducers/tiles.reducer";
import { addTotalEarnings } from "../reducers/users.reducer";
import React from "react";

function TileItem({data, toggle_overlay, tile_index, actions}){
    const dispatch = useDispatch();

    /**
    * DOCU: When a tile is clicked, the tile's index and mode are set to the selected tile, 
    * and the overlay is toggled.
    * @param {event} object - event object from clicked Tile.
    * @author Noel
    */
    const handleTileClick = (event) =>{
        dispatch(setSelectedTile({index: tile_index, mode: data.mode}));
    }

    /**
    * DOCU: Add total earning to user then remove the crop from the plant. <br>
    * Triggered: Overlay "harvest" button. <br>
    * @author Noel
    */
    const harvestCrop = () =>{
        const selling_price = PLANT_DATA[data.plant_name].selling_price;
        dispatch(addTotalEarnings({earning_value: selling_price}));
        dispatch(setEmptyMode({tile_index: tile_index}));
    };

    const popover = (
        <Popover id="popover-container">
            <Popover.Body>
                {data.mode === "empty"   ? <button className="overlay_button" onClick={()=> dispatch(setTillMode({tile_index: tile_index}))}>Till</button> : ""}
                {data.mode === "tilled"  ? <button className="overlay_button" onClick={actions.showPlantCropModal}>Plant</button> : ""}
                {data.mode === "planted" ? <button className="overlay_button remove" onClick={actions.showRemoveCropModal}>Remove</button> : ""}
                {data.mode === "harvest" ? 
                    <React.Fragment>
                        <button className="overlay_button" onClick={harvestCrop}>Harvest</button> 
                        <button className="overlay_button remove" onClick={actions.showRemoveCropModal}>Remove</button>
                    </React.Fragment>
                    : ""
                }
            </Popover.Body>
        </Popover>
    );

    return(
        <OverlayTrigger
            trigger="click"
            placement="bottom"
            rootClose
            overlay={popover}
        >
            <li className={`tile_item ${data.mode}`} onClick={handleTileClick}>
                {data.mode === "planted" || data.mode === "harvest" ?
                    <React.Fragment>
                        <span className={`icon ${data.plant_name+"_icon" ?? ""}`}></span>
                        {data.time_left ? 
                            <span className="time_left">{`${data.time_left}s`}</span> 
                            : 
                            <span className="crop_value">{`${PLANT_DATA[data.plant_name].selling_price}$`}</span>
                        }
                    </React.Fragment>
                    :""
                }
            </li>
        </OverlayTrigger>
    )
}

export default TileItem;