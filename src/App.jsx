import './App.scss';
import React, { useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { expandTiles } from "./reducers/tiles.reducer";
import { addUserLevel } from './reducers/users.reducer';
import {  TILE_EXPANSION_VALUE } from './config/constants';
import TileItem from './components/tile_item';
import PlantModal from "./modals/add_plant/add_plant.modal";
import RemovePlant from './modals/remove_plant/remove_plant.modal';

function App() {
    const dispatch = useDispatch();
    const ref = useRef(null);

    /* Getting states from redux */
    const { tiles_list, selected_tile } = useSelector(state => state.tiles);
    const { user_data } = useSelector(state => state.users);

    /* Modal and overlay states */
    const [show_plant_modal, setShowPlantModal] = useState(false);
    const [show_remove_plant_modal, setShowRemovePlantModal] = useState(false);

    /**
    * DOCU: Shows the add plant modal and hides the tile's overlay. <br>
    * Triggered: Overlay button "Plant". <br>
    * @author Noel
    */
    const showPlantCropModal = () =>{setShowPlantModal(true) };

    /**
    * DOCU: Shows the remove crop modal and hides the tile's overlay. <br>
    * Triggered: Overlay button "Remove". <br>
    * @author Noel
    */
    const showRemoveCropModal = () =>{ setShowRemovePlantModal(true) };

    /**
    * DOCU: Add level of user and expand tiles. <br>
    * Triggered: Expand land button click listener. <br>
    * @author Noel
    */
    const expandArea = () =>{
        const tile_to_add = TILE_EXPANSION_VALUE[user_data.level+1].to_add;
        const expense_value = TILE_EXPANSION_VALUE[user_data.level+1].price;
        dispatch(addUserLevel({expansion_price: expense_value}));
        dispatch(expandTiles({to_add: tile_to_add}));
    };

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
                                actions={{ showPlantCropModal, showRemoveCropModal}}
                                />)
                        }
                        <p id="total_earnings">Total Earnings: {user_data.total_earnings}$</p>
                        {user_data.level < 4 ? 
                            <button id="expand_land_button" 
                                className="active" 
                                type="button" 
                                onClick={expandArea} 
                                disabled={ user_data.total_earnings >= TILE_EXPANSION_VALUE[user_data.level+1].price ? false : true }>
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
        </React.Fragment>
    );
}

export default App;
