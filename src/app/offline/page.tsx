'use client'

export default function OfflinePage() {
  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        backgroundColor: '#F2F0EB',
        color: '#1A1A1A',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '480px' }}>
        <div
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '2rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
          }}
        >
          Kl
        </div>
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.875rem',
            fontWeight: 600,
            marginBottom: '1rem',
          }}
        >
          Sin conexión
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: '#4A4A4A',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          No hay conexión a Internet en este momento. Revisa tu red e intenta de nuevo.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#1A1A1A',
            color: '#F2F0EB',
            border: 'none',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontFamily: 'inherit',
            borderRadius: '0.5rem',
            cursor: 'pointer',
          }}
        >
          Reintentar
        </button>
      </div>
    </div>
  )
}
