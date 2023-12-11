import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduct,
  createProductReview,
} from "../../actions/productActions";
import types from "../../actions/types";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Form,
  FormFeedback,
  Modal,
  ModalBody,
  Button,
  Alert,
  Spinner,
} from "reactstrap";
import { FaStar } from "react-icons/fa";
import Stars from "../../components/Stars/index";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import OtherProducts from "../../components/OtherProducts/OtherProducts";


function Product({ match, history }) {
  const quantity = 1;
  const [open, setOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(5);
  const [reviewValue, setReviewValue] = useState("");

  const [activeTab, setActiveTab] = useState("other products");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const dispatch = useDispatch();
  // const navigate = useNavigate()

  const currentProduct = useSelector((state) => state.currentProduct);
  const { product, loading, error } = currentProduct;

  const currentUser = useSelector((state) => state.currentUser);
  const { userInfo } = currentUser;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successReview, error: errorReview } = productReviewCreate;

  useEffect(() => {
    if (successReview) {
      // alert('Thanks for your review');
      setRatingValue(5);
      setReviewValue("");
      dispatch({ type: types.PRODUCT_CREATE_REVIEW_RESET });
      setOpen(false);
    }

    dispatch(fetchProduct(match.params.id));
  }, [dispatch, match, successReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${quantity}`);
  };

  const submitReviewHandler = () => {
    dispatch(
      createProductReview(match.params.id, {
        rating: ratingValue,
        comment: reviewValue,
      })
    );
    setTimeout(() => {
      history.push(`/product/${match.params.id}`);
    }, 1500);
  };

  //to control the add-review modal
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxwidth={"lg"}>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center mt-5 pt-5">
          <Spinner color="success">Loading...</Spinner>
        </div>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Container className="pt-5">
            <Row>
              <Col lg="6">
                <img
                  className="details-img rounded-2 mb-3"
                  src={`https://chego-store-be.onrender.com${product.image}`}
                  alt={product.name}
                />
              </Col>
              <Col lg="6" className="p-3">
                <h2 className="fw-bold ">{product.name}</h2>
                <h6 className="text-muted"> {product.ingredients}</h6>
                <Stars rating={product.rating} />

                {/* <h6 className="text-muted">Category: {product.category}</h6> */}

                <h6 className="desc mt-4 mb-4">{product.description}</h6>
                <div className="d-flex align-items-center mt-4 mb-3 justify-content-center gap-1 flex-wrap">
                  <h6 className="bg-success text-light text-center py-3 rounded-5 w-25">
                    healthy
                  </h6>
                  <h6 className="bg-success text-light text-center py-3 rounded-5 w-25">
                    hygienic
                  </h6>
                  <h6 className="bg-success text-light text-center px-5 py-3 rounded-5">
                    fastest delivery
                  </h6>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <h6 className="my-3 mx-1">
                    Price:
                    <span className="text-dark fw-bold fs-5 mx-3 rounded-2 px-2 mx-2">
                      {`$ ${product.price && product.price.toFixed(2)}`}{" "}
                    </span>
                  </h6>
                  <h6 className=" rounded-5 p-2 bg-light w-25 text-center text stock">
                    {`${product.countInStock ? "In Stock" : "Out of stock"}`}
                  </h6>
                </div>
                <div>
                  <Button
                    className="title border-0 text-white w-100 p-3"
                    disabled={product.countInStock ? false : true}
                    onClick={() => {
                      addToCartHandler();
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>

          <Container>
            <Row>
              <Col lg="12" className="order-page mb-5">
                <div>
                  <Nav tabs className="border-0 d-flex align-items-center justify-content-center flex-wrap mt-5">
                    <NavItem>
                      <NavLink
                        className={
                          activeTab === "customer reviews"
                            ? "text-light title border-0 px-5 my-2 rounded-5 "
                            : "text-success"
                        }
                        onClick={() => toggleTab("customer reviews")}
                      >
                        customer reviews
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={
                          activeTab === "other products"
                            ? "text-light title border-0 px-5 rounded-5 "
                            : " text-success text-center mt-1"
                        }
                        onClick={() => toggleTab("other products")}
                      >
                        other products
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="customer reviews" className="p-3">
                      <>
                      {userInfo && (
                          <div style={{ marginTop: "12px" }} className="d-flex align-items-center justify-content-center flex-wrap">
                            <Button
                              className="stock text rounded-5 mb-3 bg-light"
                              onClick={handleOpen}
                            >
                              + Add your review
                            </Button>
                            <Modal isOpen={open} toggle={handleClose}>
                              <ModalBody>
                                <h3>Write a review</h3>
                                {errorReview && (
                                  <Alert color="danger">{errorReview}</Alert>
                                )}
                                {successReview && (
                                  <Alert color="success">
                                    Thanks for your review
                                  </Alert>
                                )}
                                <Form>
                                  <FormGroup>
                                    <Label for="rating">Rating</Label>
                                    <div className="d-flex align-items-center">
                                      {[...Array(ratingValue)].map((_, i) => (
                                        <FaStar
                                          key={i}
                                          size={18}
                                          color="#ffc107"
                                          onClick={() => setRatingValue(i + 1)}
                                          style={{ cursor: "pointer" }}
                                        />
                                      ))}
                                    </div>
                                    <FormFeedback invalid>
                                      Please select a rating.
                                    </FormFeedback>
                                  </FormGroup>
                                  <FormGroup>
                                    <Label for="review">Review</Label>
                                    <Input
                                      type="textarea"
                                      name="review"
                                      id="review"
                                      placeholder="Write your review here"
                                      value={reviewValue}
                                      onChange={(e) =>
                                        setReviewValue(e.target.value)
                                      }
                                      invalid={reviewValue.length === 0}
                                    />
                                    <FormFeedback invalid>
                                      Please enter a review.
                                    </FormFeedback>
                                  </FormGroup>
                                  <Button
                                    color="primary"
                                    onClick={submitReviewHandler}
                                    className="mt-2"
                                  >
                                    Submit
                                  </Button>
                                </Form>
                              </ModalBody>
                            </Modal>
                          </div>
                        )}
                        {/* <h5>Customer Reviews</h5> */}
                        {product.reviews.length === 0 && (
                          <Alert color="info" className="w-25">No Reviews</Alert>
                        )}
                        <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">

                      
                        {product.reviews.map((review) => (
                          <div key={review._id} className="mb-3 bg-success p-4 rounded-3 w-25 d-flex align-items-center justify-content-lg-between flex-wrap">
                           <div className="d-flex align-items-center gap-1 my-3">
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="img" className="review-img rounded-5" />
                           <h6 className="text-light">{review.name}</h6>
                            </div> 
                          
                            <div className="d-flex align-items-center mb-2">
                              {[...Array(review.rating)].map((_, i) => (
                                <FaStar key={i} size={18} color="#ffc107" />
                              ))}
                            </div>
                            <h5 className="text-light">{`"${review.comment}"`}
                              </h5>
                          </div>
                        ))}
                         </div>
                      </>
                    </TabPane>
                    <TabPane
                      tabId="other products"
                      className="p-3"
                    >
                   <OtherProducts/>
                    </TabPane>
                  </TabContent>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </Container>
  );
}

export default Product;
