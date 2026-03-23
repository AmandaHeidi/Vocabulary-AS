export async function generateWordData(word) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `For the English word "${word}", respond ONLY with a valid JSON object, no markdown, no backticks, no extra text. Use this exact structure:
{
  "word": "${word}",
  "translation": "traducción al español",
  "phonetic": "pronunciación fonética simple, ej: /hɛ.ləʊ/",
  "part_of_speech": "sustantivo / verbo / adjetivo / adverbio",
  "examples": [
    "Ejemplo de oración en inglés usando la palabra.",
    "Otro ejemplo de oración en inglés.",
    "Un tercer ejemplo de oración en inglés."
  ],
  "examples_es": [
    "Traducción al español del primer ejemplo.",
    "Traducción al español del segundo ejemplo.",
    "Traducción al español del tercer ejemplo."
  ]
}`
      }]
    })
  })

  const data = await response.json()
  const text = data.content?.map(i => i.text || '').join('')
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}
