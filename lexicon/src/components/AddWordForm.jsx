import { useState } from 'react'
import { generateWordData } from '../lib/claude'

export default function AddWordForm({ onAdd }) {
  const [word, setWord] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(null)

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!word.trim()) return
    setLoading(true); setError(''); setPreview(null)
    try {
      const data = await generateWordData(word.trim())
      setPreview(data)
    } catch (err) {
      setError('No se pudo generar la traducción. Verificá tu API key.')
    }
    setLoading(false)
  }

  const handleSave = async () => {
    if (!preview) return
    setLoading(true)
    const { error: err } = await onAdd(preview)
    if (err) setError(err.message)
    else { setWord(''); setPreview(null) }
    setLoading(false)
  }

  return (
    <div style={styles.wrap}>
      <form onSubmit={handleGenerate} style={styles.form}>
        <div style={styles.inputRow}>
          <input style={styles.input} value={word}
            onChange={e => { setWord(e.target.value); setPreview(null) }}
            placeholder="Escribí una palabra en inglés..."
            disabled={loading} />
          <button type="submit" style={{ ...styles.btn, opacity: loading || !word.trim() ? 0.5 : 1 }}
            disabled={loading || !word.trim()}>
            {loading ? <span style={styles.spinner}>◌</span> : '✦ Generar'}
          </button>
        </div>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {preview && (
        <div style={styles.preview}>
          <div style={styles.previewHeader}>
            <div>
              <div style={styles.previewWordRow}>
                <span style={styles.previewWord}>{preview.word}</span>
                <span style={styles.previewPos}>{preview.part_of_speech}</span>
              </div>
              <span style={styles.previewPhonetic}>{preview.phonetic}</span>
            </div>
            <span style={styles.previewTranslation}>{preview.translation}</span>
          </div>
          <div style={styles.previewExamples}>
            {preview.examples?.slice(0, 2).map((ex, i) => (
              <div key={i} style={styles.previewEx}>
                <p style={styles.previewExEn}>{ex}</p>
                <p style={styles.previewExEs}>{preview.examples_es?.[i]}</p>
              </div>
            ))}
          </div>
          <div style={styles.previewActions}>
            <button onClick={() => setPreview(null)} style={styles.cancelBtn}>Cancelar</button>
            <button onClick={handleSave} style={{ ...styles.saveBtn, opacity: loading ? 0.6 : 1 }} disabled={loading}>
              {loading ? 'Guardando...' : '✓ Guardar palabra'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  wrap: { display: 'flex', flexDirection: 'column', gap: 12 },
  form: {},
  inputRow: { display: 'flex', gap: 10 },
  input: { flex: 1, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', color: 'var(--text)', fontSize: 16, outline: 'none', transition: 'border-color 0.2s', fontFamily: 'var(--font-body)' },
  btn: { background: 'var(--accent)', color: '#0a0a0f', padding: '0 20px', borderRadius: 10, fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6 },
  spinner: { animation: 'spin 1s linear infinite', display: 'inline-block' },
  error: { color: 'var(--red)', fontSize: 13, padding: '10px 12px', background: 'rgba(224,112,112,0.08)', borderRadius: 8, border: '1px solid rgba(224,112,112,0.2)' },
  preview: { background: 'var(--bg3)', border: '1px solid var(--border-hover)', borderRadius: 12, padding: '20px', animation: 'fadeIn 0.3s ease' },
  previewHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  previewWordRow: { display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 },
  previewWord: { fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700 },
  previewPos: { fontSize: 11, color: 'var(--accent)', fontFamily: 'var(--font-mono)', background: 'var(--accent-dim)', padding: '2px 8px', borderRadius: 4 },
  previewPhonetic: { fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--font-mono)' },
  previewTranslation: { fontSize: 18, color: 'var(--accent2)', fontFamily: 'var(--font-display)', fontStyle: 'italic', textAlign: 'right' },
  previewExamples: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 },
  previewEx: { paddingLeft: 12, borderLeft: '2px solid var(--accent-dim)' },
  previewExEn: { fontSize: 13, color: 'var(--text)', lineHeight: 1.6 },
  previewExEs: { fontSize: 12, color: 'var(--text3)', fontStyle: 'italic', marginTop: 2 },
  previewActions: { display: 'flex', gap: 10, justifyContent: 'flex-end' },
  cancelBtn: { padding: '9px 16px', borderRadius: 8, fontSize: 13, color: 'var(--text3)', border: '1px solid var(--border)', transition: 'all 0.2s' },
  saveBtn: { padding: '9px 18px', borderRadius: 8, fontSize: 13, background: 'var(--accent)', color: '#0a0a0f', fontWeight: 500, transition: 'all 0.2s' }
}
