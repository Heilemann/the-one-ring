import { Input } from 'nrsystemtools'
import React, { forwardRef, useContext } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../context'
import StyledLabel from './StyledLabel' // Update import

interface IVInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	name: string // Make 'name' a required prop
	registerOptions?: RegisterOptions
	hide?: boolean
	labelBelow?: boolean
	centered?: boolean
}

const VInput = forwardRef<HTMLInputElement, IVInputProps>(
	(
		{
			children,
			className,
			label,
			labelBelow = false,
			hide = false,
			centered = false,
			name,
			registerOptions,
			style,
			...rest
		}: IVInputProps,
		ref,
	) => {
		const { state } = useContext(context)
		const { editMode } = state
		const { register } = useFormContext() // Access form context

		return (
			<div
				className={twMerge(
					'mb-1 flex-1',
					labelBelow ? 'flex-col-reverse' : 'flex-col',
					hide ? 'hidden' : 'flex',
					centered && 'items-center',
					className,
				)}
				style={style}
			>
				<StyledLabel centered={centered} htmlFor={name}>
					{label}
				</StyledLabel>
				<div className={twMerge('flex items-center')}>
					<Input
						ref={ref}
						{...register(name, registerOptions)} // Register the input
						className={twMerge(
							'w-full flex-1 transition-all duration-200 ease-in-out',
							editMode === 'edit' ? '' : 'px-0',
							centered && 'text-center',
						)}
						style={{
							padding: '0',
							backgroundColor: 'transparent',
							color: 'black',
						}}
						placeholder='—'
						id={name}
						disabled={editMode === 'view'}
						{...rest}
					/>
					{children}
				</div>
			</div>
		)
	},
)

export default VInput
