import { Activity, Users, ShoppingCart, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Visão geral do seu Espaço Vida Saudável.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Visitantes Hoje</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">82</div>
            <p className="text-xs text-muted-foreground">+12% em relação a ontem</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Shakes Consumidos</h3>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">74</div>
            <p className="text-xs text-muted-foreground">+4% em relação a ontem</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Faturamento</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">R$ 1.485,00</div>
            <p className="text-xs text-muted-foreground">+R$ 200 desde ontem</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Ticket Médio</h3>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">R$ 20,07</div>
            <p className="text-xs text-muted-foreground">Estável</p>
          </div>
        </div>
      </div>
    </main>
  );
}
