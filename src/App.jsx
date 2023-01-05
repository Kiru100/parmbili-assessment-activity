import './App.scss';
import React, { useState, useRef} from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import TileItem from './components/tile_item';
import { useSelector, useDispatch } from 'react-redux';
import { setTillMode, setEmptyMode, expandTiles } from "./__reducers/tiles.reducer";
import { addTotalEarnings, addUserLevel } from './__reducers/users.reducer';
import { PLANT_DATA, TILE_EXPANSION_VALUE } from './__config/constants';
import PlantModal from "./modals/add_plant/add_plant.modal";
import RemovePlant from './modals/remove_plant/remove_plant.modal';

function App() {
    const dispatch = useDispatch();

    const { tiles_list, selected_tile } = useSelector(state => state.tiles);
    const { user_data } = useSelector(state => state.users);

    const [show_overlay, setShowOverlay] = useState(false);
    const [show_plant_modal, setShowPlantModal] = useState(false);
    const [show_remove_plant_modal, setShowRemovePlantModal] = useState(false);

    const [overlay_target, setOverlayTarget] = useState(null);


    const ref = useRef(null);

    const toggleOverlay = (event) => { 
        setShowOverlay(show_overlay ? true : true);
        setOverlayTarget(event.target);
    };

    const tillTile = () =>{
        dispatch(setTillMode({tile_index: selected_tile.index}));
        setShowOverlay(false);
    }

    const showPlantCropModal = ()=>{
        setShowPlantModal(true);
        setShowOverlay(false);
    }

    const showRemoveCropModal = () =>{
        setShowRemovePlantModal(true);
        setShowOverlay(false);
    }

    const harvestCrop = () =>{
        const plant_name = tiles_list[selected_tile.index].plant_name;
        const selling_price = PLANT_DATA[plant_name].selling_price;
        dispatch(addTotalEarnings({earning_value: selling_price}));
        dispatch(setEmptyMode({tile_index: selected_tile.index}));
        setShowOverlay(false);
    }

    const expandArea = () =>{
        const tile_to_add = TILE_EXPANSION_VALUE[user_data.level+1].to_add;
        const expense_value = TILE_EXPANSION_VALUE[user_data.level+1].price;

        console.log(tile_to_add, expense_value);
        dispatch(addUserLevel({expansion_price: expense_value}));
        dispatch(expandTiles({to_add: tile_to_add}));
    }

    return (
        <React.Fragment>
            <div className="App">
                <h1>Parmbili</h1>

                <main>
                    <ul id="tile_container" ref={ref} style={{ width: `${TILE_EXPANSION_VALUE[user_data.level].size * 110 }px`}}>
                        {tiles_list.map((tile_item_data, tile_index)=> 
                            <TileItem 
                                key={tile_index} 
                                tile_index={tile_index}
                                data={tile_item_data} 
                                toggle_overlay={toggleOverlay}/>)
                        }
                        <p id="total_earnings">Total Earnings: {user_data.total_earnings}$</p>
                        {user_data.level < 4 ? 
                            <button id="expand_land_button" 
                                className="active" 
                                type="button" 
                                onClick={expandArea} 
                                disabled={ user_data.total_earnings >= TILE_EXPANSION_VALUE[user_data.level+1].price ? false : true}
                                >
                                <span>Expand Land to {TILE_EXPANSION_VALUE[user_data.level+1].size} x {TILE_EXPANSION_VALUE[user_data.level+1].size}</span>
                                <span>{TILE_EXPANSION_VALUE[user_data.level+1].price}$</span>
                            </button>
                            : ""
                        }
                    </ul>
                </main>
            </div>
            
            <RemovePlant set_show={show_remove_plant_modal} set_hide={()=>setShowRemovePlantModal(false)} selected={selected_tile}/>
            <PlantModal set_show={show_plant_modal} set_hide={()=>setShowPlantModal(false)} selected={selected_tile}/>
            <Overlay
                show={show_overlay}
                target={overlay_target}
                placement="bottom"
                container={ref}>
                <Popover id="popover-container">
                    <Popover.Body>
                        {selected_tile.mode === "empty"   ? <button className="overlay_button" onClick={tillTile}>Till</button> : ""}
                        {selected_tile.mode === "tilled"  ? <button className="overlay_button" onClick={showPlantCropModal}>Plant</button> : ""}
                        {selected_tile.mode === "planted" ? <button className="overlay_button remove" onClick={showRemoveCropModal}>Remove</button> : ""}
                        {selected_tile.mode === "harvest" ? 
                            <React.Fragment>
                                <button className="overlay_button" onClick={harvestCrop}>Harvest</button> 
                                <button className="overlay_button remove" onClick={showRemoveCropModal}>Remove</button>
                            </React.Fragment>
                            : ""
                        }
                    </Popover.Body>
                </Popover>
            </Overlay>

        </React.Fragment>
    );
}

export default App;
