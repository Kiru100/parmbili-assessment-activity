import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setPlantMode, setPlantTimer } from "../../__reducers/tiles.reducer";
import "./plant_modal.scss";

function PlantModal({set_show, set_hide, selected}){
    const dispatch = useDispatch();

    const handleSubmit = (event) =>{
        event.preventDefault();
        // console.log(event.target.plant_name.value, selected.mode, selected.index);

        if(event.target.plant_name.value && selected.mode === "tilled"){
            dispatch(setPlantMode({tile_index: selected.index, plant_name: event.target.plant_name.value}));

            let plant_time = 10;
            const intervalID = setInterval(() => {
                
                dispatch(setPlantTimer({tile_index: selected.index, time_left: plant_time}));
                plant_time--;

                if(plant_time < 0){
                    clearInterval(intervalID);

                    /**
                     * TODO: 
                     * change tile mode to harvest
                     * */
                    console.log('stop timer');
                }
            }, 1000);
            
            set_hide(); 
        }
    } 

    return(
        <Modal id="show_plant_modal" show={set_show} centered>
            <Modal.Body>
                <button className="close_button" type="button" onClick={set_hide}><span className="close_icon"></span></button>
                <form onSubmit={handleSubmit}>
                    <h2>Select a Crop to Plant</h2>
                    
                    <input id="potato_option"  type="radio" name="plant_name" value="potato"/>
                    <label htmlFor="potato_option" >
                        <span className="potato_icon"></span>
                        <p className="crop_informations">20s/10$/15$</p>
                    </label>

                    <input id="onion_option" type="radio" name="plant_name" value="onion"/>
                    <label htmlFor="onion_option">
                        <span className="onion_icon"></span>
                        <p className="crop_informations">30s/15$/25$</p>
                    </label>

                    <input id="carrot_option" type="radio" name="plant_name" value="carrot"/>
                    <label htmlFor="carrot_option">
                        <span className="carrot_icon"></span>
                        <p className="crop_informations">45s/25$/75$</p>
                    </label>

                    <input id="corn_option" type="radio" name="plant_name" value="corn"/>
                    <label htmlFor="corn_option">
                        <span className="corn_icon"></span>
                        <p className="crop_informations">60s/35$/100 $</p>
                    </label>

                    <div className="action_container">
                        <button type="button" onClick={set_hide}>Cancel</button>
                        <button type="submit">Plant</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default PlantModal;