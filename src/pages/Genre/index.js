import { Container, Row, Col, Spinner } from "reactstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../../components/Product";
import GenreSelector from "../../components/GenreSelector";

const GenrePage = ({ match }) => {
  const genre = match.params.genre;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        `https://chego-store-be.onrender.com/api/products/genre/${genre}`
      );
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [match, genre]);

  return (
    <div className="">
      <Container>
      <GenreSelector />
      
        {loading ? (
          <Container>
            <Row>
              <Col
                lg="12"
                className="d-flex align-items-center justify-content-center"
              >
                <Spinner className="text-success text-center mt-5">
                  Loading...
                </Spinner>
              </Col>
            </Row>
          </Container>
        ) : (
          <Container>
          <Row>
            {products.map((product) => (
              <Col key={product._id} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </Container>
        )}
      </Container>
    </div>
  );
};

export default GenrePage;
