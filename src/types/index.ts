export type ConfidenceLevel = 'Confirmed' | 'Likely' | 'Indicative';
export type ReviewStatus = 'Draft' | 'Reviewed' | 'Published';
export type TechType = 'open-source' | 'komersial' | 'in-house';
export type EvidenceType = 'publik' | 'wawancara';
export type UserRole = 'Viewer' | 'Analyst' | 'Admin';

export interface Bank {
  id: string;
  nama: string;
  slug: string;
  singkatan: string;
  deskripsi: string;
  logo: string;
  isFokusUtama?: boolean;
  produkDigital: string[];
  brandColor: string;
  accentColor: string;
  textColor: string;
  badgeBg: string;
}

export interface Category {
  id: string;
  nama: string;
  slug: string;
  urutan: number;
  icon: string;
  deskripsi: string;
  contohSubkategori: string[];
}

export interface Technology {
  id: string;
  nama: string;
  vendor: string;
  categoryId: string;
  tipe: TechType;
  deskripsi: string;
  websiteUrl?: string;
}

export interface Finding {
  id: string;
  bankId: string;
  technologyId: string;
  confidence: ConfidenceLevel;
  statusReview: ReviewStatus;
  tanggalTerdeteksi: string;
  tanggalVerifikasi: string;
  catatan?: string;
  evidenceIds: string[];
}

export interface Evidence {
  id: string;
  findingId: string;
  tipeSumber: EvidenceType;
  judul: string;
  url?: string;
  interviewId?: string;
  tanggalAkses: string;
  kutipanRingkas: string;
  pencatat: string;
}

export interface Interview {
  id: string;
  bankId: string;
  kodeNarasumber: string; // Misal: "Narasumber EA-01 (Anonim)"
  divisi: string; // Misal: "Divisi Digital Banking / IT Architecture"
  tanggal: string;
  ringkasan: string;
  persetujuanNarasumber: boolean;
}

export interface User {
  id: string;
  nama: string;
  email: string;
  role: UserRole;
  avatar?: string;
  password?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  aksi: 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'IMPORT';
  entitas: 'Bank' | 'Category' | 'Technology' | 'Finding' | 'Evidence' | 'Interview';
  detail: string;
  timestamp: string;
}
