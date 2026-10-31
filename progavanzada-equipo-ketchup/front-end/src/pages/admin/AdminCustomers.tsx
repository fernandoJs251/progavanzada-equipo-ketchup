import React, { useState, useEffect } from 'react';
import { customerService } from '../../services/customerService';
import { Customer } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Users, Search, Phone, Mail, Award, DollarSign } from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    customerService.getCustomers().then(setCustomers);
  }, []);

  const filteredCustomers = customers.filter(c =>
    `${c.nombre} ${c.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.ci.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">Directorio de Clientes</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Base de datos de compradores, fidelización y estadísticas de consumo.
          </p>
        </div>

        {/* Buscador */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Buscar por cliente, CI o correo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#12121a] text-xs text-white pl-10 pr-4 py-2.5 rounded-xl border border-[#232330] focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
      </div>

      {/* TABLA DE CLIENTES (REQUISITO 23) */}
      <div className="rounded-2xl bg-[#12121a] border border-[#232330] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#161622] text-zinc-400 font-mono uppercase text-[10px] tracking-wider border-b border-[#232330]">
              <tr>
                <th className="py-3.5 px-4">ID</th>
                <th className="py-3.5 px-4">Cliente</th>
                <th className="py-3.5 px-4">C.I.</th>
                <th className="py-3.5 px-4">Contacto</th>
                <th className="py-3.5 px-4 text-center">N° Compras</th>
                <th className="py-3.5 px-4">Total Gastado</th>
                <th className="py-3.5 px-4">Registro</th>
                <th className="py-3.5 px-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f202c]">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-[#181824] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-zinc-400">
                    #{customer.id}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-white text-sm">{customer.nombre} {customer.apellido}</p>
                    <span className="text-[10px] text-zinc-500">{customer.correo}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-300">
                    {customer.ci}
                  </td>
                  <td className="py-3 px-4 font-mono text-red-400">
                    {customer.telefono}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 font-mono font-bold text-white bg-[#181824] px-2.5 py-1 rounded-lg border border-[#272738]">
                      <Award className="w-3 h-3 text-amber-400" />
                      {customer.numeroCompras}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-extrabold text-white">
                    Bs. {customer.totalGastado.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-500 text-[11px]">
                    {customer.fechaRegistro}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={customer.estado === 'Activo' ? 'success' : 'default'} size="sm">
                      {customer.estado}
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
