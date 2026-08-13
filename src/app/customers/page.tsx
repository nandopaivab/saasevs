"use client";

import { useState } from "react";
import { Search, UserPlus, Filter, MoreVertical, Edit2, Trash2, X, Star, Clock } from "lucide-react";
import { useStore, Customer } from "@/store/useStore";

export default function CustomersPage() {
  const customers = useStore(state => state.customers);
  const addCustomer = useStore(state => state.addCustomer);
  const updateCustomer = useStore(state => state.updateCustomer);
  const deleteCustomer = useStore(state => state.deleteCustomer);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm)
  );

  const openModal = (customer?: Customer) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData({ name: customer.name, phone: customer.phone, email: customer.email || "" });
    } else {
      setEditingCustomer(null);
      setFormData({ name: "", phone: "", email: "" });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
    } else {
      addCustomer({
        ...formData,
        status: "Ativo",
        lastVisit: new Date().toLocaleDateString('pt-BR'),
        totalVisits: 0
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      deleteCustomer(id);
    }
  };

  return (
    <main className="p-8 max-w-7xl mx-auto w-full relative h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Clientes</h1>
          <p className="text-muted-foreground mt-1">
            CRM completo. Visualize o histórico e gerencie sua base.
          </p>
        </div>
        <button onClick={() => openModal()} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <UserPlus className="w-5 h-5" />
          Novo Cliente
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground mb-1">Total de Clientes</p>
          <p className="text-2xl font-bold">{customers.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground mb-1">Ativos (30 dias)</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{customers.filter(c => c.status === "Ativo").length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground mb-1">Inativos (+15 dias)</p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{customers.filter(c => c.status === "Inativo").length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground mb-1">Taxa de Retenção</p>
          <p className="text-2xl font-bold text-primary">85%</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-[calc(100vh-350px)]">
        <div className="p-4 border-b border-border flex justify-between items-center gap-4 bg-muted/10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou telefone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground bg-muted/30 sticky top-0 backdrop-blur-md">
                <th className="p-4 font-semibold">Cliente</th>
                <th className="p-4 font-semibold">Contato</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-center">Visitas</th>
                <th className="p-4 font-semibold">Última Visita</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="p-4">
                    <p className="font-semibold">{customer.name}</p>
                    <p className="text-xs text-muted-foreground">{customer.email}</p>
                  </td>
                  <td className="p-4 font-mono text-sm">{customer.phone}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${
                      customer.status === 'Ativo' 
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                        : 'bg-red-100 text-red-800 border-red-200'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-4 text-center font-bold">{customer.totalVisits}</td>
                  <td className="p-4 text-sm">{customer.lastVisit}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openModal(customer)} className="p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(customer.id)} className="p-2 text-muted-foreground hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-md border border-border rounded-2xl shadow-2xl flex flex-col">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingCustomer ? 'Editar Cliente' : 'Novo Cliente'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-secondary rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Nome Completo</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Telefone / WhatsApp</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  required
                  className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">E-mail</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" 
                />
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
    </main>
  );
}
