import { Input } from 'nrsystemtools'
import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'

interface IHInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	labelClassName?: string
	inputClassName?: string
}

const HInput = forwardRef<HTMLInputElement, IHInputProps>(
	(
		{ className, label, labelClassName, inputClassName, ...rest }: IHInputProps,
		ref,
	) => {
		return (
			<div className={twMerge('flex space-x-4 text-xl', className)}>
				<Label
					className={twMerge('w-2/5 self-center text-gray-500', labelClassName)}
					htmlFor={rest.name}
				>
					{label}
				</Label>

				<Input
					ref={ref}
					type='text'
					className={twMerge(
						'mb-1 w-3/5 py-1.5 text-right text-sm',
						inputClassName,
					)}
					{...rest}
				/>
			</div>
		)
	},
)

export default HInput
