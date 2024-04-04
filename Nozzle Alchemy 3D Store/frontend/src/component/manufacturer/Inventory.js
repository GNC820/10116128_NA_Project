import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Badge, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setDataInventory } from "../../redux/inventorySlice";
import axios from "axios";
import toast from "react-hot-toast";
const Inventory = () => {
  const dispatch = useDispatch();

  const fetchInventory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/inventory`
      );

      dispatch(setDataInventory(response.data.data));
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };


  const initialInventory = useSelector((state) => state.inventory.inventory);
console.log(initialInventory)
  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    setInventory([...initialInventory]);
  }, [initialInventory]);
  
  const colorOptions = [
    { name: "Pink", color: "#FFC0CB" },
    { name: "Black", color: "#0e1111" },
    { name: "White", color: "#FFFFFF" },
    { name: "Light Green", color: "#90EE90" },
    { name: "Orange", color: "#FFA500" },
    { name: "Red", color: "#FF0000" },
    { name: "Blue", color: "#0000FF" },
    { name: "Army Green", color: "#4B5320" },
    { name: "Yellow", color: "#FFFF00" },
    { name: "Beige", color: "#F5F5DC" },
    { name: "Gray", color: "#808080" },
    { name: "Purple", color: "#800080" },
  ];

  const [inventory, setInventory] = useState([]);
  const handleCellEdit = (index, field, value) => {
    const updatedInventory = [...inventory];

    updatedInventory[index] = {
      ...updatedInventory[index],
      [field]: value,
    };

    setInventory(updatedInventory);
  };

  const saveInventory = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/inventory/edit`,
        inventory
      )
      .then((response) => {
        dispatch(setDataInventory(response.data.data));
        toast("Updating inventory done");
        fetchInventory();
      })
      .catch((error) => {
        console.error("Error updating inventory:", error);
        toast("Error updating inventory:", error);
      });
  };

  return (
    <div>
      <Row className="justify-content-end">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Colour</th>
              <th>Amount Left In Grams</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {inventory?.map((item, index) => (
              <tr key={index}>
                <td>
                  <Form.Select
                    value={item.colour}
                    style={{
                      backgroundColor: colorOptions.find(
                        (color, idx) => color.name === item.colour
                      )?.color,
                    }}
                    onChange={(e) =>
                      handleCellEdit(index, "colour", e.target.value)
                    }
                  >
                    {colorOptions.map((color, idx) => (
                      <option
                        key={idx}
                        value={color.name}
                        style={{ backgroundColor: "white" }}
                      >
                        <span
                          style={{
                            color:
                              color.name === item.colour ? "white" : "black",
                          }}
                        >
                          {color.name}
                        </span>
                      </option>
                    ))}
                  </Form.Select>
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.amountLeftInGrams}
                    onChange={(e) =>
                      handleCellEdit(
                        index,
                        "amountLeftInGrams",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={item.notes}
                    onChange={(e) =>
                      handleCellEdit(index, "notes", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Col xs="auto" style={{ paddingBottom: "10px" }}>
          <Button variant="dark" onClick={saveInventory}>
            Save
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Inventory;
