import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Alert, Spinner } from "reactstrap";
import Product from "../../components/Product";
import { fetchProductsList } from "../../actions/productActions";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import GenreSelector from "../../components/GenreSelector";
import Banner from "../../components/Banner/Banner";

function HomePage({ match, history }) {
  const pageNumber = Number(match.params.page) || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, totalPages } = productList;

  useEffect(() => {
    dispatch(fetchProductsList(pageNumber));
  }, [dispatch, pageNumber]);

  const handlePagination = (v) => {
    history.push(`/page/${v}`);
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i} active={i === page}>
          <PaginationLink
            onClick={() => handlePagination(i)}
            className={
              i === page
                ? "bg-success border-0 text-warning rounded-5 mx-2"
                : " border-0 text-warning rounded-5 mx-2"
            }
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <>
    <Banner/>
      <Container className="p-5">
        <GenreSelector />
        {loading ? (
          <Container>
            <Row>
              <Col lg='12' className="d-flex align-items-center justify-content-center">
              <Spinner className="text-success text-center mt-5">Loading...</Spinner>
              </Col>
            </Row>
          
          </Container>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <Container>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} className="mb-3">
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </Container>
            <Container className="d-flex align-items-center justify-content-center rounded-2 mt-3 w-100 title p-3">
              <Pagination>
                <PaginationItem disabled={page === 1}>
                  <PaginationLink
                    previous
                    onClick={() => handlePagination(page - 1)}
                  />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem disabled={page === totalPages}>
                  <PaginationLink
                    next
                    onClick={() => handlePagination(page + 1)}
                  />
                </PaginationItem>
              </Pagination>
            </Container>
          </>
        )}
      </Container>
    </>
  );
}

export default HomePage;
