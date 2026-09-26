import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  Legend 
} from 'recharts';
import { useProducts } from '../../context/ProductContext';
import { salesService } from '../../services/salesService';
import { 
  BarChart3, 
  Download, 
  Printer, 
  TrendingUp, 
  Package, 
  Users, 
  AlertTriangle, 
  DollarSign, 
  Award 
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const AdminReports: React.FC = () => {
  const { products, alerts } = useProducts();
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    salesService.getDashboardMetrics().then(setMetrics);
  }, []);

  const totalStockUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockCount = alerts.filter(a => !a.resuelto).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      
      {/* Cabecera y Botones de Exportar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Módulo de Analítica Ejecutiva</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">Reportes Estadísticos</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Consolidado gerencial de rendimiento comercial, inventario y fidelización.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-[#161622] hover:bg-[#1e1e2d] text-zinc-200 border border-[#2a2b3c] text-xs font-bold transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-zinc-400" />
            <span>Imprimir Informe</span>
          </button>
        </div>
      </div>

      {/* 5 TARJETAS DE INDICADORES (REQUISITO 25) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* 1. Ventas Totales */}
        <div className="p-5 rounded-2xl bg-[#12121a] border border-[#232330]">
          <span className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">Ventas Totales</span>
          <p className="font-heading text-2xl font-bold text-white">128 operaciones</p>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">+18% este mes</span>
        </div>

        {/* 2. Ingresos */}
        <div className="p-5 rounded-2xl bg-[#12121a] border border-[#232330]">
          <span className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">Ingresos Acumulados</span>
          <p className="font-heading text-2xl font-bold text-red-400">Bs. 35.500</p>
          <span className="text-[11px] text-zinc-500 font-mono mt-1 block">Promedio: Bs. 277 / venta</span>
        </div>

        {/* 3. Producto Más Vendido */}
        <div className="p-5 rounded-2xl bg-[#12121a] border border-[#232330]">
          <span className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">Más Vendido</span>
          <p className="font-heading text-lg font-bold text-white truncate">LS2 Stream Evo</p>
          <span className="text-[11px] text-amber-400 font-semibold mt-1 block">42 unidades facturadas</span>
        </div>

        {/* 4. Productos Bajo Stock */}
        <div className="p-5 rounded-2xl bg-[#12121a] border border-red-500/30 bg-red-950/10">
          <span className="text-[10px] uppercase font-mono text-red-400 block mb-1">Bajo Stock</span>
          <p className="font-heading text-2xl font-bold text-white">{lowStockCount} modelos</p>
          <span className="text-[11px] text-red-400 font-semibold mt-1 block">Requiere compra urgente</span>
        </div>

        {/* 5. Clientes Registrados */}
        <div className="p-5 rounded-2xl bg-[#12121a] border border-[#232330]">
          <span className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">Clientes Registrados</span>
          <p className="font-heading text-2xl font-bold text-white">67 clientes</p>
          <span className="text-[11px] text-blue-400 font-semibold mt-1 block">Tasa retorno: 64%</span>
        </div>

      </div>

      {/* GRÁFICOS DE REPORTES (REQUISITO 25) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Tendencia de Ingresos Semestrales */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#12121a] border border-[#232330] shadow-xl">
          <h3 className="font-heading text-lg font-bold text-white mb-1">Curva de Crecimiento en Ventas</h3>
          <p className="text-xs text-zinc-400 mb-6">Proyección mensual de facturación en moneda nacional (Bs.)</p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics?.monthlySales || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#232330" />
                <XAxis dataKey="mes" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} tickFormatter={v => `Bs. ${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#181824', borderColor: '#2f3042', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any) => [`Bs. ${Number(val).toLocaleString()}`, 'Total Facturado']}
                />
                <Legend />
                <Line type="monotone" dataKey="ventas" name="Ventas (Bs.)" stroke="#ef4444" strokeWidth={3} dot={{ r: 5, fill: '#ef4444' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Unidades en Almacén vs Mínimo */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#12121a] border border-[#232330] shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-white mb-1">Estado de Inventario</h3>
            <p className="text-xs text-zinc-400 mb-4">Volumen físico almacenado</p>

            <div className="p-4 rounded-2xl bg-[#181824] border border-[#2b2c3c] text-center mb-6">
              <span className="text-[11px] font-mono uppercase text-zinc-400 block">Total Unidades en Almacén</span>
              <span className="font-heading text-4xl font-extrabold text-white block mt-1">
                {totalStockUnits} <span className="text-sm font-normal text-zinc-400">cascos</span>
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-[#232330]">
                <span className="text-zinc-400">Cascos Integrales:</span>
                <span className="font-bold text-white">45%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#232330]">
                <span className="text-zinc-400">Cascos Modulares:</span>
                <span className="font-bold text-white">25%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#232330]">
                <span className="text-zinc-400">Cascos Off Road:</span>
                <span className="font-bold text-white">20%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-zinc-400">Cascos Abiertos (Jet):</span>
                <span className="font-bold text-white">10%</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#232330] text-[11px] text-zinc-500 font-mono">
            Reporte generado en prototipo académico BIKERSTOCK3D
          </div>
        </div>

      </div>

      {/* TABLA DE RENDIMIENTO POR MODELO */}
      <div className="rounded-3xl bg-[#12121a] border border-[#232330] p-6 shadow-xl">
        <h3 className="font-heading text-lg font-bold text-white mb-4">
          Ranking Financiero por Modelo de Casco
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#161622] text-zinc-400 font-mono uppercase text-[10px] tracking-wider border-b border-[#232330]">
              <tr>
                <th className="py-3 px-4">Posición</th>
                <th className="py-3 px-4">Modelo</th>
                <th className="py-3 px-4 text-center">Unidades Vendidas</th>
                <th className="py-3 px-4 text-right">Ingresos Brutos</th>
                <th className="py-3 px-4 text-center">Rendimiento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f202c]">
              {(metrics?.topProducts || []).map((tp: any, idx: number) => (
                <tr key={idx} className="hover:bg-[#181824] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-zinc-500">
                    #{idx + 1}
                  </td>
                  <td className="py-3 px-4 font-bold text-white">
                    {tp.nombre}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-zinc-200">
                    {tp.ventas}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-extrabold text-red-400">
                    Bs. {tp.ingresos.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge variant={idx === 0 ? 'success' : 'default'} size="sm">
                      {idx === 0 ? 'Líder en Ventas' : 'Alta Demanda'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
