"use client";

import { Settings as SettingsIcon, Building, Shield, User } from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="p-8 max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie as preferências da sua unidade EVS e controle de acessos.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-secondary text-foreground font-medium rounded-lg text-left transition-colors">
            <Building className="w-5 h-5" />
            Dados da Unidade
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-secondary/50 font-medium rounded-lg text-left transition-colors">
            <User className="w-5 h-5" />
            Meu Perfil
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-secondary/50 font-medium rounded-lg text-left transition-colors">
            <Shield className="w-5 h-5" />
            Usuários e Permissões
          </button>
        </div>

        <div className="col-span-2">
          <div className="bg-card border border-border rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" />
              Informações do Espaço
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Nome do EVS</label>
                <input type="text" defaultValue="Espaço Vida Saudável Centro" className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Telefone / WhatsApp</label>
                  <input type="text" defaultValue="(11) 99999-9999" className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Estoque Alvo (Dias)</label>
                  <input type="number" defaultValue="30" className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
              </div>

              <div className="pt-4 border-t border-border mt-6">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
