import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

export type CartItem = {
    id: number | string;
    name: string;
    slug: string;
    price: number;
    image: string;
    unit: string;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
    updateQuantity: (id: CartItem["id"], quantity: number) => void;
    removeFromCart: (id: CartItem["id"]) => void;
    cartCount: number;
    subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem("freshora-cart");
            if (saved) setItems(JSON.parse(saved) as CartItem[]);
        } catch {
            localStorage.removeItem("freshora-cart");
        }
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (hydrated) {
            localStorage.setItem("freshora-cart", JSON.stringify(items));
        }
    }, [items, hydrated]);

    function addToCart(
        product: Omit<CartItem, "quantity">,
        quantity = 1
    ) {
        setItems((current) => {
            const existing = current.find((item) => item.id === product.id);

            if (existing) {
                return current.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...current, { ...product, quantity }];
        });
        setIsCartOpen(true);
    }

    function updateQuantity(id: CartItem["id"], quantity: number) {
        if (quantity < 1) {
            setItems((current) => current.filter((item) => item.id !== id));
            return;
        }

        setItems((current) =>
            current.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    }

    function removeFromCart(id: CartItem["id"]) {
        setItems((current) => current.filter((item) => item.id !== id));
    }

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                isCartOpen,
                openCart: () => setIsCartOpen(true),
                closeCart: () => setIsCartOpen(false),
                addToCart,
                updateQuantity,
                removeFromCart,
                cartCount,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
}
