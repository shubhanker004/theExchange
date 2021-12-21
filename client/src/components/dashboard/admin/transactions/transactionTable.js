import React, { useState } from "react";
import { Table, Pagination, Modal, Button } from "react-bootstrap";
import Moment from "react-moment";
import Loader from "utils/loader";

// import './productsTable.css'

const TransactionTable = ({ trans, prev, next }) => {
  const [showModal, setShowModal] = useState(false);
  const [showProduct, setShowProduct] = useState(0);

  const goToPrevPage = (page) => {
    prev(page);
  };

  const goToNextPage = (page) => {
    next(page);
  };

  const handleModal = (i) => {
    setShowProduct(i);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {trans.docs ? (
        <>
          <div className="tableBoundary">
            <Table striped bordered hover responsive="md">
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Order Id</th>
                  <th>Products</th>
                  <th>Amount</th>
                  <th>Email</th>
                  <th>Verified</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>

              <tbody style={{ textAlign: "center" }}>
                {trans.docs.map((item, i) => (
                  <tr key={item._id}>
                    <td>
                      <Moment format="MMMM Do, YYYY">{item.date}</Moment>
                    </td>
                    <td>
                      {item.userName}
                    </td>
                    <td>
                      {item.orderID}
                    </td>
                    <td onClick={() => handleModal(i)}>
                      <btn
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        See Product List
                      </btn>
                    </td>
                    <td>
                      <strong>{`$${item.orderData[0].amount.value}`}</strong>
                    </td>
                    <td>{item.userEmail}</td>
                    <td>{item.userVerified ? "Yes" : "No"}</td>
                    <td>{item.userPhone}</td>
                    <td>{item.userAddress}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Pagination style={{ marginTop: "30px", marginLeft:"3rem" }}>
            {trans.hasPrevPage ? (
              <>
                <Pagination.Prev
                  variant="dark"
                  onClick={() => goToPrevPage(trans.prevPage)}
                />
                <Pagination.Item
                  variant="dark"
                  onClick={() => goToPrevPage(trans.prevPage)}
                >
                  {trans.prevPage}
                </Pagination.Item>
              </>
            ) : null}
            <Pagination.Item active variant="dark">
              {trans.page}
            </Pagination.Item>
            {trans.hasNextPage ? (
              <>
                <Pagination.Item onClick={() => goToNextPage(trans.nextPage)}>
                  {trans.nextPage}
                </Pagination.Item>
                <Pagination.Next onClick={() => goToNextPage(trans.nextPage)} />
              </>
            ) : null}
          </Pagination>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Items Bought</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ textAlign: "center" }}>
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
                    {trans.docs && trans.docs[showProduct] ? trans.docs[showProduct].orderData[0].items.map((article, i) => (
                      <tr>
                        <td>
                          <div key={showProduct}>{article.name}</div>
                        </td>
                        <td>
                          <div key={showProduct}>{article.quantity}</div>
                        </td>
                        <td>
                          <div key={showProduct}>
                            <strong
                              style={{ fontWeight: "500" }}
                            >{`$${article.unit_amount.value}`}</strong>
                          </div>
                        </td>
                        <td>
                          <div key={showProduct}>
                            <strong>{`$${
                              article.quantity * article.unit_amount.value
                            }`}</strong>
                          </div>
                        </td>
                      </tr>
                    )):
                    null}
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
      ) : (
        <Loader />
      )}
    </>
  );
};

export default TransactionTable;
