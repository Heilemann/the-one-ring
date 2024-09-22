import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import Input from '../Input'
import StyledLabel from './Form/StyledLabel'

interface LabelInputProps {
	label: string
	placeholder?: string
	centered?: boolean
	className?: string
	inputClassName?: string
	labelClassName?: string
	[rest: string]: any
}

const LabelInput = forwardRef<HTMLInputElement, LabelInputProps>(
	(
		{
			label,
			placeholder,
			centered,
			className,
			inputClassName,
			labelClassName,
			...rest
		},
		ref,
	) => {
		const inputId = `input-${label.replace(/\s+/g, '-').toLowerCase()}`

		return (
			<div className={twMerge('flex flex-col', className)}>
				<StyledLabel
					htmlFor={inputId}
					className={twMerge(
						'block text-xs mt-2 -mb-1.5 text-[#ba5450]',
						centered && 'text-center',
						labelClassName,
					)}
				>
					{label}
				</StyledLabel>
				<Input
					ref={ref}
					id={inputId}
					placeholder={placeholder}
					centered={centered}
					className={inputClassName}
					{...rest}
				/>
			</div>
		)
	},
)

LabelInput.displayName = 'LabelInput'

export default LabelInput
