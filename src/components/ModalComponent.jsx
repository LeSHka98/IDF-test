import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useSelector} from 'react-redux'
import Table from 'react-bootstrap/Table';

function ModalComponent({showModal, setShowModal}) {
  const {firstName, lastName, sex, birthday, ocean, hobby} = useSelector(state => state.personalinfo)

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Personal Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>First name</td>
                <td>{firstName}</td>
              </tr>
              <tr>
                <td>Last name</td>
                <td>{lastName}</td>
              </tr>
              <tr>
                <td>Sex</td>
                <td>{sex}</td>
              </tr>
              <tr>
                <td>Birthday</td>
                <td>{birthday}</td>
              </tr>
              <tr>
                <td>Ocean</td>
                <td>{ocean}</td>
              </tr>
              <tr>
                <td>Hobby</td>
                <td>{hobby.join(' ')}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;