import React from "react";
import { Input } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";

const CartItems = ({ items }) => {
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      {items.map((item,idx) => (
        <div key={idx} className="d-flex align-items-center justify-content-around flex-wrap order-page rounded-2 mb-2 py-3">
          <img
            src={`https://chego-store-be.onrender.com${item.image}`}
            alt={item.name}
            className="table-img"
          />
          <Link to={`/product/${item.product}`}>
            <h5 className="text-center text-success">{item.name}</h5>
          </Link>

          {item.price && <p className="m-0 mb-1 text-success">{`$${item.price}`}</p>}

          <Input
            type="select"
            className="w-25"
            id={item.name}
            name="quantity"
            value={item.qty}
            onChange={(e) =>
              dispatch(addToCart(item.product, Number(e.target.value)))
            }
          >
            <option disabled>Quantity</option>
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Input>

          <i
            className="fas fa-trash text-danger"
            onClick={() => deleteHandler(item.product)}
          ></i>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
