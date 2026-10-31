import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../../components/common/Badge';
import { Bell, AlertTriangle, XCircle, CheckCircle2, Clock, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminAlerts: React.FC = () => {
  const { alerts, resolveAlert } = useProducts();
  const { showToast } = useToast();

  const handleResolve = (id: string, nombre: string) => {
    resolveAlert(id);
    showToast(`Alerta para "${nombre}" marcada como atendida`, 'success');
  };

  const activeAlerts = alerts.filter(a => !a.resuelto);
  const resolvedAlerts = alerts.filter(a => a.resuelto);

  return (
    <div className="space-y-8">
      
      {/* Cabecera */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
          <Bell className="w-4 h-4" />
          <span>Centro de Notificaciones Críticas</span>
        </div>
        <h2 className="font-heading text-2xl font-bold text-white">Alertas de Almacén y Operaciones</h2>
        <p className="text-xs text-zinc-400 mt-1">
          Supervisión preventiva para evitar rupturas de stock y retrasos en pedidos.
        </p>
      </div>

      {/* Alertas Activas */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
          <span>Alertas Activas</span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-red-600/20 text-red-400 border border-red-500/30 font-mono">
            {activeAlerts.length}
          </span>
        </h3>

        {activeAlerts.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#12121a] border border-[#232330]">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-white">¡No hay alertas pendientes!</p>
            <p className="text-xs text-zinc-400 mt-1">Todos los niveles de inventario se encuentran estables.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeAlerts.map(alert => {
              const isAgotado = alert.nivel === 'Agotado';

              return (
                <div
                  key={alert.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 shadow-lg transition-all ${
                    isAgotado
                      ? 'bg-red-950/20 border-red-500/50 shadow-red-950/20'
                      : 'bg-amber-950/20 border-amber-500/50 shadow-amber-950/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${
                        isAgotado ? 'bg-red-600/20 border-red-500/40 text-red-400' : 'bg-amber-600/20 border-amber-500/40 text-amber-400'
                      }`}>
                        {isAgotado ? <XCircle className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono font-bold text-zinc-400">
                          {alert.marca} • Alerta ID: {alert.id}
                        </span>
                        <h4 className="font-heading text-lg font-bold text-white">{alert.cascoNombre}</h4>
                      </div>
                    </div>

                    <Badge variant={isAgotado ? 'danger' : 'warning'} size="sm">
                      {alert.nivel}
                    </Badge>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                    {alert.mensaje}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-[11px] font-mono text-zinc-500">
                      Fecha: {alert.fecha}
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        to="/admin/inventario"
                        className="px-3 py-1.5 rounded-lg bg-[#181824] hover:bg-[#202030] text-zinc-300 text-xs font-semibold border border-zinc-700 transition-colors"
                      >
                        Ver Stock
                      </Link>
                      <button
                        onClick={() => handleResolve(alert.id, alert.cascoNombre)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-xs font-bold border border-emerald-500/30 transition-colors flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Resolver</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Historial de Alertas Resueltas */}
      {resolvedAlerts.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-[#232330]">
          <h3 className="font-heading text-lg font-bold text-zinc-400">
            Historial de Alertas Atendidas ({resolvedAlerts.length})
          </h3>
          <div className="space-y-2">
            {resolvedAlerts.map(alert => (
              <div
                key={alert.id}
                className="p-3.5 rounded-xl bg-[#12121a] border border-[#20212d] flex items-center justify-between text-xs opacity-75"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold text-white">{alert.cascoNombre}</span>
                  <span className="text-zinc-500 font-mono text-[11px]">• {alert.mensaje}</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">Resuelto</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
