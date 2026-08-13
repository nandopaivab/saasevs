"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Building, Shield, User, Save, Plus, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"unidade" | "perfil" | "usuarios">("unidade");

  return (
    <main className="p-8 max-w-5xl mx-auto w-full relative h-screen overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie as preferências da sua unidade EVS e controle de acessos.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab("unidade")}
            className={`w-full flex items-center gap-3 px-4 py-3 font-medium rounded-lg text-left transition-colors ${activeTab === 'unidade' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50'}`}
          >
            <Building className="w-5 h-5" />
            Dados da Unidade
          </button>
          <button 
            onClick={() => setActiveTab("perfil")}
            className={`w-full flex items-center gap-3 px-4 py-3 font-medium rounded-lg text-left transition-colors ${activeTab === 'perfil' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50'}`}
          >
            <User className="w-5 h-5" />
            Meu Perfil
          </button>
          <button 
            onClick={() => setActiveTab("usuarios")}
            className={`w-full flex items-center gap-3 px-4 py-3 font-medium rounded-lg text-left transition-colors ${activeTab === 'usuarios' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50'}`}
          >
            <Shield className="w-5 h-5" />
            Usuários e Permissões
          </button>
        </div>

        <div className="col-span-2">
          
          {activeTab === "unidade" && (
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
                  <button onClick={() => alert("Alterações salvas!")} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <Save className="w-4 h-4"/> Salvar Alterações
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "perfil" && (
            <div className="bg-card border border-border rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Meu Perfil
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                    AD
                  </div>
                  <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                    Alterar Foto
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Nome Completo</label>
                  <input type="text" defaultValue="Admin Principal" className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">E-mail de Acesso</label>
                  <input type="email" defaultValue="admin@evs.com" disabled className="w-full bg-muted/50 border border-input rounded-lg px-4 py-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground mt-1">O e-mail de acesso não pode ser alterado.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Nova Senha</label>
                  <input type="password" placeholder="Deixe em branco para não alterar" className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>

                <div className="pt-4 border-t border-border mt-6">
                  <button onClick={() => alert("Perfil atualizado!")} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <Save className="w-4 h-4"/> Salvar Perfil
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "usuarios" && (
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Usuários e Permissões
                </h2>
                <button className="flex items-center gap-2 text-sm font-medium bg-secondary px-3 py-1.5 rounded-lg hover:bg-secondary/80 transition-colors">
                  <Plus className="w-4 h-4" /> Novo Usuário
                </button>
              </div>
              
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground bg-muted/10">
                    <th className="p-4 font-semibold">Usuário</th>
                    <th className="p-4 font-semibold">Nível de Acesso</th>
                    <th className="p-4 font-semibold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <p className="font-bold">Admin Principal</p>
                      <p className="text-sm text-muted-foreground">admin@evs.com</p>
                    </td>
                    <td className="p-4">
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full font-semibold border border-emerald-200">Administrador</span>
                    </td>
                    <td className="p-4 text-right">
                      {/* Cannot delete admin */}
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <p className="font-bold">Carlos Operador</p>
                      <p className="text-sm text-muted-foreground">carlos@evs.com</p>
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold border border-blue-200">Gerente</span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 text-muted-foreground hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
