import './App.scss';
import React, { useState, useRef} from 'react';
import { Modal } from 'react-bootstrap';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import TileItem from './components/tile_item';
import { useSelector, useDispatch } from 'react-redux';
import { setTillMode } from "./__reducers/tiles.reducer";
import PlantModal from "./modals/plant_modal/plant_modal";

function App() {
    const dispatch = useDispatch();

    const { tiles_list, selected_tile } = useSelector(state => state.tiles);

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
                        <p id="total_earnings">Total Earnings: 50$</p>
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
                        {selected_tile.mode === "empty" ? <button className="till_button" onClick={tillTile}>Till</button> : ""}
                        {selected_tile.mode === "tilled" ? <button className="till_button" onClick={showPlantCropModal}>Plant</button> : ""}
                    </Popover.Body>
                </Popover>
            </Overlay>
        </React.Fragment>
    );
}

export default App;
