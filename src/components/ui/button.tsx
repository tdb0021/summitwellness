import React from 'react'
import { cn } from './cn'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; variant?: 'default'|'outline' }
export function Button({ asChild, className, variant='default', children, ...props }: Props){
  const base = cn('inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition',
    variant==='default'&&'bg-white text-black hover:opacity-90',
    variant==='outline'&&'border border-zinc-700 text-zinc-200 hover:bg-zinc-900', className)
  if(asChild && React.isValidElement(children)){ return React.cloneElement(children as any, { className: cn((children as any).props?.className, base) }) }
  return <button className={base} {...props}>{children}</button>
}
export default Button
