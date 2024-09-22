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
				'font-extrabold uppercase text-[#ba5450]',
				centered && 'text-center',
				className,
			)}
			style={{
				fontSize: '10px',
				lineHeight: '15px',
			}}
			{...rest}
		>
			{children}
		</label>
	)
}
