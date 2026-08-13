"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { Lock, User } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useStore((state) => state.login);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      login();
      router.push("/");
    } else {
      alert("Credenciais inválidas. Tente admin / admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 w-full absolute top-0 left-0 z-50">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 pb-6 text-center border-b border-border bg-muted/20">
          <div className="mx-auto bg-primary w-16 h-16 flex items-center justify-center rounded-xl shadow-lg mb-4">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">EVS Gestão</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Faça login para acessar o sistema
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Usuário</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-background border border-input rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Senha</label>
              <a href="#" className="text-xs text-primary font-medium hover:underline">Esqueceu a senha?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin"
                className="w-full bg-background border border-input rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-colors shadow-md flex justify-center items-center gap-2"
          >
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
}
