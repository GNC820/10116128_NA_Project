import React, { useState } from "react";

import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { Modal, Button, Form } from 'react-bootstrap';
import { BsCloudUpload } from 'react-icons/bs';
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {addPortofolio, setDataPortofolio} from '../redux/portofolioSlice'

const PortofolioModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
 

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUpload = async () => {
    const userData =
      user.firstName !== "" && user.lastName
        ? user.firstName + " " + user.lastName
        : "Anonymous";
    const fetchData = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/portofolio/add`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ image, addedBy: userData, title }),
      }
    );
    const data = await fetchData.json();
    dispatch(addPortofolio({...data}))

    if (data.statusCode === 500) {
      toast("Error!");
      return;
    }

    toast('Image added');


    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/portofolio`);
      const resData = await res.json();
      
      dispatch(setDataPortofolio([...resData]));
    })();


    setImage(null);
    setTitle("");

    onClose();
  };

  const handleOnClose = () => {
    onClose();
    setImage(null);
    setTitle("");
  }

  const uploadImage = async (e) => {
    const image = await ImagetoBase64(e.target.files[0]);
    setImage(image);
  };

  return (
    <Modal show={isOpen} onHide={handleOnClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>Add to Portofolio</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="title">
          <Form.Control type="text" value={title} onChange={handleTitleChange} placeholder="Enter title" />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
            {image ? (
              <img src={image} width='200px'  alt="Uploaded" />
            ) : (
              <BsCloudUpload size={50} />
            )}
            <Form.Control type="file" accept="image/*" onChange={uploadImage} className="hidden" />
          </div>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="dark" onClick={handleUpload}>
        Upload
      </Button>
      <Button variant="secondary" onClick={handleOnClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  );
};

export default PortofolioModal;
