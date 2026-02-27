"use client";

import { useState } from "react";
import GeometricPattern from "./components/GeometricPattern";

// Demo users for the admin panel
const DEMO_USERS = [
  { id: 1, name: "Adonai Gabriel", email: "adonai@virtuallit.com.br", role: "Administrador", status: "Ativo", lastAccess: "27/02/2026 09:30" },
  { id: 2, name: "Suporte VirtuAllIT", email: "suporte@virtuallit.com.br", role: "Operador", status: "Ativo", lastAccess: "26/02/2026 14:15" },
  { id: 3, name: "Comunicação", email: "comm@virtuallit.com.br", role: "Visualizador", status: "Ativo", lastAccess: "25/02/2026 11:00" },
];

// SVG Icons as components
function IconShield() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

function IconUsers() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function IconBot() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>
    </svg>
  );
}

function IconSettings() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function IconLogOut() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
}

function IconMail() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

function IconLock() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

function IconPlus() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="M12 5v14"/>
    </svg>
  );
}

function IconEdit() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    </svg>
  );
}

function IconTrash() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
  );
}

function IconActivity() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>
    </svg>
  );
}

function IconMessageSquare() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function IconDatabase() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>
    </svg>
  );
}

// ==================== LOGIN PAGE ====================
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (email === "adonai@virtuallit.com.br" && password === "admin123") {
        onLogin();
      } else {
        setError("Credenciais inválidas. Tente novamente.");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4 relative">
      <GeometricPattern />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/allia-logo.png" alt="AllIA - VirtuHelper" className="h-24 w-auto" />
        </div>

        {/* Login Card */}
        <div className="card p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-500 mt-2">Acesse o gerenciamento da AllIA</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <IconMail />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <IconLock />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Autenticando...
                </>
              ) : (
                <>
                  <IconShield />
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Acesso restrito a administradores autorizados
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Powered by{" "}
            <span className="font-semibold text-brand-red">VirtuAllIT</span>{" "}
            Solutions
          </p>
        </div>
      </div>
    </div>
  );
}

// ==================== SIDEBAR ====================
function Sidebar({ activeTab, setActiveTab, onLogout }: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <IconActivity /> },
    { id: "users", label: "Usuários", icon: <IconUsers /> },
    { id: "chatbot", label: "Chatbot", icon: <IconBot /> },
    { id: "knowledge", label: "Base de Conhecimento", icon: <IconDatabase /> },
    { id: "messages", label: "Mensagens", icon: <IconMessageSquare /> },
    { id: "settings", label: "Configurações", icon: <IconSettings /> },
  ];

  return (
    <aside className="w-64 bg-brand-black min-h-screen flex flex-col shrink-0">
      {/* Header */}
      <div className="p-5 border-b border-gray-800">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-brand-red text-white shadow-lg shadow-red-900/30"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User info & Logout */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Adonai Gabriel</p>
            <p className="text-xs text-gray-500 truncate">Administrador</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 hover:bg-gray-800/50 rounded-lg text-sm transition-all duration-200"
        >
          <IconLogOut />
          Sair
        </button>
      </div>
    </aside>
  );
}

// ==================== DASHBOARD TAB ====================
function DashboardTab() {
  const stats = [
    { label: "Usuários Ativos", value: "3", change: "+1 este mês", color: "bg-blue-500" },
    { label: "Mensagens Hoje", value: "47", change: "+12% vs ontem", color: "bg-green-500" },
    { label: "Sessões de Suporte", value: "12", change: "3 em andamento", color: "bg-purple-500" },
    { label: "Artigos na Base", value: "156", change: "Broadcom/VMware", color: "bg-orange-500" },
  ];

  const icons = [<IconUsers key="u" />, <IconMessageSquare key="m" />, <IconBot key="b" />, <IconDatabase key="d" />];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Visão geral do sistema AllIA</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                {icons[i]}
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm font-medium text-gray-600 mt-1">{stat.label}</p>
            <p className="text-xs text-gray-400 mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h2>
        <div className="space-y-4">
          {[
            { time: "09:30", action: "Login realizado", user: "adonai@virtuallit.com.br", type: "auth" },
            { time: "09:15", action: "Novo ticket de suporte #1247", user: "cliente@empresa.com", type: "support" },
            { time: "08:45", action: "Base de conhecimento atualizada", user: "Sistema", type: "system" },
            { time: "08:30", action: "Chatbot respondeu 5 perguntas", user: "AllIA (Bot)", type: "bot" },
            { time: "08:00", action: "Backup automático concluído", user: "Sistema", type: "system" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
              <span className="text-xs font-mono text-gray-400 w-12">{activity.time}</span>
              <div className={`w-2 h-2 rounded-full ${
                activity.type === "auth" ? "bg-green-500" :
                activity.type === "support" ? "bg-blue-500" :
                activity.type === "bot" ? "bg-purple-500" :
                "bg-gray-400"
              }`} />
              <div className="flex-1">
                <p className="text-sm text-gray-700">{activity.action}</p>
                <p className="text-xs text-gray-400">{activity.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== USERS TAB ====================
function UsersTab() {
  const [users, setUsers] = useState(DEMO_USERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Operador" });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      id: users.length + 1,
      ...newUser,
      status: "Ativo",
      lastAccess: "Nunca",
    };
    setUsers([...users, user]);
    setShowAddModal(false);
    setNewUser({ name: "", email: "", role: "Operador" });
  };

  const handleDeleteUser = (id: number) => {
    if (id === 1) return;
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usuários Autorizados</h1>
          <p className="text-gray-500 mt-1">Gerencie os usuários com acesso ao painel</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <IconPlus />
          Novo Usuário
        </button>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuário</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Função</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Último Acesso</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-brand-red rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === "Administrador"
                      ? "bg-red-100 text-red-800"
                      : user.role === "Operador"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${user.status === "Ativo" ? "bg-green-500" : "bg-gray-400"}`} />
                    <span className="text-sm text-gray-600">{user.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.lastAccess}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors">
                      <IconEdit />
                    </button>
                    {user.id !== 1 && (
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <IconTrash />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Adicionar Novo Usuário</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="input-field"
                  placeholder="Nome do usuário"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="input-field"
                  placeholder="email@empresa.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Função</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="input-field"
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Operador">Operador</option>
                  <option value="Visualizador">Visualizador</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary flex-1 text-sm"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary flex-1 text-sm">
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== CHATBOT TAB ====================
function ChatbotTab() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Configuração do Chatbot</h1>
        <p className="text-gray-500 mt-1">Gerencie a AllIA - VirtuHelper da VirtuAllIT</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Status do Bot</h2>
          <div className="space-y-4">
            {[
              { label: "Plataforma", value: "Botpress Cloud", status: "info" },
              { label: "WhatsApp", value: "Pendente", status: "warning" },
              { label: "Base de Conhecimento", value: "Em configuração", status: "warning" },
              { label: "Autenticação 2FA", value: "Pendente", status: "warning" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className={`inline-flex items-center gap-1.5 text-sm ${
                  item.status === "info" ? "text-gray-900 font-medium" : ""
                }`}>
                  {item.status === "warning" && <span className="w-2 h-2 rounded-full bg-yellow-500" />}
                  <span className={item.status === "warning" ? "font-medium text-yellow-600" : ""}>{item.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Personalidade da AllIA</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Nome</label>
              <p className="text-sm text-gray-900">AllIA - VirtuHelper</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tom de Comunicação</label>
              <p className="text-sm text-gray-900">Clara, objetiva e técnica quando necessário. Amigável sem ser infantil.</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Funções</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {["Suporte N1", "FAQ", "Autenticação", "Base VMware", "Abertura de Tickets"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Disponibilidade</label>
              <p className="text-sm text-gray-900">24/7 - Sempre disponível</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== KNOWLEDGE BASE TAB ====================
function KnowledgeTab() {
  const sources = [
    { name: "Broadcom Support Portal", url: "support.broadcom.com", docs: 45, status: "Indexado" },
    { name: "Broadcom TechDocs", url: "techdocs.broadcom.com", docs: 67, status: "Indexado" },
    { name: "Broadcom Knowledge Base", url: "knowledge.broadcom.com", docs: 32, status: "Pendente" },
    { name: "VMware Resource Center", url: "vmware.com/resources", docs: 12, status: "Pendente" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Base de Conhecimento</h1>
        <p className="text-gray-500 mt-1">Fontes de documentação para suporte técnico</p>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fonte</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Documentos</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((source, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-900">{source.name}</p>
                  <p className="text-xs text-gray-400">{source.url}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{source.docs} artigos</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 text-sm ${
                    source.status === "Indexado" ? "text-green-600" : "text-yellow-600"
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      source.status === "Indexado" ? "bg-green-500" : "bg-yellow-500"
                    }`} />
                    {source.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==================== MESSAGES TAB ====================
function MessagesTab() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mensagens</h1>
        <p className="text-gray-500 mt-1">Histórico de conversas do chatbot</p>
      </div>

      <div className="card p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
          <IconMessageSquare />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma mensagem ainda</h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          As mensagens do chatbot WhatsApp aparecerão aqui assim que a integração com o Botpress estiver configurada.
        </p>
      </div>
    </div>
  );
}

// ==================== SETTINGS TAB ====================
function SettingsTab() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-500 mt-1">Configurações gerais do sistema</p>
      </div>

      <div className="space-y-6">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Integrações</h2>
          <div className="space-y-4">
            {[
              { name: "Supabase (Database)", status: "Configurado", connected: true },
              { name: "Botpress Cloud", status: "Pendente", connected: false },
              { name: "WhatsApp Business API", status: "Pendente", connected: false },
              { name: "Pipedrive CRM", status: "Pendente", connected: false },
              { name: "Resend (Email 2FA)", status: "Pendente", connected: false },
            ].map((integration, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{integration.name}</p>
                  <p className="text-xs text-gray-400">{integration.status}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                  integration.connected
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    integration.connected ? "bg-green-500" : "bg-gray-400"
                  }`} />
                  {integration.connected ? "Conectado" : "Desconectado"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Segurança</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-900">Autenticação 2FA</p>
                <p className="text-xs text-gray-400">Verificação por email com código</p>
              </div>
              <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">Em breve</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-gray-900">Validação Pipedrive</p>
                <p className="text-xs text-gray-400">Autenticação de clientes via CRM</p>
              </div>
              <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">Em breve</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardTab />;
      case "users": return <UsersTab />;
      case "chatbot": return <ChatbotTab />;
      case "knowledge": return <KnowledgeTab />;
      case "messages": return <MessagesTab />;
      case "settings": return <SettingsTab />;
      default: return <DashboardTab />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsLoggedIn(false)} />
      <main className="flex-1 overflow-auto">
        <div className="flex items-center justify-end p-4 pb-0">
          <img src="/allia-logo.png" alt="AllIA" className="h-12 w-auto" />
        </div>
        <div className="px-8 pb-8 pt-4">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
