import React, { useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import Moment from "react-moment";

const HistoryBlock = ({ history }) => {
  const [showModal, setShowModal] = useState(false);
  const [showProduct, setShowProduct] = useState(0);

  const handleModal = (i) => {
    setShowProduct(i);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div style={{ width: "75vw", overflow: "auto", textAlign:"center" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Order ID</th>
              <th>Products</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, i) => (
              <tr key={item.transactionId}>
                <td>
                  <Moment format="MMMM Do, YYYY">{item.date}</Moment>
                </td>
                <td>{item.orderID}</td>
                <td onClick={() => handleModal(i)}>
                  <btn
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    See Product List
                  </btn>
                </td>
                <td><strong>{`$${item.amount}`}</strong></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Items Bought</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{textAlign:"center"}}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {history[showProduct] ? history[showProduct].items.map((article, i) => (
                  <tr>
                    <td>
                      <div key={showProduct}>{article.name}</div>
                    </td>
                    <td>
                      <div key={showProduct}>{article.quantity}</div>
                    </td>
                    <td>
                      <div key={showProduct}><strong style={{fontWeight:"500"}}>{`$${article.unit_amount.value}`}</strong></div>
                    </td>
                    <td>
                      <div key={showProduct}>
                        <strong>{`$${article.quantity * article.unit_amount.value}`}</strong>
                      </div>
                    </td>
                  </tr>
                )):null}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HistoryBlock;
