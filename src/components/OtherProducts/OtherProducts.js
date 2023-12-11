import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle,Spinner, Button,Container } from "reactstrap";
import { GiCoffeeCup } from "react-icons/gi";
import Stars from "../Stars/index";

const OtherProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://chego-store-be.onrender.com/api/products?page=${page}`);
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, [page]);

  return (
    <div>
      {error ? (
        <p>Error fetching products: {error}</p>
      ) : (
        <>
          
          <Container className="d-flex align-items-center justify-content-center flex-wrap gap-3 ">
          {products.length ===0 ? <Spinner color='success'></Spinner> :<>
            {products.map(product => (
              <Link to={`/product/${product._id}`} key={product._id} className="bg-success my-5">
              <Card
                style={{
                  width: "18rem",
                  height: "300px",
                  padding: "5px",
                }}
                className="card border-0"
              >
                <img
                  src={`https://chego-store-be.onrender.com${product.image}`}
                  alt={product.name}
                  height="150px"
                  className="rounded-top"
                />
      
                <CardBody className=" bg rounded-bottom p-0">
                  <CardTitle>
                    <h6 className="text-success mt-3 text-center text-success rounded-2 m-2">
                      {product.name}
                    </h6>
                  </CardTitle>
                  {/* <h6 className="text-success mt-3 text-center mb-2">price : $ {product.price}</h6> */}
                  <div className=" text-center rating">
                    <Stars rating={product.rating} />
                  </div>
      
                  <Button className="category rounded-right rounded-0 title border-0 text-center fw-bolder">
                    {product.category === "coffee" && (
                      <GiCoffeeCup className="rating-icon fs-5 text-center" />
                    )}
                    {product.category === "tea" && (
                      <i className="fa-solid fa-mug-hot fs-6 mx-1 text-center"></i>
                    )}
                    {product.category === "juice" && (
                      <i className="fa-solid fa-martini-glass-citrus fs-6 mx-1 text-center"></i>
                    )}
                    {product.category === "milk" && (
                      <i className="fa-solid fa-mug-saucer fs-6 mx-1 text-center"></i>
                    )}
                    {product.category}
                  </Button>
      
                  <h6 className="text-center buy-now mb-4">
                    <span className="text-success p-2 px-5 rounded-5 order-page">
                      Buy Now
                    </span>
                  </h6>
                </CardBody>
              </Card>
            </Link>
            ))}
            </>}
          </Container>
          <div className='d-flex align-items-center justify-content-center flex-wrap mt-2 mb-5'>
            <button
            className='title p-2 rounded-2 border-0 text-light mx-3'
              onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
              disabled={page === 1}
            >
              Previous Page
            </button>
            <span>Page <span className='bg-light px-2 py-1 rounded-5 text-warning'>{page}</span> of {totalPages} </span>
            <button
              className='title p-2 mx-3 rounded-2 border-0 text-light'
              onClick={() => setPage(prevPage => Math.min(prevPage + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OtherProducts;
