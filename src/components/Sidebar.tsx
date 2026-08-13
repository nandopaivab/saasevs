"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Users, 
  ShoppingCart, 
  Package, 
  Settings, 
  LogOut, 
  BarChart, 
  CheckCircle 
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Check-in Rápido", href: "/checkin", icon: CheckCircle },
    { name: "PDV & Vendas", href: "/pdv", icon: ShoppingCart },
    { name: "Clientes", href: "/customers", icon: Users },
    { name: "Estoque & Previsão", href: "/inventory", icon: Package },
    { name: "Financeiro", href: "/finance", icon: BarChart },
    { name: "Configurações", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">EVS Gestão</h2>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? "bg-primary text-primary-foreground font-medium" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button className="flex items-center w-full space-x-3 px-4 py-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
