"use client";

import { useState } from "react";
import { Search, UserPlus, ArrowRight, UserCheck } from "lucide-react";

export default function CheckinPage() {
  const [search, setSearch] = useState("");

  const recentVisitors = [
    { id: 1, name: "Maria Santos", time: "09:45", type: "Consumo", status: "Recorrente" },
    { id: 2, name: "João Pereira", time: "09:30", type: "Consumo", status: "Novo" },
    { id: 3, name: "Ana Clara", time: "09:15", type: "Retirada", status: "Recorrente" },
  ];

  return (
    <main className="p-8 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Check-in Rápido</h1>
          <p className="text-muted-foreground mt-1">
            Registre a entrada de clientes ou visitantes instantaneamente.
          </p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <UserPlus className="w-5 h-5" />
          Visitante Não Cadastrado
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm p-8 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
          <input
            type="text"
            placeholder="Pesquisar por nome, telefone, CPF ou Código..."
            className="w-full bg-background border border-input rounded-xl pl-14 pr-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>
        <button className="bg-foreground text-background px-8 py-4 rounded-xl font-bold text-lg hover:bg-foreground/90 transition-colors shrink-0">
          Pesquisar
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-primary" />
            Últimos Check-ins
          </h2>
          <div className="bg-card border border-border rounded-xl shadow-sm divide-y divide-border">
            {recentVisitors.map((visitor) => (
              <div key={visitor.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-semibold">{visitor.name}</p>
                  <p className="text-sm text-muted-foreground">{visitor.time} • {visitor.type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    visitor.status === 'Novo' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  }`}>
                    {visitor.status}
                  </span>
                  <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-secondary/50 border border-border rounded-xl p-6 h-full flex flex-col items-center justify-center text-center">
            <div className="bg-background p-4 rounded-full mb-4 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <path d="M22 6l-10 7L2 6"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Check-in por QR Code</h3>
            <p className="text-muted-foreground text-sm max-w-[250px]">
              Posicione o leitor sobre o código do cliente ou utilize a câmera do tablet.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
