import React from "react";
import { Container } from "reactstrap";
import Stars from "../Stars/index";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { GiCoffeeCup } from "react-icons/gi";

function Product({ product }) {
  return (
    <Container className="d-flex align-items-center justify-content-center flex-wrap ">
      <Link to={`/product/${product._id}`} className="bg-success my-5">
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
    </Container>
  );
}

export default Product;
