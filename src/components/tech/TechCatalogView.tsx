import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, Cpu, ExternalLink, Building2, CheckCircle2, Layers } from 'lucide-react';
import { getConfidenceBadge } from '../../utils/helpers';
import { TechType } from '../../types';

export const TechCatalogView: React.FC = () => {
  const { 
    technologies, 
    categories, 
    banks, 
    findings, 
    setSelectedFindingModalId 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredTechnologies = technologies.filter(tech => {
    if (selectedCategory !== 'all' && tech.categoryId !== selectedCategory) return false;
    if (selectedType !== 'all' && tech.tipe !== selectedType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        tech.nama.toLowerCase().includes(q) ||
        tech.vendor.toLowerCase().includes(q) ||
        tech.deskripsi.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Katalog & Direktori Teknologi (F4)
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
            {technologies.length} Komponen
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Daftar seluruh teknologi yang dimonitor, vendor penyedia, model lisensi, dan bank pengguna di Himbara.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama teknologi, vendor, atau arsitektur..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto flex-wrap">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-700"
          >
            <option value="all">Semua Kategori ({categories.length})</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.nama}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-700 capitalize"
          >
            <option value="all">Semua Model Lisensi</option>
            <option value="open-source">Open Source</option>
            <option value="komersial">Komersial (Enterprise)</option>
            <option value="in-house">In-House Engineering</option>
          </select>
        </div>
      </div>

      {/* Technology Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTechnologies.map(tech => {
          const category = categories.find(c => c.id === tech.categoryId);
          const techFindings = findings.filter(f => f.technologyId === tech.id);
          const isUsedByBRI = techFindings.some(f => f.bankId === 'bank-bri');

          return (
            <div 
              key={tech.id}
              className={`p-5 rounded-2xl border transition flex flex-col justify-between bg-white shadow-xs hover:border-slate-300 ${
                isUsedByBRI ? 'border-l-4 border-l-blue-600' : ''
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm leading-snug">{tech.nama}</h3>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                      Vendor: <strong className="text-slate-700">{tech.vendor}</strong>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                    tech.tipe === 'open-source' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : tech.tipe === 'komersial' 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {tech.tipe}
                  </span>
                </div>

                <div className="text-[11px] text-blue-600 font-semibold mb-2">
                  Kategori: {category?.nama}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {tech.deskripsi}
                </p>
              </div>

              {/* Adoption by Banks row */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">Bank Pengguna:</span>
                  <span className="font-bold text-slate-800">
                    {techFindings.length} dari 5 Bank
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                  {banks.map(bank => {
                    const finding = techFindings.find(f => f.bankId === bank.id);
                    if (!finding) {
                      return (
                        <div 
                          key={bank.id}
                          className="px-2 py-1 rounded-lg bg-slate-100 text-slate-400 text-[10px] font-medium"
                          title={`${bank.singkatan}: Belum Terdeteksi`}
                        >
                          {bank.singkatan} (–)
                        </div>
                      );
                    }

                    const badge = getConfidenceBadge(finding.confidence);
                    return (
                      <button
                        key={bank.id}
                        onClick={() => setSelectedFindingModalId(finding.id)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition flex items-center space-x-1 hover:scale-105 ${badge.bgColor}`}
                        title={`${bank.singkatan}: ${finding.confidence}`}
                      >
                        <span>{bank.singkatan}</span>
                        <span>{badge.symbol}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
