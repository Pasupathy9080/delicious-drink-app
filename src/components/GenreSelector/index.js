import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { TweenMax, Power3 } from "gsap";
import juiceImg from "../../assets/healthy-berry-smoothie-glass-removebg-preview.png"
import milkImg from "../../assets/high-angle-assortment-desserts-with-straws-chocolate-removebg-preview.png"
import teaImg from '../../assets/greeTea.png'
import coffeeImg from "../../assets/hot-chocolate-served-with-cookies-removebg-preview.png"


const GenreSelector = () => {
  const genres = ["coffee", "tea", "juice", "milk"];
  let genreRef = useRef([]);

  useEffect(() => {
    TweenMax.from(genreRef.current, {
      opacity: 0,
      scale: 0,
      stagger: 0.1,
      ease: Power3.easeOut,
      delay: 1,
    });
  }, []);
  return (
    <Container>
      <Row>
        <Col
          lg="12"
          className="d-flex align-items-center justify-content-center title p-5 my-3 rounded-2 flex-wrap gap-5 mb-4"
        >
          {genres.map((genre, index) => (
            <Link
              ref={(el) => (genreRef.current[index] = el)}
              key={genre}
              lg="12"
              className="order-page py-2 px-5 rounded-2 link-genre"
              style={{ textDecoration: "none", cursor: "pointer" }}
              to={`/genre/${genre.split(" ").join("-")}`}
            >
              <div>
                <div>

                  {genre === "juice" && <> <img src={juiceImg} alt='img' className="title genre-img"/>
                  <h5 className="text-success text-center fw-bold">{genre}</h5></>}

                  {genre === "milk" && <> <img src={milkImg} alt='img' className="title genre-img"/>
                  <h5 className="text-success text-center fw-bold">{genre}</h5></>}

                  {genre === "tea" && <> <img src={teaImg} alt='img' className="title genre-img"/>
                  <h5 className="text-success text-center fw-bold">{genre}</h5></>}

                  {genre === "coffee" && <> <img src={coffeeImg} alt='img' className="title genre-img"/>
                  <h5 className="text-success text-center fw-bold">{genre}</h5></>}
                 
                </div>
              </div>
            </Link>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default GenreSelector;
