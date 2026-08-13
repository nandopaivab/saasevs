import { create } from 'zustand'

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  avgConsumption: number;
}

export type Visitor = {
  id: number;
  name: string;
  time: string;
  type: string;
  status: string;
}

interface AppState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  
  revenue: number;
  visitorsToday: number;
  shakesConsumed: number;
  
  products: Product[];
  recentVisitors: Visitor[];
  
  checkout: (cartItems: {id: number, qty: number, price: number}[]) => void;
  addVisitor: (name: string, type: string, status: string) => void;
}

export const useStore = create<AppState>((set) => ({
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  
  revenue: 1485,
  visitorsToday: 82,
  shakesConsumed: 74,
  
  products: [
    { id: 1, name: "Shake Morango", category: "Shakes", price: 20, stock: 3300, unit: "g", avgConsumption: 442 },
    { id: 2, name: "Shake Chocolate", category: "Shakes", price: 20, stock: 8200, unit: "g", avgConsumption: 390 },
    { id: 3, name: "Shake Baunilha", category: "Shakes", price: 20, stock: 2100, unit: "g", avgConsumption: 350 },
    { id: 4, name: "Chá", category: "Bebidas", price: 10, stock: 1500, unit: "g", avgConsumption: 200 },
    { id: 5, name: "Aloe", category: "Bebidas", price: 10, stock: 1200, unit: "ml", avgConsumption: 150 },
    { id: 6, name: "Protein Powder", category: "Adicionais", price: 5, stock: 1200, unit: "g", avgConsumption: 150 },
    { id: 7, name: "Cookies", category: "Adicionais", price: 5, stock: 900, unit: "g", avgConsumption: 240 },
  ],
  
  recentVisitors: [
    { id: 1, name: "Maria Santos", time: "09:45", type: "Consumo", status: "Recorrente" },
    { id: 2, name: "João Pereira", time: "09:30", type: "Consumo", status: "Novo" },
    { id: 3, name: "Ana Clara", time: "09:15", type: "Retirada", status: "Recorrente" },
  ],
  
  checkout: (cartItems) => set((state) => {
    let newRevenue = state.revenue;
    let newShakes = state.shakesConsumed;
    let newProducts = [...state.products];
    
    cartItems.forEach(item => {
      newRevenue += (item.price * item.qty);
      
      const productIndex = newProducts.findIndex(p => p.id === item.id);
      if (productIndex !== -1) {
        // If it's a shake, increase shake count and deduct 26g per shake
        if (newProducts[productIndex].category === "Shakes") {
          newShakes += item.qty;
          newProducts[productIndex].stock -= (26 * item.qty);
        } else {
          // Other products (just deduct 10g or ml as a mock amount)
          newProducts[productIndex].stock -= (10 * item.qty);
        }
      }
    });
    
    return {
      revenue: newRevenue,
      shakesConsumed: newShakes,
      products: newProducts
    };
  }),

  addVisitor: (name, type, status) => set((state) => {
    const newVisitor = {
      id: Date.now(),
      name,
      type,
      status,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    return {
      visitorsToday: state.visitorsToday + 1,
      recentVisitors: [newVisitor, ...state.recentVisitors]
    };
  })
}))
