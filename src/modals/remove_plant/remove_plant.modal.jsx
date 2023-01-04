import { Modal, ModalBody } from "react-bootstrap";
import "./remove_plant.modal.scss";

function RemovePlant({set_show}){
    return(
       <Modal id="remove_plant_modal" show={set_show} centered>
            <Modal.Body>
                <form>
                    <h2>Remove Plant</h2>
                    <p>Are you sure you want to remove this plant?</p>
                    <div className="action_container">
                        <button type="button" className="cancel_button">Cancel</button>
                        <button type="submit" className="remove_button">Remove</button>
                    </div>
                </form>
            </Modal.Body>

       </Modal>
    )
}

export default RemovePlant;