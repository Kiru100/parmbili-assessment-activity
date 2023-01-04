import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setPlantMode, setPlantTimer, setHarvestMode } from "../../__reducers/tiles.reducer";
import { reduceTotalEarnings } from "../../__reducers/users.reducer";
import { PLANT_DATA } from "../../__config/constants";
import { useState } from "react";
import "./add_plant.modal.scss";

function PlantModal({set_show, set_hide, selected}){
    const { user_data } = useSelector(state => state.users);
    const [disable_submit_button, setDisableSubmitButton] = useState(true);
    const dispatch = useDispatch();

    const handleSubmit = (event) =>{
        event.preventDefault();
        let plant_name = event.target.plant_name.value;
        let plant_time = PLANT_DATA[plant_name].growing_time;
        let plant_initial_price = PLANT_DATA[plant_name].initial_price;

        if(event.target.plant_name.value && selected.mode === "tilled" && user_data.total_earnings >= plant_initial_price){
            dispatch(setPlantMode({tile_index: selected.index, plant_name: plant_name}));
            dispatch(reduceTotalEarnings({expense_value: plant_initial_price}));
            set_hide(); 
            
            const intervalID = setInterval(() => {
                dispatch(setPlantTimer({tile_index: selected.index, time_left: plant_time}));
                plant_time--;

                if(plant_time < 0){
                    clearInterval(intervalID);
                    dispatch(setHarvestMode({tile_index: selected.index}));
                }
            }, 1000);
        }
    } 

    const setSelectedPlant = (selected_plant_name) =>{
        let plant_initial_price = PLANT_DATA[selected_plant_name].initial_price;

        console.log('user_total', user_data.total_earnings, 'plant_initial_price', plant_initial_price);
        if(user_data.total_earnings >= plant_initial_price){
            setDisableSubmitButton(false);
        }
    }

    const showCropData = (crop_name) =>{
        return `${PLANT_DATA[crop_name].growing_time}s / ${PLANT_DATA[crop_name].initial_price}$ / ${PLANT_DATA[crop_name].selling_price}$`
    }

    return(
        <Modal id="show_plant_modal" show={set_show} centered>
            <Modal.Body>
                <button className="close_button" type="button" onClick={set_hide}><span className="close_icon"></span></button>
                <form onSubmit={handleSubmit}>
                    <h2>Select a Crop to Plant</h2>
                    
                    <input id="potato_option"  type="radio" name="plant_name" value="potato"/>
                    <label htmlFor="potato_option" onClick={()=>setSelectedPlant("potato")}>
                        <span className="potato_icon"></span>
                        <p className="crop_informations">{showCropData("potato")}</p>
                    </label>

                    <input id="onion_option" type="radio" name="plant_name" value="onion"/>
                    <label htmlFor="onion_option" onClick={()=>setSelectedPlant("onion")}>
                        <span className="onion_icon"></span>
                        <p className="crop_informations">{showCropData("onion")}</p>
                    </label>

                    <input id="carrot_option" type="radio" name="plant_name" value="carrot"/>
                    <label htmlFor="carrot_option" onClick={()=>setSelectedPlant("carrot")}>
                        <span className="carrot_icon"></span>
                        <p className="crop_informations">{showCropData("carrot")}</p>
                    </label>

                    <input id="corn_option" type="radio" name="plant_name" value="corn"/>
                    <label htmlFor="corn_option" onClick={()=>setSelectedPlant("corn")}>
                        <span className="corn_icon"></span>
                        <p className="crop_informations">{showCropData("corn")}</p>
                    </label>

                    <div className="action_container">
                        <button type="button" onClick={set_hide}>Cancel</button>
                        <button type="submit" disabled={disable_submit_button}>Plant</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default PlantModal;