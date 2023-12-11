import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Table } from "reactstrap";
import { Alert, Spinner } from "reactstrap";
import {
  fetchProductsList,
  deleteProductAdmin,
  createProductAdmin,
} from "../../actions/productActions";
import types from "../../actions/types";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';


const ProductList = ({ history, match }) => {
  const pageNumber = Number(match.params.page) || 1;

  const currentUser = useSelector((state) => state.currentUser);
  const { userInfo } = currentUser;

  const productList = useSelector((state) => state.productList);
  const { products, loading, error, totalPages, page } = productList;

  const deleteProduct = useSelector((state) => state.deleteProduct);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteProduct;

  const createProduct = useSelector((state) => state.createProduct);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = createProduct;

  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProductAdmin(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProductAdmin());
  };

  const handlePagination = (selectedPageNumber) => {
    history.push(`/admin/productlist/page/${selectedPageNumber}`);
    dispatch(fetchProductsList(selectedPageNumber));
  };

  useEffect(() => {
    dispatch({
      type: types.PRODUCT_CREATE_RESET,
    });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(fetchProductsList(pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i} active={i === page}>
          <PaginationLink onClick={() => handlePagination(i)} className={
              i === page
                ? "bg-success border-0 text-warning rounded-5 mx-2"
                : "bg-danger border-0 text-warning rounded-5 mx-2"
            }>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };
  return (
    <div>
      <Container>
        {loading ? (
          <div className="d-flex align-items-center justify-content-center mt-5 p-5">
            <Spinner color="success">Loading...</Spinner>
          </div>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <div className="d-flex align-items-center justify-content-center gap-5 my-4 title py-4 rounded-2">
              <h2 className="fw-bold text-light">Products</h2>

              {loadingCreate ? (
                <div className="d-flex align-items-center justify-content-center mt-5 p-5">
                  <Spinner color="success">Loading...</Spinner>
                </div>
              ) : (
                <Button
                  className="order-page border-0 text-success"
                  onClick={createProductHandler}
                >
                  + Add Product
                </Button>
              )}
            </div>
            {errorDelete && <Alert severity="error">{errorDelete}</Alert>}
            {errorCreate && <Alert severity="error">{errorCreate}</Alert>}
            <>
              <Table responsive hover>
                <thead>
                  <tr className="table-warning">
                    <th className="text-center" component="th" scope="row">
                      <strong>ID</strong>
                    </th>
                    <th className="text-center" align="center">
                      <strong>NAME</strong>
                    </th>
                  
                    <th className="text-center" align="center">
                      <strong>PRICE</strong>
                    </th>
                    <th className="text-center" align="center">
                      <strong>CATEGORY</strong>
                    </th>
                    <th className="text-center" align="center">
                      <strong>STOCK</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="table-success">
                      <th className="fw-normal text-center">{product._id}</th> 
                      <th className="fw-normal text-center">{product.name}</th>
                      
                      <th className="fw-normal text-center">${product.price}</th>
                      <th className="fw-normal text-center">{product.category}</th>
                      <th className="fw-normal text-center">{product.countInStock}</th>
                      <th className="fw-normal pt-0">
                        <Button
                          onClick={() => {
                            history.push(`/admin/product/${product._id}/edit`);
                          }}
                          className="bg-transparent border-0 fs-5 text-success"
                        >
                        <FaEdit/>
                        </Button>
                        {loadingDelete ? (
                          <></>
                        ) : (
                          <Button onClick={() => deleteHandler(product._id)}
                          className="bg-transparent border-0 mx-2 fs-6 text-danger"
                          >
                            <FaTrash />
                          </Button>
                        )}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>

            <Container className="d-flex align-items-center justify-content-center">
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
    </div>
  );
};

export default ProductList;
