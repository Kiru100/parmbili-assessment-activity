import { Modal } from "react-bootstrap";
import "./plant_modal.scss";

function PlantModal({set_show, set_hide}){
    return(
        <Modal id="show_plant_modal" show={set_show} centered>
            <Modal.Body>
                <button className="close_button" type="button" onClick={set_hide}><span className="close_icon"></span></button>
                <h2>Select a Crop to Plant</h2>
                <label>
                    <span class="potate_icon"></span>
                    <p className="crop_informations">60s/10$/15$</p>
                    <input type="radio" name="plant_name" value="potato"/>
                </label>
                <label>
                    <span class="onion_icon"></span>
                    <p className="crop_informations">60s/10$/15$</p>
                    <input type="radio" name="plant_name" value="onion"/>
                </label>
                <label>
                    <span class="carrot_icon"></span>
                    <p className="crop_informations">60s/10$/15$</p>
                    <input type="radio" name="plant_name" value="carrot"/>
                </label>
                <label>
                    <span class="corn_icon"></span>
                    <p className="crop_informations">60s/10$/15$</p>
                    <input type="radio" name="plant_name" value="corn"/>
                </label>

                <div className="action_container">
                    <button type="button" onClick={set_hide}>Cancel</button>
                    <button type="submit">Plant</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default PlantModal;