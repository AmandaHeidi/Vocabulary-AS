import { useAuth } from './hooks/useAuth'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'

export default function App() {
  const { user, loading, signIn, signUp, signOut } = useAuth()

  if (loading) return (
    <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--accent)', marginBottom: 8 }}>✦</div>
        <p style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>Cargando...</p>
      </div>
    </div>
  )

  if (!user) return <AuthPage onAuth={{ signIn, signUp }} />

  return <Dashboard user={user} onSignOut={signOut} />
}
