import * as React from 'react'
import { twMerge } from 'tailwind-merge'

interface IStyledLabelProps
	extends React.LabelHTMLAttributes<HTMLLabelElement> {
	centered?: boolean
}

export default function StyledLabel(props: IStyledLabelProps) {
	const { children, className, centered, ...rest } = props

	return (
		<label
			className={twMerge(
				'font-extrabold uppercase text-[#ba5450] text-xs pb-2',
				centered && 'text-center',
				className,
			)}
			{...rest}
		>
			{children}
		</label>
	)
}
