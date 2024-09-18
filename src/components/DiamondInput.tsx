import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import diamond from '../assets/diamond.png' // Import the image
import { useEditMode } from '../hooks/useEditMode'
import StyledLabel from './BaseComponents/Form/StyledLabel'
import Input from './Input'

interface IDiamondInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	labelBelow?: boolean
	centered?: boolean
	inputClassName?: string
}

const DiamondInput = forwardRef<HTMLInputElement, IDiamondInputProps>(
	(
		{
			children,
			className,
			label,
			labelBelow = false,
			centered = false,
			inputClassName,
			style,
			...rest
		},
		ref,
	) => {
		const editMode = useEditMode()

		return (
			<div
				className={twMerge(
					'mb-1 flex flex-1',
					labelBelow ? 'flex-col-reverse' : 'flex-col',
					centered && 'items-center',
					className,
				)}
			>
				<StyledLabel centered={centered} htmlFor={rest.name}>
					{label}
				</StyledLabel>
				<div>
					<Input
						ref={ref}
						className={twMerge(
							'w-14 flex-1 bg-transparent transition-all duration-200 ease-in-out h-14 font-bold text-lg p-0',
							centered && 'text-center',
							inputClassName,
						)}
						placeholder='—'
						disabled={editMode === 'view'}
						style={{
							paddingBottom: '0px',
							backgroundImage: `url(${diamond})`,
							backgroundSize: 'contain',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center',
							backgroundColor: 'transparent',
							color: '#ba5450',
							...(rest.type === 'number' && {
								appearance: 'textfield',
								MozAppearance: 'textfield',
								WebkitAppearance: 'none',
							}),
							...style,
						}}
						{...rest}
					/>
					{children}
				</div>
			</div>
		)
	},
)

DiamondInput.displayName = 'DiamondInput'

export default DiamondInput
