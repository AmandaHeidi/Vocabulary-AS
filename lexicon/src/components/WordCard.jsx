import { useState } from 'react'
import { speak } from '../lib/speech'

export default function WordCard({ word, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const [speaking, setSpeaking] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const handleSpeak = (text, key, e) => {
    e.stopPropagation()
    setSpeaking(key)
    speak(text)
    setTimeout(() => setSpeaking(null), 2000)
  }

  const handleDelete = async (e) => {
    e.stopPropagation()
    if (!confirm(`¿Eliminar "${word.word}"?`)) return
    setDeleting(true)
    await onDelete(word.id)
  }

  return (
    <div style={{ ...styles.card, ...(expanded ? styles.cardExpanded : {}) }}
      onClick={() => setExpanded(x => !x)}>
      <div style={styles.header}>
        <div style={styles.left}>
          <div style={styles.wordRow}>
            <span style={styles.word}>{word.word}</span>
            <span style={styles.pos}>{word.part_of_speech}</span>
          </div>
          <span style={styles.phonetic}>{word.phonetic}</span>
        </div>
        <div style={styles.right}>
          <button style={{ ...styles.iconBtn, ...(speaking === 'word' ? styles.iconBtnActive : {}) }}
            onClick={e => handleSpeak(word.word, 'word', e)} title="Escuchar">
            🔊
          </button>
          <span style={styles.chevron}>{expanded ? '↑' : '↓'}</span>
        </div>
      </div>

      <div style={styles.translation}>{word.translation}</div>

      {expanded && (
        <div style={styles.body}>
          <div style={styles.divider} />
          <p style={styles.sectionLabel}>Ejemplos</p>
          {word.examples?.map((ex, i) => (
            <div key={i} style={styles.example}>
              <div style={styles.exRow}>
                <p style={styles.exEn}>{ex}</p>
                <button style={{ ...styles.iconBtn, ...(speaking === `ex-${i}` ? styles.iconBtnActive : {}) }}
                  onClick={e => handleSpeak(ex, `ex-${i}`, e)}>
                  🔊
                </button>
              </div>
              {word.examples_es?.[i] && (
                <p style={styles.exEs}>{word.examples_es[i]}</p>
              )}
            </div>
          ))}

          <button onClick={handleDelete}
            style={{ ...styles.deleteBtn, opacity: deleting ? 0.5 : 1 }}>
            {deleting ? 'Eliminando...' : '× Eliminar palabra'}
          </button>
        </div>
      )}
    </div>
  )
}

const styles = {
  card: { background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 22px', cursor: 'pointer', transition: 'all 0.2s', userSelect: 'none' },
  cardExpanded: { border: '1px solid var(--border-hover)', background: 'var(--bg3)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  left: { flex: 1 },
  right: { display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 },
  wordRow: { display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 },
  word: { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)' },
  pos: { fontSize: 11, color: 'var(--accent)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', background: 'var(--accent-dim)', padding: '2px 8px', borderRadius: 4 },
  phonetic: { fontSize: 13, color: 'var(--text3)', fontFamily: 'var(--font-mono)' },
  translation: { marginTop: 8, fontSize: 15, color: 'var(--text2)', fontWeight: 300 },
  iconBtn: { fontSize: 16, padding: '4px 6px', borderRadius: 6, transition: 'all 0.15s', opacity: 0.7, lineHeight: 1 },
  iconBtnActive: { opacity: 1, background: 'var(--accent-dim)' },
  chevron: { fontSize: 14, color: 'var(--text3)', fontFamily: 'var(--font-mono)' },
  divider: { height: 1, background: 'var(--border)', margin: '16px 0' },
  sectionLabel: { fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 },
  body: { marginTop: 4 },
  example: { marginBottom: 14, paddingLeft: 12, borderLeft: '2px solid var(--accent-dim)' },
  exRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  exEn: { fontSize: 14, color: 'var(--text)', lineHeight: 1.6, flex: 1 },
  exEs: { fontSize: 13, color: 'var(--text3)', marginTop: 4, lineHeight: 1.5, fontStyle: 'italic' },
  deleteBtn: { marginTop: 16, fontSize: 12, color: 'var(--red)', fontFamily: 'var(--font-mono)', padding: '8px 12px', border: '1px solid rgba(224,112,112,0.2)', borderRadius: 6, background: 'rgba(224,112,112,0.05)', transition: 'all 0.2s' }
}
