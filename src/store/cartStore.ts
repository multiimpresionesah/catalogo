import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductVariant } from '@/types';

// Unique key for a cart item: productId + optional variantId
function itemKey(productId: string, variantId?: string) {
  return variantId ? `${productId}::${variantId}` : productId;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  searchQuery: string;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addToCart: (product: Product, quantity: number, image: string, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
  setSearchQuery: (query: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      searchQuery: '',

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      setSearchQuery: (query) => set({ searchQuery: query }),

      addToCart: (product, quantity, image, variant) => {
        set((state) => {
          const key = itemKey(product.id, variant?.id);
          const existing = state.items.find(
            (item) => itemKey(item.product.id, item.variant?.id) === key
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                itemKey(item.product.id, item.variant?.id) === key
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isDrawerOpen: true,
            };
          }
          return {
            items: [...state.items, { product, quantity, image, variant }],
            isDrawerOpen: true,
          };
        });
      },

      removeFromCart: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => itemKey(item.product.id, item.variant?.id) !== itemKey(productId, variantId)
          ),
        }));
      },

      updateQuantity: (productId, quantity, variantId) => {
        const key = itemKey(productId, variantId);
        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter(
              (item) => itemKey(item.product.id, item.variant?.id) !== key
            ),
          }));
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            itemKey(item.product.id, item.variant?.id) === key ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => {
          const price = item.variant ? item.variant.price : item.product.price;
          return sum + price * item.quantity;
        }, 0);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      // Only persist items, not UI state
      partialize: (state) => ({ items: state.items }),
    }
  )
);
