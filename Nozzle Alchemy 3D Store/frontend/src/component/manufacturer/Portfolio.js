import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import PortofolioModal from "../PortofolioModal";
import { setDataPortofolio } from "../../redux/portofolioSlice";
import { MdDelete } from "react-icons/md";
const Portfolio = () => {
  const dispatch = useDispatch();

  const [imageData, setImageData] = useState(null);

  const [selectedFile, setSelectedFile] = useState();
  const user = useSelector((state) => state.user);

  const portofolio = useSelector((state) => state.portofolio.portofolioList);

  const [images, setImages] = useState([portofolio]);
  const [isOpen, setIsOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleOverlayClick = (img) => {
    setImageData(img);
    setShowModal(!showModal);
  };
  const fetchPortofolio = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/portofolio`
      );
      const resData = await res.json();

      dispatch(setDataPortofolio([...resData]));
      setImages([...resData]);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchPortofolio();
  }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    fetchPortofolio();
  };

  const handleDelete = async (id) => {
    try {
      const message = await axios.delete(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/portofolio/${id}`
      );

      toast(message.data.message);
      dispatch(setDataPortofolio(portofolio.filter((item) => item.id !== id)));
      setImages(portofolio.filter((item) => item.id !== id));
    } catch (error) {
      toast(error);
      console.error("Error deleting image:", error);
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="dark" onClick={handleOpenModal}>
          Add Portofolio
        </Button>
      </div>

      <PortofolioModal isOpen={isOpen} onClose={handleCloseModal} />
      {images.length > 0 ? (
        <Row xs={1} md={2} lg={3} sm={1} xl={4}>
          {images.map((image, index) => (
            <Col key={index} className="py-2">
              <Card style={{ width: "18rem", height: "100%" }}>
                <Card.Header>
                  <Card.Title>
                    <Card.Text>{image?.title}</Card.Text>
                  </Card.Title>
                </Card.Header>
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={image?.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => handleOverlayClick(image)}
                  />
                  <Modal show={showModal && image.id === imageData.id} onHide={handleOverlayClick} centered>
                    <Modal.Body>
                      <img
                        src={image?.image}
                        alt={image?.title}
                        style={{
                          width: "100%",
                          maxHeight: "70vh",
                          objectFit: "contain",
                        }}
                      />
                    </Modal.Body>
                  </Modal>
                </div>
                <Card.Body style={{ height: "50%" }}>
                  <Card.Text>
                    <span style={{ fontWeight: "bold" }}>Added by:</span>{" "}
                    {image?.addedBy}
                  </Card.Text>
                </Card.Body>
                {user.accountType === "Admin" && (
                  <Card.Footer>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(image.id)}
                    >
                      <MdDelete size={24} />
                    </Button>
                  </Card.Footer>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No images uploaded yet.</p>
      )}
    </Container>
  );
};
export default Portfolio;
