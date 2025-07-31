import { useCartItems } from "../hooks/useCartItems"
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {

    const {
        items,
        total,
        handleAddItemsCart,
        deleteItemsCart,
    } = useCartItems();

    return (
        <CartContext.Provider value={
            {
                items,
                total,
                handleAddItemsCart,
                deleteItemsCart,
            }
        }>
            {children}
        </CartContext.Provider>
    )
}