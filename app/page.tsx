"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import GeometricPattern from "./components/GeometricPattern";

// Types
interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  department: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ActivityLog {
  id: string;
  action: string;
  details: string | null;
  created_at: string;
  user_id: string | null;
}

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

function IconClipboard() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>
    </svg>
  );
}

function IconExternalLink() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  );
}

// ==================== LOGIN PAGE ====================
function LoginPage({ onLogin }: { onLogin: (profile: Profile) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        if (authError.message.includes("Invalid login")) {
          setError("Email ou senha incorretos.");
        } else {
          setError(authError.message);
        }
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Fetch profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (profileError || !profile) {
          setError("Perfil não encontrado. Contate o administrador.");
          setIsLoading(false);
          return;
        }

        if (!profile.is_active) {
          setError("Sua conta está desativada. Contate o administrador.");
          await supabase.auth.signOut();
          setIsLoading(false);
          return;
        }

        // Log activity
        await supabase.from("activity_log").insert({
          user_id: data.user.id,
          action: "Login realizado",
          details: email,
        });

        onLogin(profile as Profile);
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setIsLoading(false);
    }
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
function Sidebar({ activeTab, setActiveTab, onLogout, profile }: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  profile: Profile;
}) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <IconActivity /> },
    { id: "users", label: "Usuários", icon: <IconUsers /> },
    { id: "chatbot", label: "Chatbot", icon: <IconBot /> },
    { id: "knowledge", label: "Base de Conhecimento", icon: <IconDatabase /> },
    { id: "forms", label: "Formulários", icon: <IconClipboard /> },
    { id: "messages", label: "Mensagens", icon: <IconMessageSquare /> },
    { id: "settings", label: "Configurações", icon: <IconSettings /> },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

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
            {profile.full_name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{profile.full_name}</p>
            <p className="text-xs text-gray-500 truncate capitalize">{profile.role === "admin" ? "Administrador" : profile.role === "manager" ? "Gerente" : "Usuário"}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
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
function DashboardTab({ profile }: { profile: Profile }) {
  const [stats, setStats] = useState({ users: 0, messages: 0, sessions: 0, articles: 0 });
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        // Count users
        const { count: userCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("is_active", true);

        // Count knowledge base articles
        const { count: articleCount } = await supabase
          .from("knowledge_base")
          .select("*", { count: "exact", head: true });

        // Count chat sessions
        const { count: sessionCount } = await supabase
          .from("chat_sessions")
          .select("*", { count: "exact", head: true });

        // Count messages
        const { count: messageCount } = await supabase
          .from("chat_messages")
          .select("*", { count: "exact", head: true });

        setStats({
          users: userCount || 0,
          messages: messageCount || 0,
          sessions: sessionCount || 0,
          articles: articleCount || 0,
        });

        // Load recent activity
        const { data: activityData } = await supabase
          .from("activity_log")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10);

        setActivities(activityData || []);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [profile]);

  const statCards = [
    { label: "Usuários Ativos", value: String(stats.users), color: "bg-blue-500" },
    { label: "Mensagens", value: String(stats.messages), color: "bg-green-500" },
    { label: "Sessões de Suporte", value: String(stats.sessions), color: "bg-purple-500" },
    { label: "Artigos na Base", value: String(stats.articles), color: "bg-orange-500" },
  ];

  const icons = [<IconUsers key="u" />, <IconMessageSquare key="m" />, <IconBot key="b" />, <IconDatabase key="d" />];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Visão geral do sistema AllIA</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <svg className="animate-spin h-8 w-8 text-brand-red" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, i) => (
              <div key={i} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                    {icons[i]}
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h2>
            {activities.length === 0 ? (
              <p className="text-sm text-gray-400 py-4">Nenhuma atividade registrada ainda.</p>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                    <span className="text-xs font-mono text-gray-400 w-16">
                      {new Date(activity.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{activity.action}</p>
                      <p className="text-xs text-gray-400">{activity.details || ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ==================== USERS TAB ====================
function UsersTab({ profile }: { profile: Profile }) {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "user" });
  const [addError, setAddError] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) {
      setUsers(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    setAddLoading(true);

    try {
      // Check blocked domains
      const domain = newUser.email.split("@")[1];
      const { data: blocked } = await supabase
        .from("blocked_domains")
        .select("domain")
        .eq("domain", domain)
        .single();

      if (blocked) {
        setAddError("Este domínio de e-mail está bloqueado (concorrente/fabricante).");
        setAddLoading(false);
        return;
      }

      // Check organization user limit
      const { data: org } = await supabase
        .from("organizations")
        .select("max_users")
        .eq("domain", domain)
        .single();

      if (org) {
        const { count } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .like("email", `%@${domain}`);

        if (count && count >= org.max_users) {
          setAddError(`Limite de ${org.max_users} usuários para este domínio atingido.`);
          setAddLoading(false);
          return;
        }
      }

      // Create user via Supabase Auth Admin (using service role would be needed for production)
      // For now, use signUp which creates the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
        options: {
          data: {
            full_name: newUser.name,
            role: newUser.role,
          },
        },
      });

      if (authError) {
        setAddError(authError.message);
        setAddLoading(false);
        return;
      }

      if (authData.user) {
        // Update the profile role (trigger creates with default 'user')
        await supabase
          .from("profiles")
          .update({ role: newUser.role, full_name: newUser.name })
          .eq("id", authData.user.id);

        // Log activity
        await supabase.from("activity_log").insert({
          user_id: profile.id,
          action: "Novo usuário criado",
          details: `${newUser.name} (${newUser.email})`,
        });

        await loadUsers();
        setShowAddModal(false);
        setNewUser({ name: "", email: "", password: "", role: "user" });
      }
    } catch {
      setAddError("Erro ao criar usuário. Tente novamente.");
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (userId === profile.id) return; // Can't delete yourself

    if (!confirm(`Tem certeza que deseja desativar o usuário ${userName}?`)) return;

    const { error } = await supabase
      .from("profiles")
      .update({ is_active: false })
      .eq("id", userId);

    if (!error) {
      await supabase.from("activity_log").insert({
        user_id: profile.id,
        action: "Usuário desativado",
        details: userName,
      });
      await loadUsers();
    }
  };

  const roleLabel = (role: string) => {
    switch (role) {
      case "admin": return "Administrador";
      case "manager": return "Gerente";
      default: return "Usuário";
    }
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

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <svg className="animate-spin h-8 w-8 text-brand-red" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuário</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Função</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Criado em</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-brand-red rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-800"
                        : user.role === "manager"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {roleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${user.is_active ? "bg-green-500" : "bg-gray-400"}`} />
                      <span className="text-sm text-gray-600">{user.is_active ? "Ativo" : "Inativo"}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors">
                        <IconEdit />
                      </button>
                      {user.id !== profile.id && (
                        <button
                          onClick={() => handleDeleteUser(user.id, user.full_name)}
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
      )}

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
                <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="input-field"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Função</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="input-field"
                >
                  <option value="admin">Administrador</option>
                  <option value="manager">Gerente</option>
                  <option value="user">Usuário</option>
                </select>
              </div>
              {addError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {addError}
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setAddError(""); }}
                  className="btn-secondary flex-1 text-sm"
                >
                  Cancelar
                </button>
                <button type="submit" disabled={addLoading} className="btn-primary flex-1 text-sm disabled:opacity-70">
                  {addLoading ? "Criando..." : "Adicionar"}
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
  const [config, setConfig] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    async function loadConfig() {
      const { data } = await supabase
        .from("system_settings")
        .select("value")
        .eq("key", "chatbot_config")
        .single();
      if (data) setConfig(data.value as Record<string, unknown>);
    }
    loadConfig();
  }, []);

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
              { label: "Plataforma", value: (config?.platform as string) || "Botpress Cloud", status: "info" },
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
              <p className="text-sm text-gray-900">{(config?.name as string) || "AllIA"} - {(config?.subtitle as string) || "VirtuHelper"}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tom de Comunicação</label>
              <p className="text-sm text-gray-900">{(config?.personality as string) || "Clara, objetiva e técnica quando necessário. Amigável sem ser infantil."}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Funções</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {((config?.functions as string[]) || ["Suporte N1", "FAQ", "Autenticação", "Base VMware", "Abertura de Tickets", "Qualificação de Oportunidades"]).map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Disponibilidade</label>
              <p className="text-sm text-gray-900">{(config?.availability as string) || "24/7"} - Sempre disponível</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== KNOWLEDGE BASE TAB ====================
function KnowledgeTab() {
  const [articles, setArticles] = useState<{ id: string; title: string; category: string; source_url: string | null; is_published: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      const { data } = await supabase
        .from("knowledge_base")
        .select("*")
        .order("created_at", { ascending: false });
      setArticles(data || []);
      setLoading(false);
    }
    loadArticles();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Base de Conhecimento</h1>
        <p className="text-gray-500 mt-1">Fontes de documentação para suporte técnico</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <svg className="animate-spin h-8 w-8 text-brand-red" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : articles.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
            <IconDatabase />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Base vazia</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Os artigos da base de conhecimento aparecerão aqui conforme forem adicionados.
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Título</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoria</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{article.title}</p>
                    {article.source_url && <p className="text-xs text-gray-400">{article.source_url}</p>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{article.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-sm ${
                      article.is_published ? "text-green-600" : "text-yellow-600"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        article.is_published ? "bg-green-500" : "bg-yellow-500"
                      }`} />
                      {article.is_published ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ==================== MESSAGES TAB ====================
function MessagesTab() {
  const [sessions, setSessions] = useState<{ id: string; visitor_name: string | null; visitor_email: string | null; channel: string; status: string; started_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSessions() {
      const { data } = await supabase
        .from("chat_sessions")
        .select("*")
        .order("started_at", { ascending: false })
        .limit(50);
      setSessions(data || []);
      setLoading(false);
    }
    loadSessions();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mensagens</h1>
        <p className="text-gray-500 mt-1">Histórico de conversas do chatbot</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <svg className="animate-spin h-8 w-8 text-brand-red" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : sessions.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
            <IconMessageSquare />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma mensagem ainda</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            As conversas do chatbot aparecerão aqui assim que a integração com o Botpress estiver configurada.
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Visitante</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Canal</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Início</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{session.visitor_name || "Anônimo"}</p>
                    <p className="text-xs text-gray-400">{session.visitor_email || ""}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 capitalize">{session.channel}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-sm ${
                      session.status === "active" ? "text-green-600" : "text-gray-500"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        session.status === "active" ? "bg-green-500" : "bg-gray-400"
                      }`} />
                      {session.status === "active" ? "Ativa" : session.status === "escalated" ? "Escalada" : "Encerrada"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(session.started_at).toLocaleString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ==================== QUALIFICATION FORMS TAB ====================
interface QualificationForm {
  id: string;
  name: string;
  manufacturer: string;
  solution_category: string;
  survey_url: string;
  is_active: boolean;
  description: string | null;
  created_at: string;
  updated_at: string;
}

function FormsTab({ profile }: { profile: Profile }) {
  const [forms, setForms] = useState<QualificationForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingForm, setEditingForm] = useState<QualificationForm | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    solution_category: "",
    survey_url: "",
    description: "",
    is_active: true,
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState("");

  const loadForms = useCallback(async () => {
    const { data, error } = await supabase
      .from("qualification_forms")
      .select("*")
      .order("manufacturer", { ascending: true });

    if (!error && data) {
      setForms(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadForms();
  }, [loadForms]);

  const openAddModal = () => {
    setEditingForm(null);
    setFormData({
      name: "",
      manufacturer: "",
      solution_category: "",
      survey_url: "",
      description: "",
      is_active: true,
    });
    setSaveError("");
    setShowModal(true);
  };

  const openEditModal = (form: QualificationForm) => {
    setEditingForm(form);
    setFormData({
      name: form.name,
      manufacturer: form.manufacturer,
      solution_category: form.solution_category,
      survey_url: form.survey_url,
      description: form.description || "",
      is_active: form.is_active,
    });
    setSaveError("");
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError("");
    setSaveLoading(true);

    try {
      if (editingForm) {
        // Update existing
        const { error } = await supabase
          .from("qualification_forms")
          .update({
            name: formData.name,
            manufacturer: formData.manufacturer,
            solution_category: formData.solution_category,
            survey_url: formData.survey_url,
            description: formData.description || null,
            is_active: formData.is_active,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingForm.id);

        if (error) {
          setSaveError(error.message);
          setSaveLoading(false);
          return;
        }

        await supabase.from("activity_log").insert({
          user_id: profile.id,
          action: "Formul\u00e1rio atualizado",
          details: `${formData.manufacturer} - ${formData.name}`,
        });
      } else {
        // Create new
        const { error } = await supabase
          .from("qualification_forms")
          .insert({
            name: formData.name,
            manufacturer: formData.manufacturer,
            solution_category: formData.solution_category,
            survey_url: formData.survey_url,
            description: formData.description || null,
            is_active: formData.is_active,
          });

        if (error) {
          setSaveError(error.message);
          setSaveLoading(false);
          return;
        }

        await supabase.from("activity_log").insert({
          user_id: profile.id,
          action: "Formul\u00e1rio criado",
          details: `${formData.manufacturer} - ${formData.name}`,
        });
      }

      await loadForms();
      setShowModal(false);
    } catch {
      setSaveError("Erro ao salvar. Tente novamente.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleToggleActive = async (form: QualificationForm) => {
    const newStatus = !form.is_active;
    // Optimistic update
    setForms(prev => prev.map(f => f.id === form.id ? { ...f, is_active: newStatus } : f));
    
    const { error } = await supabase
      .from("qualification_forms")
      .update({ is_active: newStatus, updated_at: new Date().toISOString() })
      .eq("id", form.id);

    if (error) {
      console.error("Toggle error:", error);
      // Revert optimistic update
      setForms(prev => prev.map(f => f.id === form.id ? { ...f, is_active: !newStatus } : f));
      alert(`Erro ao alterar status: ${error.message}`);
    } else {
      await supabase.from("activity_log").insert({
        user_id: profile.id,
        action: newStatus ? "Formulário ativado" : "Formulário desativado",
        details: `${form.manufacturer} - ${form.name}`,
      });
    }
  };

  const handleDelete = async (form: QualificationForm) => {
    if (!confirm(`Tem certeza que deseja excluir o formul\u00e1rio "${form.name}"?`)) return;

    const { error } = await supabase
      .from("qualification_forms")
      .delete()
      .eq("id", form.id);

    if (!error) {
      await supabase.from("activity_log").insert({
        user_id: profile.id,
        action: "Formul\u00e1rio exclu\u00eddo",
        details: `${form.manufacturer} - ${form.name}`,
      });
      await loadForms();
    }
  };

  const manufacturers = Array.from(new Set(forms.map(f => f.manufacturer)));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Formul\u00e1rios de Qualifica\u00e7\u00e3o</h1>
          <p className="text-gray-500 mt-1">Roteamento de formul\u00e1rios SurveyMonkey por fabricante/solu\u00e7\u00e3o</p>
        </div>
        <button
          onClick={openAddModal}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <IconPlus />
          Novo Formul\u00e1rio
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <svg className="animate-spin h-8 w-8 text-brand-red" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : forms.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
            <IconClipboard />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum formul\u00e1rio cadastrado</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Adicione formul\u00e1rios de qualifica\u00e7\u00e3o para que a AllIA envie o link correto ao identificar uma oportunidade.
          </p>
          <button
            onClick={openAddModal}
            className="btn-primary inline-flex items-center gap-2 text-sm mt-6"
          >
            <IconPlus />
            Adicionar Primeiro Formul\u00e1rio
          </button>
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="card p-4">
              <p className="text-sm text-gray-500">Total de Formul\u00e1rios</p>
              <p className="text-2xl font-bold text-gray-900">{forms.length}</p>
            </div>
            <div className="card p-4">
              <p className="text-sm text-gray-500">Ativos</p>
              <p className="text-2xl font-bold text-green-600">{forms.filter(f => f.is_active).length}</p>
            </div>
            <div className="card p-4">
              <p className="text-sm text-gray-500">Fabricantes</p>
              <p className="text-2xl font-bold text-gray-900">{manufacturers.length}</p>
            </div>
          </div>

          {/* Forms table */}
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fabricante</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Formul\u00e1rio</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoria</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Link SurveyMonkey</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">A\u00e7\u00f5es</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form) => (
                  <tr key={form.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-50 text-red-700">
                        {form.manufacturer}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{form.name}</p>
                      {form.description && <p className="text-xs text-gray-400 mt-0.5">{form.description}</p>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{form.solution_category}</td>
                    <td className="px-6 py-4">
                      {form.survey_url && !form.survey_url.includes("placeholder") ? (
                        <a
                          href={form.survey_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          Abrir <IconExternalLink />
                        </a>
                      ) : (
                        <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full font-medium">Placeholder</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(form)}
                        className="inline-flex items-center gap-1.5 cursor-pointer"
                        title={form.is_active ? "Clique para desativar" : "Clique para ativar"}
                      >
                        <span className={`w-8 h-4 rounded-full relative transition-colors duration-200 ${
                          form.is_active ? "bg-green-500" : "bg-gray-300"
                        }`}>
                          <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform duration-200 ${
                            form.is_active ? "translate-x-4" : "translate-x-0.5"
                          }`} />
                        </span>
                        <span className={`text-xs font-medium ${
                          form.is_active ? "text-green-600" : "text-gray-400"
                        }`}>
                          {form.is_active ? "Ativo" : "Inativo"}
                        </span>
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(form)}
                          className="p-2 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <IconEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(form)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingForm ? "Editar Formul\u00e1rio" : "Novo Formul\u00e1rio de Qualifica\u00e7\u00e3o"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fabricante</label>
                  <input
                    type="text"
                    required
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    className="input-field"
                    placeholder="Ex: Dell, VMware"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria da Solu\u00e7\u00e3o</label>
                  <input
                    type="text"
                    required
                    value={formData.solution_category}
                    onChange={(e) => setFormData({ ...formData, solution_category: e.target.value })}
                    className="input-field"
                    placeholder="Ex: Servidores, Virtualiza\u00e7\u00e3o"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Formul\u00e1rio</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="Ex: Qualifica\u00e7\u00e3o Dell Servidores"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL do SurveyMonkey</label>
                <input
                  type="url"
                  required
                  value={formData.survey_url}
                  onChange={(e) => setFormData({ ...formData, survey_url: e.target.value })}
                  className="input-field"
                  placeholder="https://pt.surveymonkey.com/r/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descri\u00e7\u00e3o (opcional)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  rows={2}
                  placeholder="Breve descri\u00e7\u00e3o do formul\u00e1rio..."
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                  className="inline-flex items-center gap-2"
                >
                  <span className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${
                    formData.is_active ? "bg-green-500" : "bg-gray-300"
                  }`}>
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                      formData.is_active ? "translate-x-5" : "translate-x-0.5"
                    }`} />
                  </span>
                  <span className="text-sm text-gray-700">{formData.is_active ? "Ativo" : "Inativo"}</span>
                </button>
              </div>
              {saveError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {saveError}
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setSaveError(""); }}
                  className="btn-secondary flex-1 text-sm"
                >
                  Cancelar
                </button>
                <button type="submit" disabled={saveLoading} className="btn-primary flex-1 text-sm disabled:opacity-70">
                  {saveLoading ? "Salvando..." : editingForm ? "Salvar Altera\u00e7\u00f5es" : "Adicionar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== SETTINGS TAB ====================
function SettingsTab() {
  const [integrations, setIntegrations] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase
        .from("system_settings")
        .select("value")
        .eq("key", "integrations")
        .single();
      if (data) setIntegrations(data.value as Record<string, string>);
    }
    loadSettings();
  }, []);

  const integrationList = [
    { key: "supabase", name: "Supabase (Database)", fallbackStatus: "connected" },
    { key: "botpress", name: "Botpress Cloud", fallbackStatus: "pending" },
    { key: "whatsapp", name: "WhatsApp Business API", fallbackStatus: "pending" },
    { key: "pipedrive", name: "Pipedrive CRM", fallbackStatus: "pending" },
    { key: "resend", name: "Resend (Email 2FA)", fallbackStatus: "pending" },
    { key: "surveymonkey", name: "SurveyMonkey (Qualificação)", fallbackStatus: "pending" },
  ];

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
            {integrationList.map((integration) => {
              const status = integrations?.[integration.key] || integration.fallbackStatus;
              const connected = status === "connected";
              return (
                <div key={integration.key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{integration.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{status === "connected" ? "Configurado" : "Pendente"}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                    connected
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      connected ? "bg-green-500" : "bg-gray-400"
                    }`} />
                    {connected ? "Conectado" : "Desconectado"}
                  </span>
                </div>
              );
            })}
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
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-900">Controle por Domínio</p>
                <p className="text-xs text-gray-400">Limite de usuários por organização</p>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">Ativo</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-gray-900">Blocklist de Concorrentes</p>
                <p className="text-xs text-gray-400">Domínios bloqueados para cadastro</p>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">Ativo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================
export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileData && profileData.is_active) {
          setProfile(profileData as Profile);
        }
      }
      setCheckingSession(false);
    }
    checkSession();
  }, []);

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-brand-red" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  if (!profile) {
    return <LoginPage onLogin={(p) => setProfile(p)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardTab profile={profile} />;
      case "users": return <UsersTab profile={profile} />;
      case "chatbot": return <ChatbotTab />;
      case "knowledge": return <KnowledgeTab />;
      case "forms": return <FormsTab profile={profile} />;
      case "messages": return <MessagesTab />;
      case "settings": return <SettingsTab />;
      default: return <DashboardTab profile={profile} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setProfile(null)} profile={profile} />
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
