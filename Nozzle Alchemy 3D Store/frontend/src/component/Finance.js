import React from "react";
import { useState, useEffect } from "react";
import { Table, Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecords, addNewRecord } from "../redux/financeSlice";
import toast from "react-hot-toast";
const Finance = () => {
  const dispatch = useDispatch();
  const { records, isLoading, error } = useSelector((state) => state.finance);
  const userData = useSelector((state) => state.user);
  const [newRecord, setNewRecord] = useState({
    startDate: "",
    endDate: "",
    amount: 0,
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchRecords());
  }, [dispatch]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAddRecord = () => {
    setNewRecord({ startDate: "", endDate: "", amount: 0 }); // Clear input fields
    setShowModal(true);
  };

  const handleSaveRecord = async () => {
    try {
      setShowModal(false);
      dispatch(addNewRecord(newRecord));

      toast("Record added");
    } catch (error) {
      console.error("Error saving record:", error);
      toast("Failed to save record");
    }
  };

  return (
    <div>

      <Row>
        <Col >
     
        </Col>
        <Col xs="auto" className="my-2">
        {
        (userData.accountType === "Admin") && (
          <Button variant="dark" onClick={handleAddRecord} >Add Record</Button>
        )
        }
        
        </Col>
      </Row>

      
      
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.startDate}</td>
              <td>{record.endDate}</td>
              <td>{record.amount} $</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label className="font-weight-bold"><strong>Start Date</strong></Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={newRecord.startDate}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, startDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label><strong>End Date</strong></Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={newRecord.endDate}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, endDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label><strong>Amount</strong></Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={newRecord.amount}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, amount: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleSaveRecord}>
            Save Record
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Finance;
