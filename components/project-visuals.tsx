import { FileLock2, ShieldPlus, ShoppingBasket } from 'lucide-react'

const frame =
  'relative h-60 overflow-hidden rounded-[1.6rem] border border-border bg-[#0a111d] font-mono text-[11px] text-[#d6e4f7] md:text-xs'

export function MoonPocketVisual() {
  const row = '01101001 11010010 00101101 10110100 01011100 11100011 01101001 11010010 00101101 10110100'
  return (
    <div className={frame} aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 space-y-2 overflow-hidden whitespace-nowrap px-5 text-[#268bff]/55">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="binary-drift" style={{ animationDelay: `${i * -2}s` }}>
            {row} {row}
          </div>
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 flex size-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-dashed border-[#268bff]/30 bg-[#268bff]/5">
        <span className="flex size-20 items-center justify-center rounded-3xl border border-[#268bff]/40 bg-[#0d1a2e] shadow-[0_0_30px_rgba(38,139,255,0.35)]">
          <FileLock2 className="size-9 text-[#53b5ff]" />
        </span>
      </div>
      <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-[#0d1626] px-3 py-1.5 text-[#c6d4e8]">
        {'AES-GCM · encrypted client-side'}
      </span>
    </div>
  )
}

export function EmlaVisual() {
  const lines = [
    { t: 'HTTP/1.1 500 Internal Server Error', match: false, dim: true },
    { t: 'SQLSTATE[42000]: syntax error', match: true },
    { t: 'at /var/www/app/db.py line 42', match: true },
    { t: 'X-Powered-By: framework/x.y', match: true },
    { t: 'Content-Type: text/html', match: false, dim: true },
  ]
  return (
    <div className={`${frame} p-5`}>
      <ul className="space-y-2.5">
        {lines.map((l) => (
          <li key={l.t} className="flex items-center justify-between gap-3">
            <span className={`truncate ${l.dim ? 'text-[#9baac1]' : 'text-[#eef4fb]'}`}>{l.t}</span>
            {l.match && (
              <span className="shrink-0 rounded bg-[#268bff]/15 px-2 py-0.5 text-[10px] text-[#53b5ff]">match</span>
            )}
          </li>
        ))}
        <li className="text-[#53b5ff]">{'> EIDS score computed'}</li>
      </ul>
      <span className="absolute bottom-4 left-5 rounded-full border border-white/10 bg-[#0d1626] px-3 py-1.5 text-[#c6d4e8]">
        Illustrative EMLA Output
      </span>
    </div>
  )
}

export function FreshBasketVisual() {
  const tables = [
    { name: 'CUSTOMER', cols: ['customer_id PK', 'name', 'email'], pos: 'left-5 top-5' },
    { name: 'ORDERS', cols: ['order_id PK', 'customer_id FK', 'total'], pos: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' },
    { name: 'PRODUCT', cols: ['product_id PK', 'name', 'stock'], pos: 'right-5 bottom-5' },
  ]
  return (
    <div className={frame} aria-hidden="true">
      <svg className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M22 30 L50 50 L78 70" stroke="#268bff" strokeOpacity="0.5" strokeDasharray="1.5 1.5" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
      {tables.map((t) => (
        <div key={t.name} className={`absolute w-36 rounded-xl border border-white/10 bg-[#0d1626] ${t.pos}`}>
          <p className="border-b border-white/10 px-3 py-1.5 text-[10px] tracking-widest text-[#53b5ff]">{t.name}</p>
          <ul className="space-y-0.5 px-3 py-2 text-[10px] text-[#9baac1]">
            {t.cols.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      ))}
      <span className="absolute left-5 bottom-5 flex size-10 items-center justify-center rounded-xl border border-[#268bff]/40 bg-[#0d1a2e]">
        <ShoppingBasket className="size-5 text-[#53b5ff]" />
      </span>
    </div>
  )
}

export function ClinicShieldVisual() {
  return (
    <div className={`${frame} p-5`} aria-hidden="true">
      <div className="space-y-3">
        <div className="rounded-xl border border-white/10 bg-[#0d1626] p-3">
          <p className="mb-1 text-[10px] tracking-widest text-[#7d8ea8]">INPUT</p>
          <p className="text-[#eef4fb]">
            Patient <span className="rounded bg-[#ff5f57]/15 px-1 text-[#ff9b95]">Asha Rao</span>, phone{' '}
            <span className="rounded bg-[#ff5f57]/15 px-1 text-[#ff9b95]">98xxxxxx10</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-[#53b5ff]">
          <ShieldPlus className="size-4" />
          <span>{'masked → encrypted vault'}</span>
        </div>
        <div className="rounded-xl border border-[#268bff]/30 bg-[#0d1626] p-3">
          <p className="mb-1 text-[10px] tracking-widest text-[#7d8ea8]">SENT TO LLM</p>
          <p className="text-[#eef4fb]">
            Patient <span className="rounded bg-[#268bff]/15 px-1 text-[#53b5ff]">{'<PERSON_1>'}</span>, phone{' '}
            <span className="rounded bg-[#268bff]/15 px-1 text-[#53b5ff]">{'<PHONE_1>'}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
