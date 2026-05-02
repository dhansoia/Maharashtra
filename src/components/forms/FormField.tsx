'use client'

import * as React from 'react'
import { Label } from '@/components/ui/label'
import { Input, type InputProps } from '@/components/ui/input'
import { Textarea, type TextareaProps } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface BaseProps {
  label: string
  name: string
  required?: boolean
  error?: string
  hint?: string
  className?: string
}

type FieldTextProps = BaseProps & Omit<InputProps, 'name' | 'required' | 'className'>
type FieldTextareaProps = BaseProps & Omit<TextareaProps, 'name' | 'required' | 'className'>

export const FieldText = React.forwardRef<HTMLInputElement, FieldTextProps>(
  ({ label, name, required, error, hint, className, ...props }, ref) => (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={name}>
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </Label>
      <Input id={name} name={name} ref={ref} aria-invalid={!!error} {...props} />
      {hint && !error ? <p className="text-xs text-navy-500">{hint}</p> : null}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  ),
)
FieldText.displayName = 'FieldText'

export const FieldTextarea = React.forwardRef<HTMLTextAreaElement, FieldTextareaProps>(
  ({ label, name, required, error, hint, className, ...props }, ref) => (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={name}>
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </Label>
      <Textarea id={name} name={name} ref={ref} aria-invalid={!!error} {...props} />
      {hint && !error ? <p className="text-xs text-navy-500">{hint}</p> : null}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  ),
)
FieldTextarea.displayName = 'FieldTextarea'

type FieldSelectProps = BaseProps &
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'name' | 'required' | 'className'> & {
    options: { label: string; value: string }[]
  }

export const FieldSelect = React.forwardRef<HTMLSelectElement, FieldSelectProps>(
  ({ label, name, options, required, error, hint, className, ...props }, ref) => (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={name}>
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </Label>
      <select
        id={name}
        name={name}
        ref={ref}
        aria-invalid={!!error}
        className={cn(
          'flex h-10 w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400',
        )}
        {...props}
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && !error ? <p className="text-xs text-navy-500">{hint}</p> : null}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  ),
)
FieldSelect.displayName = 'FieldSelect'

interface FieldFileProps extends BaseProps {
  accept?: string
  onChange: (file: File | null) => void
}

export const FieldFile = ({ label, name, accept, required, error, hint, onChange }: FieldFileProps) => (
  <div className="space-y-1.5">
    <Label htmlFor={name}>
      {label}
      {required ? <span className="text-red-500"> *</span> : null}
    </Label>
    <input
      type="file"
      id={name}
      name={name}
      accept={accept || 'image/*,application/pdf'}
      aria-invalid={!!error}
      onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      className="block w-full text-sm text-navy-700 file:mr-3 file:rounded-md file:border-0 file:bg-navy-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-navy-800"
    />
    {hint && !error ? <p className="text-xs text-navy-500">{hint}</p> : null}
    {error ? <p className="text-xs text-red-600">{error}</p> : null}
  </div>
)
