import { create } from 'zustand'

export type Product = {
  id: number;
  name: string;
  category: "Acesso" | "Shakes" | "Bebidas" | "Ingredientes" | "Adicionais";
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
  email: string;
  status: "Ativo" | "Inativo";
  lastVisit: string;
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
  login: () => void;
  logout: () => void;
  
  revenue: number;
  visitorsToday: number;
  shakesConsumed: number;
  
  products: Product[];
  customers: Customer[];
  activeCustomerForSale: Customer | null;
  
  checkout: (cartItems: CartItem[]) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  updateStock: (id: number, delta: number) => void;
  addCustomer: (customer: Omit<Customer, "id">) => void;
  updateCustomer: (id: number, customer: Partial<Customer>) => void;
  deleteCustomer: (id: number) => void;
  setActiveCustomerForSale: (customer: Customer | null) => void;
}

export const useStore = create<AppState>((set) => ({
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  
  revenue: 1485,
  visitorsToday: 82,
  shakesConsumed: 74,
  
  activeCustomerForSale: null,
  
  products: [
    { id: 100, name: "Acesso Completo (2 Chás + Shake)", category: "Acesso", price: 25, stock: 9999, unit: "un", avgConsumption: 0 },
    
    // Ingredientes (Pós e Leites)
    { id: 1, name: "Pó Morango", category: "Ingredientes", price: 0, stock: 3300, unit: "g", avgConsumption: 442, isIngredient: true },
    { id: 2, name: "Pó Chocolate", category: "Ingredientes", price: 0, stock: 8200, unit: "g", avgConsumption: 390, isIngredient: true },
    { id: 3, name: "Pó Baunilha", category: "Ingredientes", price: 0, stock: 2100, unit: "g", avgConsumption: 350, isIngredient: true },
    { id: 4, name: "Pó Coco", category: "Ingredientes", price: 0, stock: 1500, unit: "g", avgConsumption: 200, isIngredient: true },
    { id: 5, name: "Pó Abacaxi", category: "Ingredientes", price: 0, stock: 1000, unit: "g", avgConsumption: 100, isIngredient: true },
    { id: 6, name: "Protein Powder", category: "Ingredientes", price: 0, stock: 1200, unit: "g", avgConsumption: 150, isIngredient: true },
    { id: 7, name: "Leite Nutrev", category: "Ingredientes", price: 0, stock: 5000, unit: "g", avgConsumption: 500, isIngredient: true },
    { id: 8, name: "Leite Normal", category: "Ingredientes", price: 0, stock: 10000, unit: "ml", avgConsumption: 1000, isIngredient: true },
    
    // Bebidas 
    { id: 9, name: "Chá Verde", category: "Bebidas", price: 5, stock: 1500, unit: "g", avgConsumption: 200, isIngredient: true },
    { id: 10, name: "Chá Preto", category: "Bebidas", price: 5, stock: 1200, unit: "g", avgConsumption: 150, isIngredient: true },
    { id: 11, name: "Aloe", category: "Bebidas", price: 10, stock: 1200, unit: "ml", avgConsumption: 150 },
    
    // Adicionais
    { id: 12, name: "Cookies", category: "Adicionais", price: 5, stock: 900, unit: "g", avgConsumption: 240 },
  ],
  
  customers: [
    { id: 1, name: "Maria Santos", phone: "(11) 98765-4321", email: "maria@email.com", status: "Ativo", lastVisit: "13/08/2026", totalVisits: 42 },
    { id: 2, name: "João Pereira", phone: "(11) 91234-5678", email: "joao@email.com", status: "Ativo", lastVisit: "12/08/2026", totalVisits: 15 },
    { id: 3, name: "Ana Clara", phone: "(11) 99999-8888", email: "ana@email.com", status: "Inativo", lastVisit: "01/07/2026", totalVisits: 5 },
  ],
  
  checkout: (cartItems) => set((state) => {
    let newRevenue = state.revenue;
    let newShakes = state.shakesConsumed;
    let newProducts = [...state.products];
    let newVisitors = state.visitorsToday;
    
    cartItems.forEach(item => {
      newRevenue += (item.product.price * item.quantity);
      newVisitors += item.quantity;
      
      if (item.product.category === "Acesso") {
        newShakes += item.quantity;
        
        // Deduct customized ingredients from stock
        const deduções = [
          { prod: item.customization?.tea1, qty: 5 }, // 5g de chá
          { prod: item.customization?.tea2, qty: 5 },
          { prod: item.customization?.flavor1, qty: 13 }, // 13g por sabor (total 26 se 1 sabor)
          { prod: item.customization?.flavor2, qty: 13 },
          { prod: item.customization?.milkType, qty: item.customization?.milkType?.unit === "ml" ? 250 : 25 } // 250ml ou 25g de nutrev
        ];
        
        deduções.forEach(deducao => {
          if (deducao.prod) {
            const index = newProducts.findIndex(p => p.id === deducao.prod!.id);
            if (index !== -1) {
              newProducts[index].stock -= (deducao.qty * item.quantity);
            }
          }
        });
      } else {
        // Direct product deduction
        const index = newProducts.findIndex(p => p.id === item.product.id);
        if (index !== -1 && !item.product.isIngredient) {
          newProducts[index].stock -= (1 * item.quantity);
        }
      }
    });
    
    return {
      revenue: newRevenue,
      shakesConsumed: newShakes,
      products: newProducts,
      visitorsToday: newVisitors
    };
  }),

  addProduct: (product) => set((state) => ({
    products: [...state.products, { ...product, id: Date.now() }]
  })),

  updateStock: (id, delta) => set((state) => ({
    products: state.products.map(p => p.id === id ? { ...p, stock: p.stock + delta } : p)
  })),

  addCustomer: (customer) => set((state) => ({
    customers: [{ ...customer, id: Date.now() }, ...state.customers]
  })),

  updateCustomer: (id, customerData) => set((state) => ({
    customers: state.customers.map(c => c.id === id ? { ...c, ...customerData } : c)
  })),

  deleteCustomer: (id) => set((state) => ({
    customers: state.customers.filter(c => c.id !== id)
  })),
  
  setActiveCustomerForSale: (customer) => set({ activeCustomerForSale: customer }),
}))
