"use client";

import { BarChart, Wallet, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function FinancePage() {
  return (
    <main className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
          <p className="text-muted-foreground mt-1">
            Gestão de fluxo de caixa, receitas e despesas.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Nova Despesa
          </button>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Nova Receita
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-muted-foreground">Saldo do Caixa</p>
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">R$ 2.450,00</p>
          <p className="text-xs text-muted-foreground mt-1">Atualizado agora</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-muted-foreground">Receitas (Mês)</p>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-bold">R$ 14.850,00</p>
          <p className="text-xs text-emerald-500 font-medium mt-1">+12% vs mês passado</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-muted-foreground">Despesas (Mês)</p>
            <TrendingDown className="w-5 h-5 text-destructive" />
          </div>
          <p className="text-3xl font-bold">R$ 4.230,00</p>
          <p className="text-xs text-muted-foreground mt-1">Dentro da meta</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-muted-foreground">Lucro Bruto Est.</p>
            <DollarSign className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-bold">R$ 10.620,00</p>
          <p className="text-xs text-muted-foreground mt-1">Margem de 71%</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm p-8 flex flex-col items-center justify-center text-center h-64">
        <BarChart className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
        <h3 className="font-semibold text-xl mb-2">Gráficos em Desenvolvimento</h3>
        <p className="text-muted-foreground max-w-md">
          O módulo de DRE e gráficos avançados de fluxo de caixa será implementado após a integração com o banco de dados Supabase.
        </p>
      </div>
    </main>
  );
}
