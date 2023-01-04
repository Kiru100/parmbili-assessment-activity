import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setEmptyMode } from "../../__reducers/tiles.reducer";
import "./remove_plant.modal.scss";

function RemovePlant({set_show, set_hide, selected}){
    const dispatch = useDispatch();

    const handleSubmit = (event) =>{
        event.preventDefault();
        set_hide();
        dispatch(setEmptyMode({tile_index: selected.index}));
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