import { deleteUser } from '../store';
import { useDispatch } from 'react-redux';


import Modal from 'react-bootstrap/Modal';

function ModalPage({ id, setShowPopUp, showPopup }) {
  const dispatch = useDispatch()
  const handleDelete = (user) => {

    dispatch(deleteUser(user))
    setShowPopUp(false)
  }
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'fixed' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton onClick={() => { setShowPopUp(false) }}>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Do You Really Want to Delete?</p>
        </Modal.Body>

        <Modal.Footer>
          <button type="button" className="btn btn-success" onClick={() => { setShowPopUp(false) }}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={() => [handleDelete(id)]}>Yes</button>

        </Modal.Footer>
      </Modal.Dialog>
    </div>



  );
}





// <div
//   className="modal show"
//   style={{ display: 'block', position: 'initial' }}
// >
//   <Modal.Dialog>
//     <Modal.Header closeButton>
//       <Modal.Title>Delete</Modal.Title>
//     </Modal.Header>

//     <Modal.Body>
//       <p>Do You Really Want to Delete?</p>
//     </Modal.Body>

//     <Modal.Footer>
//       <button type="button" className="btn btn-success" onClick={() => { setShowPopUp(false) }}>Cancel</button>
//       <button type="button" className="btn btn-danger" onClick={() => [handleDelete(id)]}>Yes</button>

//     </Modal.Footer>
//   </Modal.Dialog>
// </div>
;





export default ModalPage;
