"use client";

import { useState } from "react";
import { AlertTriangle, TrendingUp, TrendingDown, Info, Package, Calendar, Plus, X, Edit2 } from "lucide-react";
import { useStore, Product } from "@/store/useStore";

export default function InventoryPage() {
  const products = useStore((state) => state.products);
  const addProduct = useStore((state) => state.addProduct);
  const updateStock = useStore((state) => state.updateStock);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [stockToAdd, setStockToAdd] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    category: "Ingredientes" as any,
    price: 0,
    stock: 0,
    unit: "g",
    avgConsumption: 100,
    isIngredient: true
  });

  const getStatusColor = (stock: number, avg: number) => {
    const daysLeft = Math.floor(stock / (avg || 1));
    if (daysLeft < 4) return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
    if (daysLeft < 8) return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800";
    if (daysLeft < 16) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
    return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(formData);
    setIsModalOpen(false);
    setFormData({
      name: "",
      category: "Ingredientes",
      price: 0,
      stock: 0,
      unit: "g",
      avgConsumption: 100,
      isIngredient: true
    });
  };

  const handleSaveStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct) {
      updateStock(selectedProduct.id, stockToAdd);
    }
    setIsStockModalOpen(false);
    setSelectedProduct(null);
    setStockToAdd(0);
  };

  const openStockModal = (product: Product) => {
    setSelectedProduct(product);
    setStockToAdd(0);
    setIsStockModalOpen(true);
  };

  const displayProducts = products.filter(p => p.category !== "Acesso");

  return (
    <main className="p-8 max-w-7xl mx-auto w-full relative h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estoque & Previsão Inteligente</h1>
          <p className="text-muted-foreground mt-1">
            Controle de inventário e previsão de fim de estoque baseada em IA e consumo médio.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
            <Plus className="w-5 h-5" />
            Novo Produto
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center sticky top-0 backdrop-blur-md z-10">
          <h2 className="font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Previsão de Término (Dias Restantes)
          </h2>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> &gt; 15 dias</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> 8-15 dias</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground"><div className="w-2 h-2 rounded-full bg-orange-500"></div> 4-7 dias</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground"><div className="w-2 h-2 rounded-full bg-red-500"></div> &lt; 4 dias</div>
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground bg-muted/10">
                <th className="p-4 font-semibold">Produto</th>
                <th className="p-4 font-semibold">Estoque Atual</th>
                <th className="p-4 font-semibold">Consumo Médio/Dia</th>
                <th className="p-4 font-semibold">Previsão (Dias)</th>
                <th className="p-4 font-semibold">Data Fim</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayProducts.map((item) => {
                const daysLeft = Math.floor(item.stock / (item.avgConsumption || 1));
                
                let statusText = "Confortável";
                if (daysLeft < 4) statusText = "Crítico";
                else if (daysLeft < 8) statusText = "Atenção";
                else if (daysLeft < 16) statusText = "Normal";

                const endDate = new Date();
                endDate.setDate(endDate.getDate() + daysLeft);

                return (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4 font-mono font-bold text-primary">{item.stock.toLocaleString()} {item.unit}</td>
                    <td className="p-4 text-muted-foreground font-mono">{item.avgConsumption} {item.unit}</td>
                    <td className="p-4 font-bold">{daysLeft} dias</td>
                    <td className="p-4">{endDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.stock, item.avgConsumption)}`}>
                        {statusText}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => openStockModal(item)} className="p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors" title="Lançar Estoque">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Adicionar Produto */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-md border border-border rounded-2xl shadow-2xl flex flex-col">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-xl font-bold">Novo Produto / Ingrediente</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-secondary rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Nome do Produto</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Categoria</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})} className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none">
                    <option value="Ingredientes">Ingrediente</option>
                    <option value="Bebidas">Bebida</option>
                    <option value="Adicionais">Adicional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Preço de Venda (R$)</label>
                  <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} required className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Estoque Inicial</label>
                  <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} required className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Unidade</label>
                  <select value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none">
                    <option value="g">gramas</option>
                    <option value="ml">ml</option>
                    <option value="un">unid</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Consumo Médio Diário ({formData.unit})</label>
                <input type="number" value={formData.avgConsumption} onChange={e => setFormData({...formData, avgConsumption: parseInt(e.target.value)})} required className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 rounded-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Lançar Estoque */}
      {isStockModalOpen && selectedProduct && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-sm border border-border rounded-2xl shadow-2xl flex flex-col">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-xl font-bold">Lançar Estoque</h2>
              <button onClick={() => setIsStockModalOpen(false)} className="p-2 hover:bg-secondary rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveStock} className="p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Produto selecionado:</p>
                <p className="font-bold text-lg">{selectedProduct.name}</p>
                <p className="text-sm font-mono mt-1 text-primary">Atual: {selectedProduct.stock} {selectedProduct.unit}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Quantidade a Adicionar ({selectedProduct.unit})</label>
                <input type="number" value={stockToAdd} onChange={e => setStockToAdd(parseInt(e.target.value))} required className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none text-lg font-bold" />
                <p className="text-xs text-muted-foreground mt-2">Dica: Use valores negativos para perdas.</p>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsStockModalOpen(false)} className="flex-1 px-4 py-2 rounded-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors">
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
