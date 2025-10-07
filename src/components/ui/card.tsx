import React from 'react'
import { cn } from './cn'
export function Card(props: React.HTMLAttributes<HTMLDivElement>){ return <div {...props} className={cn('rounded-2xl border bg-zinc-900/60 border-zinc-800', props.className)} /> }
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>){ return <div {...props} className={cn('p-6', props.className)} /> }
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>){ return <div {...props} className={cn('p-6 pt-0', props.className)} /> }
export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>){ return <h3 {...props} className={cn('text-lg font-medium', props.className)} /> }
