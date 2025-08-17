import * as React from 'react'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'ghost' | 'solid' }
export function Button({ variant='solid', className='', ...props }: Props) {
  const base = variant === 'ghost' ? 'btn-ghost' : 'btn'
  return <button className={base + (className ? ' ' + className : '')} {...props} />
}
