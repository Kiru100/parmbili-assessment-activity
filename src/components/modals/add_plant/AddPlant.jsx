import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setPlantMode, setPlantTimer, setHarvestMode } from "../../reducers/tiles.reducer";
import { reduceTotalEarnings } from "../../reducers/users.reducer";
import { PLANT_DATA } from "../../config/constants";
import { useState } from "react";
import "./add_plant.modal.scss";

function AddPlant({set_show, set_hide, selected}){
    const { user_data } = useSelector(state => state.users);
    const [disable_submit_button, setDisableSubmitButton] = useState(true);
    const dispatch = useDispatch();
    
    /**
    * DOCU: It updates plant's mode and reduce user's total earnings. <br>
    * It also sets new interval crop's timer which when done set the mode to harvest. <br>
    * Triggered: When user submit the form. <br>
    * @param {event} object - event object from modal form.
    * @author Noel
    */
    const handleSubmit = (event) =>{
        event.preventDefault();
        closeModal();

        let plant_name = event.target.plant_name.value;
        let plant_time = PLANT_DATA[plant_name].growing_time;
        let plant_initial_price = PLANT_DATA[plant_name].initial_price;

        /* Create setInterval to tick every second to update the time left before user can harvest the crop. */
        if(event.target.plant_name.value && selected.mode === "tilled" && user_data.total_earnings >= plant_initial_price){
            dispatch(setPlantMode({tile_index: selected.index, plant_name: plant_name, mode: "planted"}));
            dispatch(reduceTotalEarnings({expense_value: plant_initial_price}));
            set_hide(); 
            
            const intervalID = setInterval(() => {
                dispatch(setPlantTimer({tile_index: selected.index, time_left: plant_time, interval_id: intervalID}));
                plant_time--;

                if(plant_time < 0){
                    clearInterval(intervalID);
                    dispatch(setHarvestMode({tile_index: selected.index}));
                }
            }, 1000);
        }
    } 

    /**
    * DOCU: If the user's total earnings are greater than or equal to the plant's initial price, then the <br>
    * submit button is enabled. Otherwise, the submit button is disabled. <br>
    * Triggered: When user click radio button. <br>
    * @param {selected_plant_name} string - name of the crop
    * @author Noel
    */
    const setSelectedPlant = (selected_plant_name) =>{
        let plant_initial_price = PLANT_DATA[selected_plant_name].initial_price;

        if(user_data.total_earnings >= plant_initial_price){
            setDisableSubmitButton(false);
        }
        else if(user_data.total_earnings <= plant_initial_price){
            setDisableSubmitButton(true);
        }
    }

    /**
    * DOCU: Set disable_submit_button value to true to make submit button disabled then hide the modal. <br>
    * Triggered: Buttons that closes the modal. <br>
    * @author Noel
    */
    const closeModal = () =>{
        setDisableSubmitButton(true);
        set_hide();
    }

    /**
    * DOCU: Takes a crop_name as an argument and returns a string that is the <br>
    * concatenation of the growing_time, initial_price, and selling_price of the crop_name. <br>
    * Triggered: Plant modal
    * @param {crop_name} string - name of the crop
    * @returns The return value is a string (concatenated string of crop informations).
    * @author Noel
    */
    const showCropData = (crop_name) =>{
        return `${PLANT_DATA[crop_name].growing_time}s / ${PLANT_DATA[crop_name].initial_price}$ / ${PLANT_DATA[crop_name].selling_price}$`;
    }

    return(
        <Modal id="show_plant_modal" show={set_show} centered>
            <Modal.Body>
                <button className="close_button" type="button" onClick={closeModal}><span className="close_icon"></span></button>
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
                        <button type="button" onClick={closeModal}>Cancel</button>
                        <button type="submit" disabled={disable_submit_button}>Plant</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default AddPlant;