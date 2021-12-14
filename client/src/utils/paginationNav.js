import React from "react";
import { Pagination, Button } from "react-bootstrap";

// import './paginationNav.css';

const PaginationNav = ({ prods, prev, next, resetSearch }) => {
  const goToPrevPage = (page) => {
    prev(page);
  };

  const goToNextPage = (page) => {
    next(page);
  };

  return (
    <>
      {prods.docs.length > 0 ? (
        <Pagination>
          {prods.hasPrevPage ? (
            <>
              <Pagination.Prev onClick={() => goToPrevPage(prods.prevPage)} />
              <Pagination.Item onClick={() => goToPrevPage(prods.prevPage)}>
                {prods.prevPage}
              </Pagination.Item>
            </>
          ) : null}
          <Pagination.Item active> {prods.page} </Pagination.Item>
          {prods.hasNextPage ? (
            <>
              <Pagination.Item onClick={() => goToNextPage(prods.nextPage)}>
                {prods.nextPage}
              </Pagination.Item>
              <Pagination.Next onClick={() => goToPrevPage(prods.nextPage)} />
            </>
          ) : null}
        </Pagination>
      ) : (
        <div>
          <div style={{align:"center"}}><h3>No item matched your search!</h3></div>
          <Button className="mt-3" variant="dark" onClick={resetSearch}>
            Reset Search
          </Button>
        </div>
      )}
    </>
  );
};

export default PaginationNav;
