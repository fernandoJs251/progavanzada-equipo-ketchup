import React, { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  Package, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  AlertTriangle, 
  DollarSign, 
  ArrowUpRight, 
  Sparkles,
  Layers,
  Box
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { salesService } from '../../services/salesService';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { products, alerts } = useProducts();
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    salesService.getDashboardMetrics().then(setMetrics);
  }, []);

  const lowStockCount = alerts.filter(a => !a.resuelto).length;

  const kpis = [
    {
      title: 'Total Productos',
      value: products.length > 0 ? products.length : (metrics?.totalProductsCount || 45),
      change: '+3 nuevos',
      icon: Package,
      color: 'from-blue-600 to-indigo-600',
      path: '/admin/productos'
    },
    {
      title: 'Ventas del Mes',
      value: metrics?.totalSalesCount || 128,
      change: '+18.4% vs mes anterior',
      icon: TrendingUp,
      color: 'from-emerald-600 to-teal-600',
      path: '/admin/ventas'
    },
    {
      title: 'Clientes Registrados',
      value: metrics?.activeClientsCount || 67,
      change: '+8 esta semana',
      icon: Users,
      color: 'from-purple-600 to-pink-600',
      path: '/admin/clientes'
    },
    {
      title: 'Pedidos en Curso',
      value: metrics?.totalOrdersCount || 21,
      change: '4 pendientes de despacho',
      icon: ShoppingBag,
      color: 'from-amber-600 to-orange-600',
      path: '/admin/pedidos'
    },
    {
      title: 'Stock Bajo / Alertas',
      value: lowStockCount || 5,
      change: 'Requiere atención',
      icon: AlertTriangle,
      color: 'from-red-600 to-rose-600',
      path: '/admin/alertas',
      highlight: true
    },
    {
      title: 'Ingresos Totales',
      value: `Bs. ${(metrics?.totalRevenue || 35500).toLocaleString()}`,
      change: '+24.1% este trimestre',
      icon: DollarSign,
      color: 'from-red-600 to-amber-600',
      path: '/admin/reportes'
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Banner de Bienvenida y Estado del Sistema */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/40 via-[#161622] to-[#12121a] border border-red-900/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-red-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sistema BikerStock3D Activo</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            Resumen General de Operaciones
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Monitoreo en tiempo real de ventas, inventario, comportamiento de usuarios y modelos 3D registrados.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/productos"
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all flex items-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Gestionar Cascos</span>
          </Link>
          <Link
            to="/"
            className="px-4 py-2.5 rounded-xl bg-[#1a1a26] hover:bg-[#222232] text-zinc-200 border border-[#2d2e40] text-xs font-bold transition-all"
          >
            Ver Tienda
          </Link>
        </div>
      </div>

      {/* 6 TARJETAS KPI (REQUISITO 17) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, idx) => (
          <Link
            key={idx}
            to={kpi.path}
            className={`p-5 rounded-2xl bg-[#12121a] border transition-all duration-200 hover:scale-[1.02] shadow-lg flex flex-col justify-between ${
              kpi.highlight && Number(kpi.value) > 0
                ? 'border-red-500/50 bg-red-950/10'
                : 'border-[#232330] hover:border-zinc-500'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono font-bold uppercase text-zinc-400 tracking-wider">
                {kpi.title}
              </span>
              <div className={`p-2 rounded-xl bg-gradient-to-br ${kpi.color} text-white shadow-md`}>
                <kpi.icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <p className="font-heading text-2xl font-extrabold text-white">
                {kpi.value}
              </p>
              <p className={`text-[11px] font-medium mt-1 ${
                kpi.highlight ? 'text-red-400' : 'text-emerald-400'
              }`}>
                {kpi.change}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* GRÁFICOS ANALÍTICOS (REQUISITO 18) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Gráfico 1: Ventas por Mes (AreaChart) - 8 columnas */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#12121a] border border-[#232330] shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Ventas e Ingresos Mensuales</h3>
              <p className="text-xs text-zinc-400">Comportamiento en Bolivianos (Bs.) del semestre actual</p>
            </div>
            <span className="text-xs font-mono font-bold text-red-400 bg-red-600/10 px-2.5 py-1 rounded-lg border border-red-500/20">
              Año 2026
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics?.monthlySales || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#232330" vertical={false} />
                <XAxis dataKey="mes" stroke="#71717a" fontSize={12} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} tickFormatter={(v) => `Bs. ${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#181824', borderColor: '#2f3042', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(value: any) => [`Bs. ${Number(value).toLocaleString()}`, 'Ingresos']}
                />
                <Area type="monotone" dataKey="ventas" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorVentas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Ventas por Categoría (PieChart) - 4 columnas */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#12121a] border border-[#232330] shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-white">Ventas por Categoría</h3>
            <p className="text-xs text-zinc-400">Distribución porcentual de preferencia</p>
          </div>

          <div className="h-56 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics?.categoryShare || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="valor"
                >
                  {(metrics?.categoryShare || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#181824', borderColor: '#2f3042', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(value: any) => [`${value}%`, 'Cuota']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#232330]">
            {(metrics?.categoryShare || []).map((cat: any) => (
              <div key={cat.name} className="flex items-center gap-2 text-xs text-zinc-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <span>{cat.name}: <strong>{cat.valor}%</strong></span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Gráfico 3 y Tabla de Alertas Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Productos Más Vendidos (BarChart horizontal) - 7 columnas */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#12121a] border border-[#232330] shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Top 5 Cascos Más Vendidos</h3>
              <p className="text-xs text-zinc-400">Cantidad de unidades vendidas acumuladas</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={metrics?.topProducts || []}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#232330" horizontal={false} />
                <XAxis type="number" stroke="#71717a" fontSize={11} />
                <YAxis dataKey="nombre" type="category" stroke="#71717a" fontSize={11} width={110} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#181824', borderColor: '#2f3042', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any, name: any) => [val, name === 'ventas' ? 'Unidades Vendidas' : name]}
                />
                <Bar dataKey="ventas" fill="#ef4444" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resumen de Stock Crítico - 5 columnas */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#12121a] border border-[#232330] shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-white">Alertas de Inventario</h3>
                <p className="text-xs text-zinc-400">Cascos con stock bajo o agotado</p>
              </div>
              <Link to="/admin/alertas" className="text-xs text-red-400 font-bold hover:underline">
                Ver todas ({alerts.length})
              </Link>
            </div>

            <div className="space-y-3">
              {alerts.slice(0, 3).map(alert => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs ${
                    alert.nivel === 'Agotado'
                      ? 'bg-red-950/20 border-red-500/40 text-red-300'
                      : 'bg-amber-950/20 border-amber-500/40 text-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-4 h-4 shrink-0 ${
                      alert.nivel === 'Agotado' ? 'text-red-400' : 'text-amber-400'
                    }`} />
                    <div>
                      <p className="font-bold text-white">{alert.cascoNombre}</p>
                      <p className="text-[11px] opacity-80">Stock: {alert.stockActual} (Mín: {alert.stockMinimo})</p>
                    </div>
                  </div>
                  <span className="font-mono uppercase font-bold text-[10px] px-2 py-0.5 rounded bg-black/40">
                    {alert.nivel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#232330] mt-4 flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Box className="w-4 h-4 text-red-500" />
              Total de referencias: {products.length}
            </span>
            <Link to="/admin/inventario" className="text-white hover:text-red-400 font-semibold">
              Control de inventario →
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
