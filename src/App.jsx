import './App.scss';
import React, { useState, useRef} from 'react';
import { Modal } from 'react-bootstrap';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import TileItem from './components/tile_item';
import { useSelector, useDispatch } from 'react-redux';
import { setTillMode, setEmptyMode } from "./__reducers/tiles.reducer";
import { addTotalEarnings } from './__reducers/users.reducer';
import { PLANT_DATA } from './__config/constants';
import PlantModal from "./modals/plant_modal/plant_modal";

function App() {
    const dispatch = useDispatch();

    const { tiles_list, selected_tile } = useSelector(state => state.tiles);
    const { user_data } = useSelector(state => state.users);

    const [show_overlay, setShowOverlay] = useState(false);
    const [show_plant_modal, setShowPlantModal] = useState(false);

    const [overlay_target, setOverlayTarget] = useState(null);


    const ref = useRef(null);

    const toggleOverlay = (event) => {
        setShowOverlay(show_overlay ? true : true);
        setOverlayTarget(event.target);
    };

    const tillTile = (event) =>{
        dispatch(setTillMode({tile_index: selected_tile.index}));
        setShowOverlay(false);
    }

    const showPlantCropModal = (event)=>{
        setShowPlantModal(true);
        setShowOverlay(false);
    }

    const removeCrop = (event) =>{
        dispatch(setEmptyMode({tile_index: selected_tile.index}));
        setShowOverlay(false);
    }

    const harvestCrop = (event) =>{
        const plant_name = tiles_list[selected_tile.index].plant_name;
        const selling_price = PLANT_DATA[plant_name].selling_price;

        dispatch(addTotalEarnings({earning_value: selling_price}));
        dispatch(setEmptyMode({tile_index: selected_tile.index}));
        setShowOverlay(false);
    }

    return (
        <React.Fragment>
            <div className="App">
                <h1>Parmbili</h1>

                <main>
                    <ul id="tile_container" ref={ref}>
                        {tiles_list.map((tile_item_data, tile_index)=> 
                            <TileItem 
                                key={tile_index} 
                                tile_index={tile_index}
                                data={tile_item_data} 
                                toggle_overlay={toggleOverlay}/>)
                        }
                        <p id="total_earnings">Total Earnings: {user_data.total_earnings}$</p>
                    </ul>
                </main>
            </div>

            <PlantModal set_show={show_plant_modal} set_hide={()=>setShowPlantModal(false)} selected={selected_tile}/>
            <Overlay
                show={show_overlay}
                target={overlay_target}
                placement="bottom"
                container={ref}>
                <Popover id="popover-container">
                    <Popover.Body>
                        {selected_tile.mode === "empty" ? <button className="overlay_button" onClick={tillTile}>Till</button> : ""}
                        {selected_tile.mode === "tilled" ? <button className="overlay_button" onClick={showPlantCropModal}>Plant</button> : ""}
                        {selected_tile.mode === "planted" ? <button className="overlay_button remove" onClick={removeCrop}>Remove</button> : ""}
                        {selected_tile.mode === "harvest" ? 
                            <React.Fragment>
                                <button className="overlay_button" onClick={harvestCrop}>Harvest</button> 
                                <button className="overlay_button remove" onClick={removeCrop}>Remove</button>
                            </React.Fragment>
                            : ""}
                    </Popover.Body>
                </Popover>
            </Overlay>

        </React.Fragment>
    );
}

export default App;
