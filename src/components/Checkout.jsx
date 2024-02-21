import { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/format";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProressContext from "../store/UserProgress";
import useHttp from "./hooks/useHttp";
import Error from "./Error.jsx";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProressContext);
  const cartTotalPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearItem();
    clearData();
  }

  let action = (
    <>
      <Button textOnly type="button" onClick={userProgressCtx.hideCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending) action = <span>Sending order data...</span>;
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={userProgressCtx.hideCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>Check out</h2>
        <p>Total Price: {currencyFormatter.format(cartTotalPrice)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        {error && <Error title="Failed to submit" message={error} />}
        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
}
