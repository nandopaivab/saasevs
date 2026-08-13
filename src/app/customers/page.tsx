"use client";

import { Users, Search, Plus, Star, Clock } from "lucide-react";

export default function CustomersPage() {
  const customers = [
    { id: 1, name: "Maria Santos", phone: "(11) 98765-4321", visits: 42, lastVisit: "Hoje", avgFreq: "2,8 dias", status: "Recorrente", fav: "Morango" },
    { id: 2, name: "João Pereira", phone: "(11) 91234-5678", visits: 1, lastVisit: "Hoje", avgFreq: "-", status: "Novo", fav: "Chocolate" },
    { id: 3, name: "Ana Clara", phone: "(11) 99988-7766", visits: 15, lastVisit: "16 dias atrás", avgFreq: "5 dias", status: "Em Risco", fav: "Baunilha" },
    { id: 4, name: "Carlos Eduardo", phone: "(11) 97777-6666", visits: 120, lastVisit: "Ontem", avgFreq: "1,5 dias", status: "Recorrente", fav: "Cookies" },
  ];

  return (
    <main className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes (CRM)</h1>
          <p className="text-muted-foreground mt-1">
            Gestão de clientes, histórico de visitas e retenção.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Novo Cliente
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nome, telefone ou CPF..."
            className="w-full bg-card border border-input rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
        </div>
        <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-medium border border-border shadow-sm">
          Filtrar
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground mb-1">Total de Clientes</p>
          <p className="text-2xl font-bold">1.284</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground mb-1">Ativos (30 dias)</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">842</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground mb-1">Inativos (+15 dias)</p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">156</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground mb-1">Taxa de Retenção</p>
          <p className="text-2xl font-bold text-primary">85%</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground bg-muted/10">
              <th className="p-4 font-semibold">Nome / Contato</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-center">Visitas</th>
              <th className="p-4 font-semibold">Última Visita</th>
              <th className="p-4 font-semibold">Freq. Média</th>
              <th className="p-4 font-semibold">Favorito</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-muted/30 transition-colors cursor-pointer">
                <td className="p-4">
                  <p className="font-bold text-foreground">{customer.name}</p>
                  <p className="text-sm text-muted-foreground">{customer.phone}</p>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                    customer.status === 'Recorrente' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' :
                    customer.status === 'Novo' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' :
                    'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="p-4 text-center font-bold">{customer.visits}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5 text-sm">
                    <Clock className={`w-4 h-4 ${customer.lastVisit.includes('atrás') ? 'text-orange-500' : 'text-muted-foreground'}`} />
                    <span className={customer.lastVisit.includes('atrás') ? 'text-orange-600 dark:text-orange-400 font-medium' : ''}>
                      {customer.lastVisit}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-sm font-medium">{customer.avgFreq}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5 text-sm">
                    <Star className="w-4 h-4 text-amber-500" />
                    {customer.fav}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
