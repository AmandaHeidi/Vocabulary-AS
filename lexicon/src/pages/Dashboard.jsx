import { useState } from 'react'
import { useWords } from '../hooks/useWords'
import WordCard from '../components/WordCard'
import AddWordForm from '../components/AddWordForm'

export default function Dashboard({ user, onSignOut }) {
  const { words, loading, addWord, deleteWord } = useWords(user.id)
  const [search, setSearch] = useState('')

  const filtered = words.filter(w =>
    w.word?.toLowerCase().includes(search.toLowerCase()) ||
    w.translation?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={styles.page}>
      <div style={styles.grain} />

      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>✦</span>
          <span style={styles.logoText}>Lexicon</span>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.wordCount}>{words.length} palabras</span>
          <button onClick={onSignOut} style={styles.signOutBtn}>Salir</button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.container}>

          <section style={styles.addSection}>
            <AddWordForm onAdd={addWord} />
          </section>

          {words.length > 0 && (
            <div style={styles.searchWrap}>
              <input style={styles.searchInput} value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar palabras..." />
            </div>
          )}

          {loading ? (
            <div style={styles.loadingWrap}>
              <span style={styles.loadingDot}>◌</span>
              <p style={styles.loadingText}>Cargando tu diccionario...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={styles.empty}>
              {words.length === 0 ? (
                <>
                  <p style={styles.emptyTitle}>Tu diccionario está vacío</p>
                  <p style={styles.emptySubtitle}>Agregá tu primera palabra arriba ↑</p>
                </>
              ) : (
                <p style={styles.emptyTitle}>No se encontraron resultados</p>
              )}
            </div>
          ) : (
            <div style={styles.wordList}>
              {filtered.map(w => (
                <WordCard key={w.id} word={w} onDelete={deleteWord} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

const styles = {
  page: { minHeight: '100dvh', background: 'var(--bg)', position: 'relative' },
  grain: { position: 'fixed', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.03\'/%3E%3C/svg%3E")', pointerEvents: 'none', zIndex: 0 },
  header: { position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { display: 'flex', alignItems: 'center', gap: 8 },
  logoIcon: { fontSize: 16, color: 'var(--accent)' },
  logoText: { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 },
  headerRight: { display: 'flex', alignItems: 'center', gap: 16 },
  wordCount: { fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--font-mono)' },
  signOutBtn: { fontSize: 12, color: 'var(--text3)', padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 6, transition: 'all 0.2s', fontFamily: 'var(--font-mono)' },
  main: { position: 'relative', zIndex: 1, padding: '24px 16px 80px' },
  container: { maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 },
  addSection: { background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px' },
  searchWrap: { position: 'relative' },
  searchInput: { width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px', color: 'var(--text)', fontSize: 14, outline: 'none', fontFamily: 'var(--font-body)', boxSizing: 'border-box' },
  wordList: { display: 'flex', flexDirection: 'column', gap: 10 },
  loadingWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '60px 0' },
  loadingDot: { fontSize: 32, color: 'var(--accent)', animation: 'spin 2s linear infinite' },
  loadingText: { color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 13 },
  empty: { textAlign: 'center', padding: '60px 0' },
  emptyTitle: { fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text2)', marginBottom: 8 },
  emptySubtitle: { color: 'var(--text3)', fontSize: 14, fontFamily: 'var(--font-mono)' }
}
