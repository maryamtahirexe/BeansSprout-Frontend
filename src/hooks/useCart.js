import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  selectCartIsOpen,
  addToCart,
  removeFromCart,
  increment,
  decrement,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
} from '../features/cart/cartSlice';
import toast from 'react-hot-toast';

export function useCart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  const isOpen = useSelector(selectCartIsOpen);

  const add = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart! 🛒`, { icon: '🌸' });
  };

  const remove = (id) => dispatch(removeFromCart(id));
  const inc = (id) => dispatch(increment(id));
  const dec = (id) => dispatch(decrement(id));
  const clear = () => dispatch(clearCart());
  const open = () => dispatch(openCart());
  const close = () => dispatch(closeCart());
  const toggle = () => dispatch(toggleCart());

  return {
    items,
    count,
    total,
    isOpen,
    add,
    remove,
    increment: inc,
    decrement: dec,
    clear,
    open,
    close,
    toggle,
  };
}
