"use client";

import { useState } from "react";
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, QrCode } from "lucide-react";

export default function PDVPage() {
  const [cart, setCart] = useState([
    { id: 1, name: "Shake Morango", price: 20.00, qty: 1 },
    { id: 2, name: "Chá", price: 10.00, qty: 1 },
  ]);

  const products = [
    { id: 1, name: "Shake Morango", category: "Shakes", price: 20 },
    { id: 2, name: "Shake Chocolate", category: "Shakes", price: 20 },
    { id: 3, name: "Shake Baunilha", category: "Shakes", price: 20 },
    { id: 4, name: "Chá", category: "Bebidas", price: 10 },
    { id: 5, name: "Aloe", category: "Bebidas", price: 10 },
    { id: 6, name: "Protein Powder", category: "Adicionais", price: 5 },
  ];

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <main className="flex h-screen overflow-hidden">
      {/* Catálogo de Produtos */}
      <div className="flex-1 p-6 flex flex-col bg-muted/20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Ponto de Venda</h1>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar produto..."
              className="w-full bg-background border border-input rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["Todos", "Shakes", "Bebidas", "Adicionais", "Produtos Fechados"].map(cat => (
            <button key={cat} className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium whitespace-nowrap hover:border-primary transition-colors">
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pr-2 pb-20">
          {products.map(product => (
            <button key={product.id} className="bg-card border border-border hover:border-primary hover:shadow-md transition-all rounded-xl p-4 text-left flex flex-col h-32 justify-between">
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
          <div className="bg-secondary/50 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-secondary transition-colors">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">Cliente Selecionado</p>
              <p className="font-bold">Maria Santos</p>
            </div>
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{item.name}</h4>
                <p className="text-muted-foreground text-sm">
                  {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
              <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
                <button className="p-1 hover:bg-background rounded-md transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="font-semibold w-4 text-center text-sm">{item.qty}</span>
                <button className="p-1 hover:bg-background rounded-md transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <button className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-border bg-muted/10">
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Desconto</span>
              <span>R$ 0,00</span>
            </div>
            <div className="flex justify-between font-bold text-2xl pt-2 border-t border-border mt-2">
              <span>Total</span>
              <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl hover:border-primary transition-colors">
              <QrCode className="w-6 h-6 text-emerald-500" />
              <span className="text-xs font-semibold">PIX</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl hover:border-primary transition-colors">
              <CreditCard className="w-6 h-6 text-blue-500" />
              <span className="text-xs font-semibold">Cartão</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl hover:border-primary transition-colors">
              <Banknote className="w-6 h-6 text-amber-500" />
              <span className="text-xs font-semibold">Dinheiro</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl hover:border-primary transition-colors">
              <Plus className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs font-semibold">Múltiplo</span>
            </button>
          </div>

          <button className="w-full bg-primary text-primary-foreground font-bold text-lg py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            Finalizar Venda
          </button>
        </div>
      </div>
    </main>
  );
}
