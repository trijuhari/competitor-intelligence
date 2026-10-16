import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Bank, Category, Technology, Finding, Evidence, Interview, User, AuditLog, 
  UserRole, ConfidenceLevel, ReviewStatus, ResearchItem, BankCapabilityDetail,
  ThemeMode 
} from '../types';
import { 
  INITIAL_BANKS, INITIAL_CATEGORIES, INITIAL_TECHNOLOGIES, 
  INITIAL_FINDINGS, INITIAL_EVIDENCES, INITIAL_INTERVIEWS, 
  INITIAL_USERS, INITIAL_AUDIT_LOGS 
} from '../data/seedData';
import researchMatrixData from '../data/researchMatrix.json';
import { api } from '../services/api';

interface AppContextType {
  banks: Bank[];
  categories: Category[];
  technologies: Technology[];
  findings: Finding[];
  evidences: Evidence[];
  interviews: Interview[];
  currentUser: User;
  users: User[];
  auditLogs: AuditLog[];
  isDbConnected: boolean;

  // Research Matrix (408 Capabilities from Sheet)
  researchItems: ResearchItem[];
  selectedResearchCell: { capId: string; bankCode: string } | null;
  setSelectedResearchCell: (cell: { capId: string; bankCode: string } | null) => void;
  updateResearchCell: (capId: string, bankCode: string, updates: Partial<BankCapabilityDetail>) => Promise<void>;
  updateResearchCapability: (capId: string, updates: Partial<ResearchItem>) => Promise<void>;
  addResearchCapability: (data: Omit<ResearchItem, 'id' | 'no'>) => Promise<void>;
  deleteResearchCapability: (capId: string) => Promise<void>;
  exportResearchMatrixCSV: () => void;

  // Google Sheets Sync
  syncStatus: {
    sheet_url: string;
    auto_sync: string;
    auto_sync_interval: string;
    apps_script_url: string;
    last_sync_time: string;
    last_sync_status: string;
    last_sync_summary: string;
    totalCapabilities: number;
    totalEntries: number;
  };
  isSyncing: boolean;
  isSyncModalOpen: boolean;
  setIsSyncModalOpen: (open: boolean) => void;
  pullGoogleSheet: (url?: string) => Promise<{ success: boolean; summary: string; error?: string }>;
  pushGoogleSheet: (webhookUrl?: string) => Promise<{ success: boolean; summary: string; error?: string; requiresWebhook?: boolean; csvContent?: string; tsvContent?: string }>;
  updateSyncConfig: (config: any) => Promise<void>;
  refreshSyncStatus: () => Promise<void>;

  // Theme Mode (Light / Dark)
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;

  // Auth & Roles
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getRoleHomeUrl: (role: UserRole) => string;

  // Routing
  currentPath: string;
  navigate: (path: string) => void;
  
  // Navigation & Active views
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedBankId: string;
  setSelectedBankId: (id: string) => void;
  selectedTechId: string | null;
  setSelectedTechId: (id: string | null) => void;
  selectedFindingModalId: string | null;
  setSelectedFindingModalId: (id: string | null) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
  
  // Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  confidenceFilter: ConfidenceLevel[];
  setConfidenceFilter: (levels: ConfidenceLevel[]) => void;
  selectedBanksFilter: string[];
  setSelectedBanksFilter: (bankIds: string[]) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (catId: string) => void;
  
  // Actions
  switchUserRole: (role: UserRole) => void;
  addFinding: (finding: Omit<Finding, 'id'>) => Promise<void>;
  updateFinding: (id: string, updates: Partial<Finding>) => Promise<void>;
  deleteFinding: (id: string) => Promise<void>;
  publishFinding: (id: string) => Promise<void>;
  
  addTechnology: (tech: Omit<Technology, 'id'>) => Promise<void>;
  updateTechnology: (id: string, updates: Partial<Technology>) => Promise<void>;
  deleteTechnology: (id: string) => Promise<void>;
  
  addEvidence: (evidence: Omit<Evidence, 'id'>) => Promise<void>;
  updateEvidence: (id: string, updates: Partial<Evidence>) => Promise<void>;
  deleteEvidence: (id: string) => Promise<void>;
  
  addInterview: (interview: Omit<Interview, 'id'>) => Promise<void>;
  updateInterview: (id: string, updates: Partial<Interview>) => Promise<void>;
  deleteInterview: (id: string) => Promise<void>;
  
  exportDataJSON: () => void;
  importDataJSON: (jsonStr: string) => boolean;
  exportMatrixCSV: () => void;
  resetAllData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'competitor_intel_bri_himbara_v1';
const AUTH_STORAGE_KEY = 'competitor_intel_bri_auth_user';

export const getRoleHomeUrl = (role: UserRole): string => {
  if (role === 'Admin') return '/admin';
  if (role === 'Analyst') return '/analyst/matrix';
  return '/executive/dashboard';
};

const pathToTab = (path: string): string => {
  if (path.startsWith('/admin')) return 'admin';
  if (path.includes('matrix')) return 'matrix';
  if (path.includes('head-to-head')) return 'head-to-head';
  if (path.includes('gap-analysis')) return 'gap-analysis';
  if (path.includes('decision-matrix')) return 'decision-matrix';
  if (path.includes('tco-simulator')) return 'tco-simulator';
  if (path.includes('genai-readiness')) return 'genai-readiness';
  if (path.includes('tech-catalog')) return 'tech-catalog';
  if (path.includes('banks')) return 'banks';
  if (path.includes('dashboard') || path === '/executive' || path === '/analyst') return 'dashboard';
  return 'dashboard';
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme State
  const THEME_STORAGE_KEY = 'competitor_intel_bri_theme';
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (saved === 'light' || saved === 'dark') return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  // Initialize state from localStorage or seedData
  const [banks, setBanks] = useState<Bank[]>(INITIAL_BANKS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [isDbConnected, setIsDbConnected] = useState<boolean>(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem(AUTH_STORAGE_KEY);
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_USERS[0];
  });

  // Routing State
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const p = window.location.pathname;
    return p && p !== '/' ? p : '/login';
  });

  // Navigation & UI States
  const [activeTab, setActiveTabState] = useState<string>(() => pathToTab(window.location.pathname));
  const [selectedBankId, setSelectedBankId] = useState<string>('bank-bri');
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);
  const [selectedFindingModalId, setSelectedFindingModalId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Research Matrix (408 Capabilities)
  const RESEARCH_STORAGE_KEY = 'competitor_intel_bri_research_matrix_v1';
  const [researchItems, setResearchItems] = useState<ResearchItem[]>(() => {
    const saved = localStorage.getItem(RESEARCH_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached research matrix', e);
      }
    }
    return researchMatrixData as unknown as ResearchItem[];
  });

  const [selectedResearchCell, setSelectedResearchCell] = useState<{ capId: string; bankCode: string } | null>(null);

  // Google Sheets Sync State
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<{
    sheet_url: string;
    auto_sync: string;
    auto_sync_interval: string;
    apps_script_url: string;
    last_sync_time: string;
    last_sync_status: string;
    last_sync_summary: string;
    totalCapabilities: number;
    totalEntries: number;
  }>({
    sheet_url: 'https://docs.google.com/spreadsheets/d/1L0WBGmZVrzIHOojtZjYSeSEEggNsMPOG9AhQQj0-PoY/edit?gid=0#gid=0',
    auto_sync: '0',
    auto_sync_interval: '0',
    apps_script_url: '',
    last_sync_time: '',
    last_sync_status: 'Siap',
    last_sync_summary: '',
    totalCapabilities: 408,
    totalEntries: 2448
  });

  const refreshSyncStatus = async () => {
    try {
      const status = await api.getSyncStatus();
      if (status) setSyncStatus(status);
    } catch (e) {
      console.warn('Failed to fetch sync status:', e);
    }
  };

  const pullGoogleSheet = async (customUrl?: string) => {
    setIsSyncing(true);
    try {
      const result = await api.pullFromGoogleSheet(customUrl, currentUser.nama);
      if (result.success && result.items && result.items.length > 0) {
        setResearchItems(result.items);
        localStorage.setItem(RESEARCH_STORAGE_KEY, JSON.stringify(result.items));
      }
      await refreshSyncStatus();
      addAuditLog('SYNC', 'GoogleSheets', result.summary || 'Sinkronisasi dari Google Sheets berhasil');
      return { success: true, summary: result.summary };
    } catch (err: any) {
      const errorMsg = err?.message || 'Gagal sinkronisasi data dari Google Sheets';
      await refreshSyncStatus();
      return { success: false, summary: errorMsg, error: errorMsg };
    } finally {
      setIsSyncing(false);
    }
  };

  const pushGoogleSheet = async (customWebhookUrl?: string) => {
    setIsSyncing(true);
    try {
      const result = await api.pushToGoogleSheet(customWebhookUrl, currentUser.nama);
      await refreshSyncStatus();
      if (result.success) {
        addAuditLog('SYNC', 'GoogleSheets', result.summary || 'Kirim data ke Google Sheets berhasil');
      }
      return result;
    } catch (err: any) {
      const errorMsg = err?.message || 'Gagal mengirim data ke Google Sheets';
      await refreshSyncStatus();
      return { success: false, summary: errorMsg, error: errorMsg };
    } finally {
      setIsSyncing(false);
    }
  };

  const updateSyncConfig = async (config: any) => {
    try {
      const updated = await api.updateSyncConfig({ ...config, userName: currentUser.nama });
      if (updated) setSyncStatus(prev => ({ ...prev, ...updated }));
    } catch (err) {
      console.error('Failed to update sync config:', err);
      throw err;
    }
  };

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    setActiveTabState(pathToTab(path));
  };

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    let newPath = '/executive/dashboard';
    if (currentUser.role === 'Admin') {
      if (tab === 'admin') newPath = '/admin';
      else if (['matrix', 'head-to-head', 'gap-analysis', 'tech-catalog'].includes(tab)) newPath = `/analyst/${tab}`;
      else newPath = `/executive/${tab}`;
    } else if (currentUser.role === 'Analyst') {
      if (['matrix', 'head-to-head', 'gap-analysis', 'tech-catalog', 'banks'].includes(tab)) newPath = `/analyst/${tab}`;
      else newPath = `/executive/${tab}`;
    } else {
      newPath = `/executive/${tab === 'dashboard' ? 'dashboard' : tab}`;
    }
    window.history.pushState({}, '', newPath);
    setCurrentPath(newPath);
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname || '/login';
      setCurrentPath(p);
      setActiveTabState(pathToTab(p));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Route protection
  useEffect(() => {
    if (!isAuthenticated && currentPath !== '/login') {
      navigate('/login');
    } else if (isAuthenticated && (currentPath === '/login' || currentPath === '/')) {
      navigate(getRoleHomeUrl(currentUser.role));
    }
  }, [isAuthenticated, currentPath]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim();
    try {
      const res = await api.login(trimmedEmail, pass);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        setIsAuthenticated(true);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(res.user));
        const target = getRoleHomeUrl(res.user.role);
        navigate(target);
        return { success: true };
      }
    } catch (err: any) {
      // Local fallback in case server offline
      const localMatch = [
        { id: 'usr-1', nama: 'Rinaldi Firmansyah (Lead Admin)', email: 'admin@bri.co.id', role: 'Admin' as UserRole, password: 'admin123', avatar: '👨‍💼' },
        { id: 'usr-2', nama: 'Siti Rahmawati (Tech Analyst)', email: 'analyst@bri.co.id', role: 'Analyst' as UserRole, password: 'analyst123', avatar: '👩‍💻' },
        { id: 'usr-3', nama: 'Budi Hartono (Executive Director BRI)', email: 'executive@bri.co.id', role: 'Viewer' as UserRole, password: 'bri123', avatar: '👔' },
      ].find(u => u.email.toLowerCase() === trimmedEmail.toLowerCase() && u.password === pass);

      if (localMatch) {
        const { password: _, ...safeUser } = localMatch;
        setCurrentUser(safeUser);
        setIsAuthenticated(true);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(safeUser));
        navigate(getRoleHomeUrl(safeUser.role));
        return { success: true };
      }
      return { success: false, error: err?.message || 'Email atau password salah.' };
    }
    return { success: false, error: 'Email atau password salah.' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    navigate('/login');
  };

  const [technologies, setTechnologies] = useState<Technology[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_tech`);
    return saved ? JSON.parse(saved) : INITIAL_TECHNOLOGIES;
  });

  const [findings, setFindings] = useState<Finding[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_findings`);
    return saved ? JSON.parse(saved) : INITIAL_FINDINGS;
  });

  const [evidences, setEvidences] = useState<Evidence[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_evidences`);
    return saved ? JSON.parse(saved) : INITIAL_EVIDENCES;
  });

  const [interviews, setInterviews] = useState<Interview[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_interviews`);
    return saved ? JSON.parse(saved) : INITIAL_INTERVIEWS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_logs`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Fetch initial data from SQLite Backend API
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [b, c, t, f, e, inv, u, logs, resMatrix] = await Promise.all([
          api.getBanks(),
          api.getCategories(),
          api.getTechnologies(),
          api.getFindings(),
          api.getEvidences(),
          api.getInterviews(),
          api.getUsers().catch(() => INITIAL_USERS),
          api.getAuditLogs(),
          api.getResearchMatrix().catch(() => [])
        ]);

        if (b && b.length > 0) setBanks(b);
        if (c && c.length > 0) setCategories(c);
        if (t && t.length > 0) setTechnologies(t);
        if (f && f.length > 0) setFindings(f);
        if (e && e.length > 0) setEvidences(e);
        if (inv && inv.length > 0) setInterviews(inv);
        if (u && u.length > 0) setUsers(u);
        if (logs && logs.length > 0) setAuditLogs(logs);
        if (resMatrix && resMatrix.length > 0) setResearchItems(resMatrix);

        api.getSyncStatus().then(st => { if (st) setSyncStatus(st); }).catch(() => {});

        setIsDbConnected(true);
      } catch (err) {
        console.warn('Backend SQLite API not reachable yet. Falling back to local state:', err);
        setIsDbConnected(false);
      }
    };

    fetchBackendData();
  }, []);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [confidenceFilter, setConfidenceFilter] = useState<ConfidenceLevel[]>(['Confirmed', 'Likely', 'Indicative']);
  const [selectedBanksFilter, setSelectedBanksFilter] = useState<string[]>(INITIAL_BANKS.map(b => b.id));
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Persistence to localStorage as secondary backup
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_tech`, JSON.stringify(technologies));
  }, [technologies]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_findings`, JSON.stringify(findings));
  }, [findings]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_evidences`, JSON.stringify(evidences));
  }, [evidences]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_interviews`, JSON.stringify(interviews));
  }, [interviews]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_logs`, JSON.stringify(auditLogs));
  }, [auditLogs]);

  const addAuditLog = (aksi: AuditLog['aksi'], entitas: AuditLog['entitas'], detail: string) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.nama,
      aksi,
      entitas,
      detail,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const switchUserRole = (role: UserRole) => {
    const matchedUser = users.find(u => u.role === role) || {
      id: `usr-${role.toLowerCase()}`,
      nama: `User (${role})`,
      email: `${role.toLowerCase()}@bri-workshop.id`,
      role,
      avatar: role === 'Admin' ? '👨‍💼' : role === 'Analyst' ? '👩‍💻' : '👔'
    };
    setCurrentUser(matchedUser);
  };

  const addFinding = async (findingData: Omit<Finding, 'id'>) => {
    const id = `f-${Date.now()}`;
    const newFinding: Finding = { ...findingData, id };
    setFindings(prev => [...prev, newFinding]);
    const tech = technologies.find(t => t.id === findingData.technologyId)?.nama || findingData.technologyId;
    const bank = banks.find(b => b.id === findingData.bankId)?.singkatan || findingData.bankId;
    addAuditLog('CREATE', 'Finding', `Menambahkan temuan ${tech} untuk ${bank} (${findingData.confidence})`);

    try {
      await api.createFinding(findingData, currentUser.nama);
    } catch (e) {
      console.warn('API error (saved locally):', e);
    }
  };

  const updateFinding = async (id: string, updates: Partial<Finding>) => {
    setFindings(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    addAuditLog('UPDATE', 'Finding', `Memperbarui temuan ID ${id}`);

    try {
      await api.updateFinding(id, updates, currentUser.nama);
    } catch (e) {
      console.warn('API error (saved locally):', e);
    }
  };

  const deleteFinding = async (id: string) => {
    setFindings(prev => prev.filter(f => f.id !== id));
    addAuditLog('DELETE', 'Finding', `Menghapus temuan ID ${id}`);

    try {
      await api.deleteFinding(id, currentUser.nama);
    } catch (e) {
      console.warn('API error (saved locally):', e);
    }
  };

  const publishFinding = async (id: string) => {
    setFindings(prev => prev.map(f => f.id === id ? { ...f, statusReview: 'Published' } : f));
    addAuditLog('PUBLISH', 'Finding', `Mempublikasikan temuan ID ${id}`);

    try {
      await api.updateFinding(id, { statusReview: 'Published' }, currentUser.nama);
    } catch (e) {
      console.warn('API error (saved locally):', e);
    }
  };

  const addTechnology = async (techData: Omit<Technology, 'id'>) => {
    const id = `tech-${Date.now()}`;
    const newTech: Technology = { ...techData, id };
    setTechnologies(prev => [...prev, newTech]);
    addAuditLog('CREATE', 'Technology', `Menambahkan teknologi baru: ${techData.nama}`);

    try {
      await api.createTechnology(techData, currentUser.nama);
    } catch (e) {
      console.warn('API error (saved locally):', e);
    }
  };

  const updateTechnology = async (id: string, updates: Partial<Technology>) => {
    setTechnologies(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    addAuditLog('UPDATE', 'Technology', `Memperbarui teknologi ID ${id}`);

    try {
      await api.updateTechnology(id, updates, currentUser.nama);
    } catch (e) {
      console.warn('API error (saved locally):', e);
    }
  };

  const deleteTechnology = async (id: string) => {
    setTechnologies(prev => prev.filter(t => t.id !== id));
    setFindings(prev => prev.filter(f => f.technologyId !== id));
    addAuditLog('DELETE', 'Technology', `Menghapus teknologi ID ${id} dan temuan terkait`);

    try {
      await api.deleteTechnology(id, currentUser.nama);
    } catch (e) {
      console.warn('API error (saved locally):', e);
    }
  };

  const addEvidence = async (evidenceData: Omit<Evidence, 'id'>) => {
    const id = `ev-${Date.now()}`;
    const newEv: Evidence = { ...evidenceData, id };
    setEvidences(prev => [...prev, newEv]);
    // Link to finding
    setFindings(prev => prev.map(f => {
      if (f.id === evidenceData.findingId) {
        return {
          ...f,
          evidenceIds: [...f.evidenceIds, id]
        };
      }
      return f;
    }));
    addAuditLog('CREATE', 'Evidence', `Menambahkan bukti baru: ${evidenceData.judul}`);

    try {
      await api.createEvidence(evidenceData);
    } catch (e) {
      console.warn('API error (saved locally):', e);
    }
  };

  const updateEvidence = async (id: string, updates: Partial<Evidence>) => {
    setEvidences(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    addAuditLog('UPDATE', 'Evidence', `Memperbarui bukti ID ${id}`);

    try {
      await api.updateEvidence(id, updates, currentUser.nama);
    } catch (e) {
      console.warn('API error (saved locally):', e);
    }
  };

  const deleteEvidence = async (id: string) => {
    setEvidences(prev => prev.filter(e => e.id !== id));
    setFindings(prev => prev.map(f => ({
      ...f,
      evidenceIds: f.evidenceIds.filter(eid => eid !== id)
    })));
    addAuditLog('DELETE', 'Evidence', `Menghapus bukti ID ${id}`);

    try {
      await api.deleteEvidence(id, currentUser.nama);
    } catch (e) {
      console.warn('API error (saved locally):', e);
    }
  };

  const addInterview = async (interviewData: Omit<Interview, 'id'>) => {
    const id = `int-${Date.now()}`;
    const newInt: Interview = { ...interviewData, id };
    setInterviews(prev => [...prev, newInt]);
    addAuditLog('CREATE', 'Interview', `Mencatat wawancara ${interviewData.kodeNarasumber}`);

    try {
      await api.createInterview(interviewData, currentUser.nama);
    } catch (e) {
      console.warn('API error (saved locally):', e);
    }
  };

  const updateInterview = async (id: string, updates: Partial<Interview>) => {
    setInterviews(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    addAuditLog('UPDATE', 'Interview', `Memperbarui wawancara ID ${id}`);

    try {
      await api.updateInterview(id, updates, currentUser.nama);
    } catch (e) {
      console.warn('API error (saved locally):', e);
    }
  };

  const deleteInterview = async (id: string) => {
    setInterviews(prev => prev.filter(item => item.id !== id));
    addAuditLog('DELETE', 'Interview', `Menghapus wawancara ID ${id}`);

    try {
      await api.deleteInterview(id, currentUser.nama);
    } catch (e) {
      console.warn('API error (saved locally):', e);
    }
  };

  const exportDataJSON = () => {
    const payload = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      banks,
      categories,
      technologies,
      findings,
      evidences,
      interviews,
      auditLogs
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `competitor-intelligence-bri-himbara-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.technologies && Array.isArray(data.technologies)) {
        setTechnologies(data.technologies);
      }
      if (data.findings && Array.isArray(data.findings)) {
        setFindings(data.findings);
      }
      if (data.evidences && Array.isArray(data.evidences)) {
        setEvidences(data.evidences);
      }
      if (data.interviews && Array.isArray(data.interviews)) {
        setInterviews(data.interviews);
      }
      addAuditLog('IMPORT', 'Finding', 'Mengimpor dataset eksternal');
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const exportMatrixCSV = () => {
    const headers = ['Kategori', 'Teknologi', 'Vendor', 'Tipe', ...banks.map(b => b.singkatan)];
    const rows = technologies.map(tech => {
      const category = categories.find(c => c.id === tech.categoryId)?.nama || '';
      const bankStatuses = banks.map(bank => {
        const finding = findings.find(f => f.bankId === bank.id && f.technologyId === tech.id);
        if (!finding) return 'Tidak Terdeteksi';
        return `${finding.confidence} (${finding.statusReview})`;
      });
      return [
        `"${category}"`,
        `"${tech.nama}"`,
        `"${tech.vendor}"`,
        `"${tech.tipe}"`,
        ...bankStatuses.map(s => `"${s}"`)
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `matrix-tech-stack-bri-vs-himbara-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateResearchCell = async (capId: string, bankCode: string, updates: Partial<BankCapabilityDetail>) => {
    const bankKey = bankCode.toLowerCase();
    setResearchItems(prev => {
      const next = prev.map(item => {
        if (item.id !== capId) return item;
        const currentBank = item.banks[bankKey] || {
          bankCode: bankCode.toUpperCase(),
          merk: '-',
          link: '',
          url: '',
          pic: 'Admin',
          status: 'Belum'
        };
        return {
          ...item,
          banks: {
            ...item.banks,
            [bankKey]: {
              ...currentBank,
              ...updates
            }
          }
        };
      });
      localStorage.setItem(RESEARCH_STORAGE_KEY, JSON.stringify(next));
      return next;
    });

    try {
      await api.updateResearchCell(capId, bankCode, updates, currentUser.nama);
    } catch (err) {
      console.warn('Backend update failed, kept in local state:', err);
    }

    addAuditLog('UPDATE', 'Finding', `Pembaruan riset kapabilitas #${capId} bank ${bankCode.toUpperCase()} (${updates.status || 'Updated'})`);
  };

  const updateResearchCapability = async (capId: string, updates: Partial<ResearchItem>) => {
    setResearchItems(prev => {
      const next = prev.map(item => {
        if (item.id !== capId) return item;
        return {
          ...item,
          ...updates,
          banks: updates.banks ? { ...item.banks, ...updates.banks } : item.banks
        };
      });
      localStorage.setItem(RESEARCH_STORAGE_KEY, JSON.stringify(next));
      return next;
    });

    try {
      await api.updateResearchCapability(capId, updates, currentUser.nama);
    } catch (err) {
      console.warn('Backend update failed, kept in local state:', err);
    }

    addAuditLog('UPDATE', 'Finding', `Pembaruan data kapabilitas riset #${capId} (${updates.kapabilitas || 'Meta'})`);
  };

  const addResearchCapability = async (data: Omit<ResearchItem, 'id' | 'no'>) => {
    const nextNo = researchItems.length > 0 ? Math.max(...researchItems.map(r => r.no)) + 1 : 1;
    const newId = `cap-${nextNo}`;
    
    const defaultBanks: Record<string, BankCapabilityDetail> = {
      bri: { bankCode: 'BRI', merk: '-', link: '', url: '', pic: 'Admin', status: 'Belum' },
      mandiri: { bankCode: 'Mandiri', merk: '-', link: '', url: '', pic: 'Admin', status: 'Belum' },
      bca: { bankCode: 'BCA', merk: '-', link: '', url: '', pic: 'Admin', status: 'Belum' },
      bni: { bankCode: 'BNI', merk: '-', link: '', url: '', pic: 'Admin', status: 'Belum' },
      btn: { bankCode: 'BTN', merk: '-', link: '', url: '', pic: 'Admin', status: 'Belum' },
      bsi: { bankCode: 'BSI', merk: '-', link: '', url: '', pic: 'Admin', status: 'Belum' }
    };

    const newItem: ResearchItem = {
      id: newId,
      no: nextNo,
      workshop: data.workshop,
      domain: data.domain,
      kategori: data.kategori,
      kapabilitas: data.kapabilitas,
      banks: data.banks ? { ...defaultBanks, ...data.banks } : defaultBanks
    };

    setResearchItems(prev => {
      const next = [...prev, newItem];
      localStorage.setItem(RESEARCH_STORAGE_KEY, JSON.stringify(next));
      return next;
    });

    try {
      await api.createResearchCapability({ ...data, banks: newItem.banks }, currentUser.nama);
    } catch (err) {
      console.warn('Backend creation failed, kept in local state:', err);
    }

    addAuditLog('CREATE', 'Finding', `Menambahkan kapabilitas riset baru #${nextNo}: ${data.kapabilitas} (${data.workshop})`);
  };

  const deleteResearchCapability = async (capId: string) => {
    setResearchItems(prev => {
      const next = prev.filter(r => r.id !== capId);
      localStorage.setItem(RESEARCH_STORAGE_KEY, JSON.stringify(next));
      return next;
    });

    try {
      await api.deleteResearchCapability(capId, currentUser.nama);
    } catch (err) {
      console.warn('Backend delete failed, kept in local state:', err);
    }

    addAuditLog('DELETE', 'Finding', `Menghapus kapabilitas riset ID ${capId}`);
  };

  const exportResearchMatrixCSV = () => {
    const headers = [
      'No', 'Workshop', 'Domain', 'Kategori', 'Kapabilitas/Sistem yang Dicari',
      'BRI (Merk)', 'BRI (Status)', 'BRI (Link)', 'BRI (PIC)',
      'Mandiri (Merk)', 'Mandiri (Status)', 'Mandiri (Link)', 'Mandiri (PIC)',
      'BCA (Merk)', 'BCA (Status)', 'BCA (Link)', 'BCA (PIC)',
      'BNI (Merk)', 'BNI (Status)', 'BNI (Link)', 'BNI (PIC)',
      'BTN (Merk)', 'BTN (Status)', 'BTN (Link)', 'BTN (PIC)',
      'BSI (Merk)', 'BSI (Status)', 'BSI (Link)', 'BSI (PIC)'
    ];

    const escapeCSV = (val: any) => {
      const str = String(val || '').replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = researchItems.map(item => {
      const bri = item.banks?.bri || ({} as any);
      const mandiri = item.banks?.mandiri || ({} as any);
      const bca = item.banks?.bca || ({} as any);
      const bni = item.banks?.bni || ({} as any);
      const btn = item.banks?.btn || ({} as any);
      const bsi = item.banks?.bsi || ({} as any);

      return [
        item.no,
        escapeCSV(item.workshop),
        escapeCSV(item.domain),
        escapeCSV(item.kategori),
        escapeCSV(item.kapabilitas),
        escapeCSV(bri.merk), escapeCSV(bri.status), escapeCSV(bri.link), escapeCSV(bri.pic),
        escapeCSV(mandiri.merk), escapeCSV(mandiri.status), escapeCSV(mandiri.link), escapeCSV(mandiri.pic),
        escapeCSV(bca.merk), escapeCSV(bca.status), escapeCSV(bca.link), escapeCSV(bca.pic),
        escapeCSV(bni.merk), escapeCSV(bni.status), escapeCSV(bni.link), escapeCSV(bni.pic),
        escapeCSV(btn.merk), escapeCSV(btn.status), escapeCSV(btn.link), escapeCSV(btn.pic),
        escapeCSV(bsi.merk), escapeCSV(bsi.status), escapeCSV(bsi.link), escapeCSV(bsi.pic)
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Banking_Technology_Research_Matrix_408_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetAllData = async () => {
    setTechnologies(INITIAL_TECHNOLOGIES);
    setFindings(INITIAL_FINDINGS);
    setEvidences(INITIAL_EVIDENCES);
    setInterviews(INITIAL_INTERVIEWS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    localStorage.removeItem(`${STORAGE_KEY}_tech`);
    localStorage.removeItem(`${STORAGE_KEY}_findings`);
    localStorage.removeItem(`${STORAGE_KEY}_evidences`);
    localStorage.removeItem(`${STORAGE_KEY}_interviews`);
    localStorage.removeItem(`${STORAGE_KEY}_logs`);
    addAuditLog('UPDATE', 'Finding', 'Mereset data kembali ke versi bawaan awal');

    try {
      await api.resetData();
    } catch (e) {
      console.warn('API reset error:', e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        banks,
        categories,
        technologies,
        findings,
        evidences,
        interviews,
        currentUser,
        users,
        auditLogs,
        isDbConnected,

        // Research Matrix (408 Capabilities from Sheet)
        researchItems,
        selectedResearchCell,
        setSelectedResearchCell,
        updateResearchCell,
        updateResearchCapability,
        addResearchCapability,
        deleteResearchCapability,
        exportResearchMatrixCSV,

        // Google Sheets Sync
        syncStatus,
        isSyncing,
        isSyncModalOpen,
        setIsSyncModalOpen,
        pullGoogleSheet,
        pushGoogleSheet,
        updateSyncConfig,
        refreshSyncStatus,

        // Theme Mode (Light / Dark)
        theme,
        toggleTheme,
        setTheme,

        // Auth & Routing
        isAuthenticated,
        login,
        logout,
        getRoleHomeUrl,
        currentPath,
        navigate,

        activeTab,
        setActiveTab,
        selectedBankId,
        setSelectedBankId,
        selectedTechId,
        setSelectedTechId,
        selectedFindingModalId,
        setSelectedFindingModalId,
        selectedCategoryId,
        setSelectedCategoryId,
        searchQuery,
        setSearchQuery,
        confidenceFilter,
        setConfidenceFilter,
        selectedBanksFilter,
        setSelectedBanksFilter,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        switchUserRole,
        addFinding,
        updateFinding,
        deleteFinding,
        publishFinding,
        addTechnology,
        updateTechnology,
        deleteTechnology,
        addEvidence,
        updateEvidence,
        deleteEvidence,
        addInterview,
        updateInterview,
        deleteInterview,
        exportDataJSON,
        importDataJSON,
        exportMatrixCSV,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
