"use client";

import { AlertTriangle, TrendingUp, TrendingDown, Info, Package, Calendar } from "lucide-react";

export default function InventoryPage() {
  const inventory = [
    { id: 1, name: "Morango", stock: 3300, avgConsumption: 442, unit: "g", status: "orange", daysLeft: 7, date: "19/08" },
    { id: 2, name: "Chocolate", stock: 8200, avgConsumption: 390, unit: "g", status: "green", daysLeft: 21, date: "02/09" },
    { id: 3, name: "Baunilha", stock: 2100, avgConsumption: 350, unit: "g", status: "orange", daysLeft: 6, date: "18/08" },
    { id: 4, name: "Cookies", stock: 900, avgConsumption: 240, unit: "g", status: "red", daysLeft: 3, date: "15/08" },
    { id: 5, name: "Protein Powder", stock: 1200, avgConsumption: 150, unit: "g", status: "yellow", daysLeft: 8, date: "20/08" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "green": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
      case "yellow": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "orange": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800";
      case "red": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
      default: return "bg-secondary text-foreground";
    }
  };

  return (
    <main className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estoque & Previsão Inteligente</h1>
          <p className="text-muted-foreground mt-1">
            Controle de inventário e previsão de fim de estoque baseada em IA e consumo médio.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2">
          <Package className="w-5 h-5" />
          Gerar Pedido Sugerido
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Alerts */}
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl p-6 col-span-2">
          <div className="flex gap-4">
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full h-fit">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="font-bold text-red-800 dark:text-red-300 text-lg mb-1">Atenção! Ruptura de Estoque Iminente</h3>
              <p className="text-red-700 dark:text-red-400 text-sm mb-4">
                O sabor <strong>Cookies</strong> vai acabar em aproximadamente 3 dias (15/08).
              </p>
              <div className="bg-white dark:bg-card border border-red-100 dark:border-red-900/50 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Sugestão de Compra</p>
                  <p className="font-bold text-lg">Comprar 15 potes (Cookies)</p>
                  <p className="text-xs text-muted-foreground">Para garantir 30 dias de estoque alvo.</p>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Insight */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            Tendência de Consumo
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Chocolate</span>
                <span className="text-emerald-500 font-bold">+30%</span>
              </div>
              <p className="text-xs text-muted-foreground">156 shakes nesta semana vs 120 na anterior.</p>
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Baunilha</span>
                <span className="text-red-500 font-bold">-12%</span>
              </div>
              <p className="text-xs text-muted-foreground">Queda leve identificada. Ajustando previsão.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
          <h2 className="font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Previsão de Término (Dias Restantes)
          </h2>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> > 15 dias</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> 8-15 dias</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground"><div className="w-2 h-2 rounded-full bg-orange-500"></div> 4-7 dias</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground"><div className="w-2 h-2 rounded-full bg-red-500"></div> < 4 dias</div>
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground bg-muted/10">
              <th className="p-4 font-semibold">Produto</th>
              <th className="p-4 font-semibold">Estoque Atual</th>
              <th className="p-4 font-semibold">Consumo Médio/Dia</th>
              <th className="p-4 font-semibold">Previsão (Dias)</th>
              <th className="p-4 font-semibold">Data Fim</th>
              <th className="p-4 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4 font-mono">{item.stock.toLocaleString()} {item.unit}</td>
                <td className="p-4 text-muted-foreground font-mono">{item.avgConsumption} {item.unit}</td>
                <td className="p-4 font-bold">{item.daysLeft} dias</td>
                <td className="p-4">{item.date}</td>
                <td className="p-4 text-right">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                    {item.status === 'red' ? 'Crítico' : item.status === 'orange' ? 'Atenção' : item.status === 'yellow' ? 'Normal' : 'Confortável'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
