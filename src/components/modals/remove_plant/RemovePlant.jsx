import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setEmptyMode } from "../../../reducers/tiles.reducer";
import "./remove_plant.modal.scss";

function RemovePlant({set_show, set_hide, selected}){
    const dispatch = useDispatch();

    /**
    * DOCU: Set selected tile to empty mode then set modal show to false. <br>
    * Triggered: When form is submitted/ Remove button is clicked. <br>
    * @author Noel
    */
    const handleSubmit = (event) =>{
        event.preventDefault();
        dispatch(setEmptyMode({tile_index: selected.index}));
        set_hide();
    }

    return(
       <Modal id="remove_plant_modal" show={set_show} centered>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <h2>Remove Plant</h2>
                    <p>Are you sure you want to remove this plant?</p>
                    <div className="action_container">
                        <button type="button" className="cancel_button" onClick={set_hide}>Cancel</button>
                        <button type="submit" className="remove_button">Remove</button>
                    </div>
                </form>
            </Modal.Body>
       </Modal>
    )
}

export default RemovePlant;