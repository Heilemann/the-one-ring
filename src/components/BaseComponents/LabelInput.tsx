import React from 'react'
import { twMerge } from 'tailwind-merge'
import Input from '../Input'

interface LabelInputProps {
	label: string
	placeholder?: string
	centered?: boolean
	className?: string
	inputClassName?: string
	[rest: string]: any
}

const LabelInput: React.FC<LabelInputProps> = ({
	label,
	placeholder,
	centered,
	className,
	inputClassName,
	...rest
}) => {
	const inputId = `input-${label.replace(/\s+/g, '-').toLowerCase()}`

	return (
		<div className={twMerge('flex flex-col', className)}>
			<label htmlFor={inputId} className='block text-xs font-bold mb-1'>
				{label}
			</label>
			<Input
				id={inputId}
				placeholder={placeholder}
				centered={centered}
				className={inputClassName}
				{...rest}
			/>
		</div>
	)
}

export default LabelInput
