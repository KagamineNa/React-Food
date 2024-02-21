import { currencyFormatter } from "../util/format";

export default function CartItem({ item, onAdd, onRemove }) {
  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onRemove}>-</button>
        <span>{item.quantity}</span>
        <button onClick={onAdd}>+</button>
      </p>
    </li>
  );
}
