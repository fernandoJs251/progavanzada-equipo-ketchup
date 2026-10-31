import React from 'react';
import { Hero } from '../components/home/Hero';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedHelmets } from '../components/home/FeaturedHelmets';
import { Box, ShieldCheck, Flame, RotateCw, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const brands = [
    { name: 'AGV', country: 'Italia' },
    { name: 'SHOEI', country: 'Japón' },
    { name: 'HJC', country: 'Corea' },
    { name: 'LS2', country: 'España' },
    { name: 'BELL', country: 'EE.UU.' },
    { name: 'MT HELMETS', country: 'España' },
    { name: 'AIROH', country: 'Italia' },
    { name: 'FOX RACING', country: 'EE.UU.' }
  ];

  return (
    <div className="space-y-0">
      
      {/* 1. SECCIÓN HERO */}
      <Hero />

      {/* 2. CINTILLO DE MARCAS OFICIALES */}
      <section className="py-8 bg-[#0c0c12] border-b border-[#1c1d25] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6">
            Distribuidores y Marcas Deportivas Autorizadas
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-70 hover:opacity-100 transition-opacity">
            {brands.map(b => (
              <div key={b.name} className="flex flex-col items-center">
                <span className="font-heading font-black text-lg sm:text-xl tracking-wider text-zinc-300 hover:text-red-500 transition-colors cursor-default">
                  {b.name}
                </span>
                <span className="text-[9px] text-zinc-600 font-mono">{b.country}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CATEGORÍAS DE CASCOS */}
      <CategoryGrid />

      {/* 4. PRODUCTOS DESTACADOS */}
      <FeaturedHelmets />

      {/* 5. SECCIÓN EXPERIENCIA 3D / VIBE INNOVADOR */}
      <section className="py-20 bg-gradient-to-b from-[#0c0c11] to-[#09090c] border-b border-[#1c1d25]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
                <Box className="w-3.5 h-3.5" />
                <span>TECNOLOGÍA THREE.JS & REACT THREE FIBER</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Inspección 3D Interactiva: Examina cada detalle antes de la ruta
              </h2>

              <p className="text-zinc-300 text-sm leading-relaxed">
                Olvídate de comprar a ciegas. En <strong>BikerStock3D</strong> renderizamos los cascos en tiempo real. 
                Gira en 360 grados, prueba la apertura del visor deportivo, analiza las tomas de aire aerodinámicas y cambia el acabado de pintura al instante.
              </p>

              <div className="space-y-3 text-xs text-zinc-300">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Control de cámara libre con OrbitControls (giro 360°, zoom milimétrico y paneo).</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Apertura y cierre animado de la visera de policarbonato con reflexión realista.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Compatible con modelos 3D externos en formato <code>/models/casco.glb</code>.</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/cascos/2"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all hover:scale-105"
                >
                  <span>Probar Experiencia 3D en Vivo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl bg-[#14141e] border border-[#2a2b3d] p-6 shadow-2xl">
                <div className="aspect-video rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center relative border border-white/10 group">
                  <img
                    src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80"
                    alt="Simulación 3D"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-red-600/30 border border-red-500/60 flex items-center justify-center text-red-400 mb-3 animate-pulse">
                      <Box className="w-8 h-8" />
                    </div>
                    <span className="font-heading text-xl font-bold text-white">Visualizador 3D Integrado</span>
                    <p className="text-xs text-zinc-300 mt-1 max-w-xs">
                      Entra a cualquier casco para activar el motor gráfico de renderizado 3D en el navegador.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FINAL */}
      <section className="py-16 bg-[#09090c] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            ¿Listo para equiparte con la máxima protección?
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-xl mx-auto">
            Disfruta de la mejor tecnología, envíos rápidos en todo el territorio nacional y asesoramiento técnico especializado.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/cascos"
              className="px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-xl shadow-red-600/30 transition-all hover:scale-105"
            >
              Explorar Catálogo Completo
            </Link>
            <Link
              to="/admin"
              className="px-8 py-3.5 rounded-xl bg-[#161622] hover:bg-[#202030] text-zinc-200 border border-[#2b2c3c] font-bold text-sm transition-all"
            >
              Acceso Administrativo
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
