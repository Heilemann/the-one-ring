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
	return (
		<div className={twMerge('flex flex-col', className)}>
			<label className='block text-xs font-bold mb-1'>{label}</label>
			<Input
				placeholder={placeholder}
				centered={centered}
				className={inputClassName}
				{...rest}
			/>
		</div>
	)
}

export default LabelInput
