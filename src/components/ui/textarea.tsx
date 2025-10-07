import React from 'react'
import { cn } from './cn'
export function Textarea(p:React.TextareaHTMLAttributes<HTMLTextAreaElement>){return <textarea {...p} className={cn('w-full rounded-xl border border-zinc-700 bg-zinc-900/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-500', p.className)}/>} export default Textarea
