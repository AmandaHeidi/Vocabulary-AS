import { useState } from 'react'

export default function AuthPage({ onAuth }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handle = async (e) => {
    e.preventDefault()
    setLoading(true); setError(''); setSuccess('')
    const { error: err } = mode === 'login'
      ? await onAuth.signIn(email, password)
      : await onAuth.signUp(email, password)
    if (err) setError(err.message)
    else if (mode === 'register') setSuccess('Revisá tu email para confirmar la cuenta.')
    setLoading(false)
  }

  return (
    <div style={styles.bg}>
      <div style={styles.grain} />
      <div style={styles.orb1} />
      <div style={styles.orb2} />

      <div style={styles.card}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>✦</span>
          <span style={styles.logoText}>Lexicon</span>
        </div>
        <p style={styles.tagline}>Tu diccionario personal de inglés</p>

        <div style={styles.tabs}>
          {['login','register'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); setSuccess('') }}
              style={{ ...styles.tab, ...(mode === m ? styles.tabActive : {}) }}>
              {m === 'login' ? 'Ingresar' : 'Registrarse'}
            </button>
          ))}
        </div>

        <form onSubmit={handle} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} type="email" value={email}
              onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Contraseña</label>
            <input style={styles.input} type="password" value={password}
              onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>

          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.successMsg}>{success}</p>}

          <button type="submit" style={{ ...styles.btn, opacity: loading ? 0.6 : 1 }} disabled={loading}>
            {loading ? 'Cargando...' : mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  bg: { minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg)', position: 'relative', overflow: 'hidden', padding: '24px' },
  grain: { position: 'fixed', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")', pointerEvents: 'none', zIndex: 0 },
  orb1: { position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)', top: '-10%', right: '-10%', pointerEvents: 'none' },
  orb2: { position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(112,144,192,0.06) 0%, transparent 70%)', bottom: '10%', left: '-5%', pointerEvents: 'none' },
  card: { background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '48px 40px', width: '100%', maxWidth: 420, position: 'relative', zIndex: 1, boxShadow: '0 32px 80px rgba(0,0,0,0.5)' },
  logo: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 },
  logoIcon: { fontSize: 22, color: 'var(--accent)' },
  logoText: { fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--text)' },
  tagline: { color: 'var(--text3)', fontSize: 13, marginBottom: 32, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' },
  tabs: { display: 'flex', gap: 4, background: 'var(--bg3)', borderRadius: 8, padding: 4, marginBottom: 28 },
  tab: { flex: 1, padding: '8px 0', borderRadius: 6, fontSize: 14, color: 'var(--text2)', transition: 'all 0.2s', fontFamily: 'var(--font-body)' },
  tabActive: { background: 'var(--bg2)', color: 'var(--text)', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' },
  form: { display: 'flex', flexDirection: 'column', gap: 18 },
  field: { display: 'flex', flexDirection: 'column', gap: 8 },
  label: { fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' },
  input: { background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', color: 'var(--text)', fontSize: 15, outline: 'none', transition: 'border-color 0.2s' },
  error: { color: 'var(--red)', fontSize: 13, padding: '10px 12px', background: 'rgba(224,112,112,0.08)', borderRadius: 8, border: '1px solid rgba(224,112,112,0.2)' },
  successMsg: { color: 'var(--green)', fontSize: 13, padding: '10px 12px', background: 'rgba(112,192,144,0.08)', borderRadius: 8, border: '1px solid rgba(112,192,144,0.2)' },
  btn: { background: 'var(--accent)', color: '#0a0a0f', padding: '13px', borderRadius: 8, fontSize: 15, fontWeight: 500, transition: 'all 0.2s', letterSpacing: '0.02em' }
}
