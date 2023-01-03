import { useDispatch } from "react-redux";
import { setSelectedTile } from "../__reducers/tiles.reducer";

function TileItem({data, toggle_overlay, tile_index}){
    const dispatch = useDispatch();
    
    const handleTileClick = (event) =>{

        dispatch(setSelectedTile({index: tile_index, mode: data.mode}));
        toggle_overlay(event);
    }

    return(
        <li className={`tile_item ${data.mode}`} onClick={handleTileClick}></li>
    )
}

export default TileItem;