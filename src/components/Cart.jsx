import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { useContext } from "react";
import { currencyFormatter } from "../util/format";
import UserProressContext from "../store/UserProgress";
import Button from "./UI/Button";
import CartItem from "./CartItem";
export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProressContext);
  const cartTotalPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);
  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "modal"}
      onClose={
        userProgressCtx.progress === "modal" ? userProgressCtx.hideModal : null
      }
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onAdd={() => cartCtx.addItem(item)}
            onRemove={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={userProgressCtx.hideModal}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={userProgressCtx.showCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
