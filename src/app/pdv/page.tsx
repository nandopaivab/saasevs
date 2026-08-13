"use client";

import { useState } from "react";
import { Search, ShoppingCart, Plus, Minus, X, CreditCard, Banknote, QrCode, Trash2, Coffee, Milk } from "lucide-react";
import { useStore, Product, CartItem } from "@/store/useStore";

export default function PDVPage() {
  const products = useStore((state) => state.products);
  const checkout = useStore((state) => state.checkout);
  const customers = useStore((state) => state.customers);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Customer Selection State
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // Customization Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [flavor1, setFlavor1] = useState<Product | null>(null);
  const [flavor2, setFlavor2] = useState<Product | null>(null);
  const [milk, setMilk] = useState<Product | null>(null);

  const displayProducts = products.filter(p => !p.isIngredient && p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const flavors = products.filter(p => p.category === "Ingredientes" && p.name.includes("Pó") && !p.name.includes("Leite"));
  const milks = products.filter(p => p.category === "Ingredientes" && p.name.includes("Leite"));

  const handleProductClick = (product: Product) => {
    if (product.category === "Acesso") {
      setSelectedProduct(product);
      setFlavor1(null);
      setFlavor2(null);
      setMilk(milks.find(m => m.name.includes("Nutrev")) || null);
    } else {
      addToCart({
        id: Date.now().toString(),
        product,
        quantity: 1
      });
    }
  };

  const confirmCustomization = () => {
    if (!selectedProduct || !flavor1 || !milk) return;
    
    addToCart({
      id: Date.now().toString(),
      product: selectedProduct,
      quantity: 1,
      customization: {
        flavor1,
        flavor2: flavor2 || undefined,
        milkType: milk
      }
    });
    
    setSelectedProduct(null);
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    checkout(cart);
    alert("Venda finalizada com sucesso!");
    setCart([]);
  };

  return (
    <main className="flex h-screen overflow-hidden relative">
      {/* Catálogo de Produtos */}
      <div className="flex-1 p-6 flex flex-col bg-muted/20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Ponto de Venda</h1>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background border border-input rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["Todos", "Acesso", "Bebidas", "Adicionais"].map(cat => (
            <button key={cat} className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium whitespace-nowrap hover:border-primary transition-colors">
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pr-2 pb-20">
          {displayProducts.map(product => (
            <button 
              key={product.id} 
              onClick={() => handleProductClick(product)}
              className={`bg-card border border-border hover:border-primary hover:shadow-md transition-all rounded-xl p-4 text-left flex flex-col h-32 justify-between ${product.category === 'Acesso' ? 'ring-2 ring-primary bg-primary/5' : ''}`}
            >
              <div>
                <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">{product.category}</span>
                <h3 className="font-bold text-lg leading-tight mt-1">{product.name}</h3>
              </div>
              <p className="text-primary font-bold text-lg">
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Carrinho / Resumo da Venda */}
      <div className="w-96 bg-card border-l border-border flex flex-col shadow-xl z-10">
        <div className="p-4 border-b border-border">
          <div 
            onClick={() => setIsCustomerModalOpen(true)}
            className="bg-secondary/50 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-secondary transition-colors"
          >
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">Cliente Selecionado</p>
              <p className="font-bold">{selectedCustomer ? selectedCustomer.name : 'Cliente Avulso'}</p>
            </div>
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col gap-2 border-b border-border pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{item.product.name}</h4>
                  <p className="text-primary font-medium text-sm">
                    {item.product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              {item.customization && (
                <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  <p>• {item.customization.flavor1?.name} {item.customization.flavor2 ? `+ ${item.customization.flavor2.name}` : ''}</p>
                  <p>• {item.customization.milkType?.name}</p>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 bg-secondary rounded-lg p-1 w-fit self-end mt-1">
                <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-background rounded-md transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="font-semibold w-6 text-center text-sm">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-background rounded-md transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
          
          {cart.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mb-2 opacity-20" />
              <p>Carrinho vazio</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border bg-muted/10">
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className="flex justify-between font-bold text-2xl pt-2 border-t border-border mt-2">
              <span>Total</span>
              <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          </div>

          <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground font-bold text-lg py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            Finalizar Venda
          </button>
        </div>
      </div>

      {/* Modal Selecionar Cliente */}
      {isCustomerModalOpen && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-md border border-border rounded-2xl shadow-2xl flex flex-col h-[60vh]">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-xl font-bold">Selecionar Cliente</h2>
              <button onClick={() => setIsCustomerModalOpen(false)} className="p-2 hover:bg-secondary rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 border-b border-border bg-muted/20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar cliente..."
                  value={customerSearchTerm}
                  onChange={(e) => setCustomerSearchTerm(e.target.value)}
                  className="w-full bg-background border border-input rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <button 
                onClick={() => { setSelectedCustomer(null); setIsCustomerModalOpen(false); }}
                className="w-full p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 text-left transition-colors flex justify-between items-center"
              >
                <span className="font-bold">Cliente Avulso</span>
                {!selectedCustomer && <span className="text-primary text-sm font-bold">Selecionado</span>}
              </button>
              {customers.filter(c => c.name.toLowerCase().includes(customerSearchTerm.toLowerCase())).map(customer => (
                <button 
                  key={customer.id}
                  onClick={() => { setSelectedCustomer(customer); setIsCustomerModalOpen(false); }}
                  className="w-full p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 text-left transition-colors flex justify-between items-center"
                >
                  <div>
                    <span className="font-bold block">{customer.name}</span>
                    <span className="text-xs text-muted-foreground">{customer.phone}</span>
                  </div>
                  {selectedCustomer?.id === customer.id && <span className="text-primary text-sm font-bold">Selecionado</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Customização de Acesso */}
      {selectedProduct && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-2xl border border-border rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <p className="text-muted-foreground">Personalize as opções do cliente</p>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-secondary rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-8 flex-1">
              
              {/* Leite */}
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-3"><Milk className="w-5 h-5 text-blue-500"/> Tipo de Leite</h3>
                <div className="grid grid-cols-2 gap-3">
                  {milks.map(m => (
                    <button 
                      key={m.id}
                      onClick={() => setMilk(m)}
                      className={`p-3 rounded-xl border font-medium text-sm transition-all ${milk?.id === m.id ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sabor 1 */}
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-3"><Coffee className="w-5 h-5 text-amber-600"/> Sabor 1 (Obrigatório)</h3>
                <div className="grid grid-cols-3 gap-3">
                  {flavors.map(f => (
                    <button 
                      key={f.id}
                      onClick={() => setFlavor1(f)}
                      className={`p-3 rounded-xl border font-medium text-sm transition-all ${flavor1?.id === f.id ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}
                    >
                      {f.name.replace('Pó ', '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sabor 2 */}
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-3"><Coffee className="w-5 h-5 text-amber-600"/> Sabor 2 (Opcional - Misto)</h3>
                <div className="grid grid-cols-3 gap-3">
                   <button 
                      onClick={() => setFlavor2(null)}
                      className={`p-3 rounded-xl border font-medium text-sm transition-all ${flavor2 === null ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}
                    >
                      Sem 2º Sabor
                    </button>
                  {flavors.filter(f => f.id !== flavor1?.id).map(f => (
                    <button 
                      key={f.id}
                      onClick={() => setFlavor2(f)}
                      className={`p-3 rounded-xl border font-medium text-sm transition-all ${flavor2?.id === f.id ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}
                    >
                      {f.name.replace('Pó ', '')}
                    </button>
                  ))}
                </div>
              </div>

            </div>
            
            <div className="p-6 border-t border-border bg-muted/20 flex justify-end gap-3">
              <button onClick={() => setSelectedProduct(null)} className="px-6 py-2 rounded-lg font-medium hover:bg-secondary transition-colors">
                Cancelar
              </button>
              <button 
                onClick={confirmCustomization} 
                disabled={!flavor1 || !milk}
                className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg disabled:opacity-50 hover:bg-primary/90 transition-colors"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
