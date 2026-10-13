import React from 'react';
import { ShieldAlert, ArrowLeft, Lock, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ForbiddenViewProps {
  requiredRole: string;
}

export const ForbiddenView: React.FC<ForbiddenViewProps> = ({ requiredRole }) => {
  const { currentUser, navigate, getRoleHomeUrl } = useApp();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-red-100 p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-200">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider border border-red-200">
            <Lock className="w-3.5 h-3.5" />
            <span>403 - Akses Dibatasi</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Otorisasi Tidak Memadai
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Halaman ini berada di zona <strong>{requiredRole}</strong> dan hanya dapat diakses oleh akun dengan wewenang tersebut.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span>Pengguna Aktif:</span>
            <span className="font-bold text-slate-800">{currentUser.nama}</span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>Peran Anda:</span>
            <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {currentUser.role}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>Role Dibutuhkan:</span>
            <span className="font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
              {requiredRole}
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={() => navigate(getRoleHomeUrl(currentUser.role))}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-blue-600/20 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Portal Anda ({getRoleHomeUrl(currentUser.role)})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
