import { IoAdd, IoRemove } from 'react-icons/io5'
import { useLocale } from '../contexts/LocaleContext.jsx'

export function QuantitySelector({ value, onChange, min = 1 }) {
  const { t } = useLocale()

  const decrement = () => {
    const next = Math.max(min, value - 1)
    onChange(next)
  }

  const increment = () => {
    const next = value + 1
    onChange(next)
  }

  return (
    <div className="inline-flex items-center gap-4 text-xs">
      <button
        type="button"
        onClick={decrement}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-canvas text-sm leading-none"
        aria-label={t('quantity.decrease')}
      >
        <IoRemove className="h-3 w-3" />
      </button>
      <span className="w-6 text-center text-[11px] tracking-[0.2em]">
        {String(value).padStart(2, '0')}
      </span>
      <button
        type="button"
        onClick={increment}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm leading-none text-ivory"
        aria-label={t('quantity.increase')}
      >
        <IoAdd className="h-3 w-3 text-ivory" />
      </button>
    </div>
  )
}
