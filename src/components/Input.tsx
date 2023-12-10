import clsxm from '@riverfl0w/clsxm'
import { type ComponentPropsWithoutRef, type FC } from 'react'

interface InputProps extends ComponentPropsWithoutRef<'input'> {}

const Input : FC<InputProps>  = ({className , ...props}) => {
  return (
    <input
    className={clsxm(
      'rounded-lg bg-white border-slate-300 border-1 p-1',
      className,
    )}
    {...props}
    />
  )
}

export default Input