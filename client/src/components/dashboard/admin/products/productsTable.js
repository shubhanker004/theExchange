import Rect from 'react';
import { Table, Pagination, Modal, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import Loader from 'utils/loader';

import './productsTable.css'

const ProductsTable = ({prods, prev, next, gotoEdit, removeModal, handleClose, handleModal, handleRemove}) => {

  const goToPrevPage = (page) => {
    prev(page)
  }

  const goToNextPage = (page) => {
    next(page)
  }

  return (
    <>
      
      {prods && prods.docs ? (
        <>
        <div className="tableBoundary">
          <Table striped bordered hover responsive="md">
            <thead style={{textAlign:"center"}}>
              <tr>
                <th>Created</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Flavor</th>
                <th>Price</th>
                <th>Available</th>
              </tr>
            </thead>

            <tbody style={{textAlign:"center"}}>
              {prods.docs.map((item) => (
                <tr key={item._id}>
                  <td>
                    <Moment to={item.date}></Moment>
                  </td>
                  <td>{item.brand.name}</td>
                  <td>{item.model}</td>
                  <td>{item.flavor}</td>
                  <td>{item.price}</td>
                  <td>{item.available}</td>
                  <td
                    className="action_btn remove_btn"
                    onClick={() => handleModal(item._id)}
                  >
                    Remove
                  </td>
                  <td
                    className="action_btn edit_btn"
                    onClick={() => gotoEdit(item._id)}
                  >
                    Edit
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
        </div> 
        <Pagination style={{marginTop:"30px"}}>
            {prods.hasPrevPage ? (
              <>
                <Pagination.Prev variant='dark' onClick={() => goToPrevPage(prods.prevPage)} />
                <Pagination.Item variant='dark' onClick={() => goToPrevPage(prods.prevPage)}>
                  {prods.prevPage}
                </Pagination.Item>
              </>
            ) : null}
            <Pagination.Item active variant='dark'>{prods.page}</Pagination.Item>
            {prods.hasNextPage ? (
              <>
                <Pagination.Item onClick={() => goToNextPage(prods.nextPage)}>
                  {prods.nextPage}
                </Pagination.Item>
                <Pagination.Next onClick={() => goToNextPage(prods.nextPage)} />
              </>
            ) : null}
          </Pagination>
        </>
      ) : (
        <Loader />
      )}

      <Modal show={removeModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to remove this item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This activity can not be undone!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close this window
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductsTable;