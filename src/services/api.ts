import { Bank, Category, Technology, Finding, Evidence, Interview, User, AuditLog } from '../types';

const API_BASE = '/api';

export const api = {
  async getBanks(): Promise<Bank[]> {
    const res = await fetch(`${API_BASE}/banks`);
    if (!res.ok) throw new Error('Failed to fetch banks');
    return res.json();
  },

  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  async getTechnologies(): Promise<Technology[]> {
    const res = await fetch(`${API_BASE}/technologies`);
    if (!res.ok) throw new Error('Failed to fetch technologies');
    return res.json();
  },

  async createTechnology(tech: Omit<Technology, 'id'>, userName?: string): Promise<Technology> {
    const res = await fetch(`${API_BASE}/technologies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...tech, userName })
    });
    if (!res.ok) throw new Error('Failed to create technology');
    return res.json();
  },

  async updateTechnology(id: string, updates: Partial<Technology>, userName?: string): Promise<Technology> {
    const res = await fetch(`${API_BASE}/technologies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updates, userName })
    });
    if (!res.ok) throw new Error('Failed to update technology');
    return res.json();
  },

  async deleteTechnology(id: string, userName?: string): Promise<void> {
    const res = await fetch(`${API_BASE}/technologies/${id}?userName=${encodeURIComponent(userName || 'Admin')}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete technology');
  },

  async getFindings(): Promise<Finding[]> {
    const res = await fetch(`${API_BASE}/findings`);
    if (!res.ok) throw new Error('Failed to fetch findings');
    return res.json();
  },

  async createFinding(finding: Omit<Finding, 'id'>, userName?: string): Promise<Finding> {
    const res = await fetch(`${API_BASE}/findings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...finding, userName })
    });
    if (!res.ok) throw new Error('Failed to create finding');
    return res.json();
  },

  async updateFinding(id: string, updates: Partial<Finding>, userName?: string): Promise<Finding> {
    const res = await fetch(`${API_BASE}/findings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updates, userName })
    });
    if (!res.ok) throw new Error('Failed to update finding');
    return res.json();
  },

  async deleteFinding(id: string, userName?: string): Promise<void> {
    const res = await fetch(`${API_BASE}/findings/${id}?userName=${encodeURIComponent(userName || 'Admin')}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete finding');
  },

  async getEvidences(): Promise<Evidence[]> {
    const res = await fetch(`${API_BASE}/evidences`);
    if (!res.ok) throw new Error('Failed to fetch evidences');
    return res.json();
  },

  async createEvidence(evidence: Omit<Evidence, 'id'>): Promise<Evidence> {
    const res = await fetch(`${API_BASE}/evidences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(evidence)
    });
    if (!res.ok) throw new Error('Failed to create evidence');
    return res.json();
  },

  async updateEvidence(id: string, updates: Partial<Evidence>, userName?: string): Promise<Evidence> {
    const res = await fetch(`${API_BASE}/evidences/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updates, userName })
    });
    if (!res.ok) throw new Error('Failed to update evidence');
    return res.json();
  },

  async deleteEvidence(id: string, userName?: string): Promise<void> {
    const res = await fetch(`${API_BASE}/evidences/${id}?userName=${encodeURIComponent(userName || 'Admin')}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete evidence');
  },

  async getInterviews(): Promise<Interview[]> {
    const res = await fetch(`${API_BASE}/interviews`);
    if (!res.ok) throw new Error('Failed to fetch interviews');
    return res.json();
  },

  async createInterview(interview: Omit<Interview, 'id'>, userName?: string): Promise<Interview> {
    const res = await fetch(`${API_BASE}/interviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...interview, userName })
    });
    if (!res.ok) throw new Error('Failed to create interview');
    return res.json();
  },

  async updateInterview(id: string, updates: Partial<Interview>, userName?: string): Promise<Interview> {
    const res = await fetch(`${API_BASE}/interviews/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updates, userName })
    });
    if (!res.ok) throw new Error('Failed to update interview');
    return res.json();
  },

  async deleteInterview(id: string, userName?: string): Promise<void> {
    const res = await fetch(`${API_BASE}/interviews/${id}?userName=${encodeURIComponent(userName || 'Admin')}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete interview');
  },

  async getUsers(): Promise<User[]> {
    const res = await fetch(`${API_BASE}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  async login(email: string, password: string): Promise<{ success: boolean; user: User; token: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Login gagal, periksa email dan password.');
    }
    return res.json();
  },

  async getAuditLogs(): Promise<AuditLog[]> {
    const res = await fetch(`${API_BASE}/audit-logs`);
    if (!res.ok) throw new Error('Failed to fetch audit logs');
    return res.json();
  },

  async getResearchMatrix(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/research-matrix`);
    if (!res.ok) throw new Error('Failed to fetch research matrix');
    return res.json();
  },

  async updateResearchCell(capId: string, bankCode: string, updates: any, userName?: string): Promise<any> {
    const res = await fetch(`${API_BASE}/research-matrix/${capId}/${bankCode}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updates, userName })
    });
    if (!res.ok) throw new Error('Failed to update research cell');
    return res.json();
  },

  async updateResearchCapability(capId: string, updates: any, userName?: string): Promise<any> {
    const res = await fetch(`${API_BASE}/research-matrix/${capId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updates, userName })
    });
    if (!res.ok) throw new Error('Failed to update capability');
    return res.json();
  },

  async createResearchCapability(data: any, userName?: string): Promise<any> {
    const res = await fetch(`${API_BASE}/research-matrix`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, userName })
    });
    if (!res.ok) throw new Error('Failed to create capability');
    return res.json();
  },

  async deleteResearchCapability(capId: string, userName?: string): Promise<void> {
    const res = await fetch(`${API_BASE}/research-matrix/${capId}?userName=${encodeURIComponent(userName || 'Admin')}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete capability');
  },

  async resetData(): Promise<void> {
    const res = await fetch(`${API_BASE}/reset-data`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to reset data');
  },

  // Google Sheets Sync
  async getSyncStatus(): Promise<any> {
    const res = await fetch(`${API_BASE}/sync/status`);
    if (!res.ok) throw new Error('Failed to fetch sync status');
    return res.json();
  },

  async pullFromGoogleSheet(url?: string, userName?: string): Promise<any> {
    const res = await fetch(`${API_BASE}/sync/pull`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, userName })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to pull from Google Sheet');
    }
    return res.json();
  },

  async pushToGoogleSheet(webhookUrl?: string, userName?: string): Promise<any> {
    const res = await fetch(`${API_BASE}/sync/push`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ webhookUrl, userName })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to push to Google Sheet');
    }
    return res.json();
  },

  async updateSyncConfig(config: any): Promise<any> {
    const res = await fetch(`${API_BASE}/sync/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    if (!res.ok) throw new Error('Failed to update sync config');
    return res.json();
  },

  async getSyncHistory(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/sync/history`);
    if (!res.ok) throw new Error('Failed to fetch sync history');
    return res.json();
  }
};

