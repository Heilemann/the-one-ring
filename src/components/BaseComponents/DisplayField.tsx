import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Form/Label'

interface DisplayFieldProps {
	label: string
	value: string | number
	className?: string
}

const DisplayField: React.FC<DisplayFieldProps> = ({
	label,
	value,
	className,
}) => {
	return (
		<div className={twMerge('flex flex-col mb-1', className)}>
			<Label className='font-semibold uppercase text-gray-500 text-xs mb-1'>
				{label}
			</Label>
			<div className='text-sm text-gray-100'>
				{value !== undefined && value !== null ? value : '—'}
			</div>
		</div>
	)
}

export default DisplayField
