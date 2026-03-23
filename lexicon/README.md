# ✦ Lexicon — Tu diccionario personal de inglés

App PWA para guardar palabras en inglés con traducción automática, ejemplos de uso y pronunciación.

---

## Stack

- **React + Vite** — Frontend
- **Supabase** — Auth + Base de datos
- **Claude API** — Traducción y ejemplos automáticos
- **Web Speech API** — Pronunciación
- **Vercel** — Hosting

---

## Configuración paso a paso

### 1. Clonar y instalar

```bash
git clone https://github.com/TU_USUARIO/lexicon.git
cd lexicon
npm install
```

### 2. Configurar Supabase — Base de datos

1. Entrá a [supabase.com](https://supabase.com) → tu proyecto
2. Andá a **SQL Editor**
3. Copiá y ejecutá el contenido de `supabase-setup.sql`
4. Listo — la tabla `words` queda creada con seguridad por usuario

### 3. Variables de entorno

Creá un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://bdaojrxilwfhjobbsrdy.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_zk-lN1XOQ0FZrgziDklqjw_lKLAmEUy
VITE_ANTHROPIC_API_KEY=sk-ant-XXXXXXXXXXXXXXXX
```

> ⚠️ El archivo `.env` está en `.gitignore` — nunca se sube a GitHub.
> Las variables de entorno las configurás por separado en Vercel (ver paso 5).

### 4. Obtener tu Anthropic API Key

1. Entrá a [console.anthropic.com](https://console.anthropic.com)
2. **API Keys** → **Create Key**
3. Copiá la clave y pegala en `.env` como `VITE_ANTHROPIC_API_KEY`

### 5. Deploy en Vercel

1. Subí el proyecto a GitHub
2. Entrá a [vercel.com](https://vercel.com) → **New Project** → importá el repo
3. Antes de deployar, andá a **Environment Variables** y agregá las 3 variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ANTHROPIC_API_KEY`
4. Click en **Deploy**

### 6. Configurar dominio en Supabase (importante para auth)

1. En Supabase → **Authentication** → **URL Configuration**
2. En **Site URL** poné tu URL de Vercel: `https://lexicon-xxx.vercel.app`
3. En **Redirect URLs** agregá la misma URL

---

## Instalar en iPhone como PWA

1. Abrí la app en **Safari** (importante: tiene que ser Safari)
2. Tocá el botón de **Compartir** (cuadrado con flecha hacia arriba)
3. Seleccioná **"Añadir a pantalla de inicio"**
4. Confirmá — la app aparece como ícono en tu pantalla de inicio
5. Al abrirla desde el ícono, funciona en pantalla completa sin barra del navegador

---

## Desarrollo local

```bash
npm run dev
```

La app corre en `http://localhost:5173`

---

## Estructura del proyecto

```
lexicon/
├── src/
│   ├── components/
│   │   ├── AddWordForm.jsx    # Formulario para agregar palabras
│   │   └── WordCard.jsx       # Tarjeta de cada palabra
│   ├── hooks/
│   │   ├── useAuth.js         # Hook de autenticación
│   │   └── useWords.js        # Hook de CRUD de palabras
│   ├── lib/
│   │   ├── supabase.js        # Cliente de Supabase
│   │   ├── claude.js          # Llamadas a la API de Claude
│   │   └── speech.js          # Text-to-speech
│   ├── pages/
│   │   ├── AuthPage.jsx       # Login / Registro
│   │   └── Dashboard.jsx      # Pantalla principal
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── supabase-setup.sql          # Script SQL para configurar la BD
├── vite.config.js
└── package.json
```
