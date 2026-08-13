import { create } from 'zustand'

export type Product = {
  id: number;
  name: string;
  category: "Acesso" | "Shakes" | "Bebidas" | "Ingredientes" | "Adicionais" | string;
  price: number;
  stock: number;
  unit: string;
  avgConsumption: number;
  isIngredient?: boolean;
}

export type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  status: string;
  lastVisit: string | null;
  totalVisits: number;
}

export type CartItem = {
  id: string; // unique cart item id
  product: Product;
  quantity: number;
  customization?: {
    tea1?: Product;
    tea2?: Product;
    flavor1?: Product;
    flavor2?: Product;
    milkType?: Product;
  };
}

interface AppState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: () => void;
  logout: () => void;
  
  revenue: number;
  visitorsToday: number;
  shakesConsumed: number;
  
  products: Product[];
  customers: Customer[];
  activeCustomerForSale: Customer | null;
  
  fetchInitialData: () => Promise<void>;
  checkout: (cartItems: CartItem[], customerId?: number) => Promise<void>;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateStock: (id: number, delta: number) => Promise<void>;
  addCustomer: (customer: Omit<Customer, "id">) => Promise<Customer>;
  updateCustomer: (id: number, customer: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: number) => Promise<void>;
  setActiveCustomerForSale: (customer: Customer | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
  isAuthenticated: false,
  isInitialized: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  
  revenue: 0,
  visitorsToday: 0,
  shakesConsumed: 0,
  
  activeCustomerForSale: null,
  
  products: [],
  customers: [],

  fetchInitialData: async () => {
    try {
      const [productsRes, customersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/customers')
      ]);
      const products = await productsRes.json();
      const customers = await customersRes.json();
      
      set({ 
        products: [
          // Keeping the Combo statically available as a pseudo-product if not in DB
          { id: 100, name: "Acesso Completo (2 Chás + Shake)", category: "Acesso", price: 25, stock: 9999, unit: "un", avgConsumption: 0 },
          ...products
        ], 
        customers,
        isInitialized: true
      });
    } catch (e) {
      console.error("Failed to fetch initial data", e);
    }
  },
  
  checkout: async (cartItems, customerId) => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: cartItems, customerId })
      });
      if (res.ok) {
        await get().fetchInitialData(); // reload products to get correct stock
        
        let newRevenue = get().revenue;
        let newVisitors = get().visitorsToday;
        let newShakes = get().shakesConsumed;
        
        cartItems.forEach(item => {
          newRevenue += (item.product.price * item.quantity);
          newVisitors += item.quantity;
          if (item.product.category === "Acesso") {
             newShakes += item.quantity;
          }
        });
        set({ revenue: newRevenue, visitorsToday: newVisitors, shakesConsumed: newShakes });
      }
    } catch (e) {
      console.error("Checkout failed", e);
    }
  },

  addProduct: async (product) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (res.ok) {
        const newProduct = await res.json();
        set((state) => ({ products: [...state.products, newProduct] }));
      }
    } catch (e) {
      console.error("Add product failed", e);
    }
  },

  updateStock: async (id, delta) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateStock', amount: delta })
      });
      if (res.ok) {
        const updated = await res.json();
        set((state) => ({
          products: state.products.map(p => p.id === id ? updated : p)
        }));
      }
    } catch (e) {
      console.error("Update stock failed", e);
    }
  },

  addCustomer: async (customer) => {
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
      });
      if (res.ok) {
        const newCustomer = await res.json();
        set((state) => ({ customers: [newCustomer, ...state.customers] }));
        return newCustomer;
      }
    } catch (e) {
      console.error("Add customer failed", e);
      throw e;
    }
  },

  updateCustomer: async (id, customerData) => {
    try {
      const res = await fetch(`/api/customers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
      });
      if (res.ok) {
        const updated = await res.json();
        set((state) => ({
          customers: state.customers.map(c => c.id === id ? updated : c)
        }));
      }
    } catch (e) {
      console.error("Update customer failed", e);
    }
  },

  deleteCustomer: async (id) => {
    try {
      const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        set((state) => ({
          customers: state.customers.filter(c => c.id !== id)
        }));
      }
    } catch (e) {
      console.error("Delete customer failed", e);
    }
  },
  
  setActiveCustomerForSale: (customer) => set({ activeCustomerForSale: customer }),
}))
