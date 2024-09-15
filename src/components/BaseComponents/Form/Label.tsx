import * as React from 'react'
import { twMerge } from 'tailwind-merge'

interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export default function Label(props: ILabelProps) {
	const { children, className, ...rest } = props

	return (
		<label className={twMerge('text-sm', className)} {...rest}>
			{children}
		</label>
	)
}
