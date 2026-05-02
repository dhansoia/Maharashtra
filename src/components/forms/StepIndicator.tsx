import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepIndicatorProps {
  steps: string[]
  current: number
}

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <ol className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
      {steps.map((label, i) => {
        const isDone = i < current
        const isActive = i === current
        return (
          <li key={label} className="flex items-center gap-2">
            <div
              className={cn(
                'grid h-8 w-8 place-items-center rounded-full border-2 text-sm font-bold transition-colors',
                isDone && 'border-forest-600 bg-forest-600 text-white',
                isActive && 'border-gold-400 bg-gold-400 text-navy-950',
                !isDone && !isActive && 'border-navy-200 text-navy-400',
              )}
            >
              {isDone ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={cn(
                'hidden text-xs font-medium md:inline',
                isActive ? 'text-navy-900' : 'text-navy-500',
              )}
            >
              {label}
            </span>
            {i < steps.length - 1 ? (
              <span className={cn('h-px w-6 bg-navy-200 md:w-10', isDone && 'bg-forest-600')} />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
