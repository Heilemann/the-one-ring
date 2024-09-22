import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import diamond from '../assets/diamond.png'
import diamondWithFlourish from '../assets/diamondwithflourish.png'
import { useEditMode } from '../hooks/useEditMode'
import StyledLabel from './BaseComponents/Form/StyledLabel'
import LargeHeader from './BaseComponents/LargeHeader'
import MediumHeader from './BaseComponents/MediumHeader'
import Input from './Input'

interface IDiamondInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	labelBelow?: boolean
	centered?: boolean
	inputClassName?: string
	labelSize?: 'small' | 'medium' | 'large'
	diamondType?: 'small' | 'flourish'
}

const DiamondInput = forwardRef<HTMLInputElement, IDiamondInputProps>(
	(
		{
			children,
			className,
			label,
			labelBelow = false,
			centered = true,
			inputClassName,
			style,
			labelSize = 'small',
			diamondType = 'small',
			...rest
		},
		ref,
	) => {
		const editMode = useEditMode()

		const LabelComponent = () => {
			switch (labelSize) {
				case 'medium':
					return <MediumHeader centered={centered}>{label}</MediumHeader>
				case 'large':
					return <LargeHeader centered={centered}>{label}</LargeHeader>
				default:
					return (
						<StyledLabel centered={centered} htmlFor={rest.name}>
							{label}
						</StyledLabel>
					)
			}
		}

		const diamondImage =
			diamondType === 'flourish' ? diamondWithFlourish : diamond

		return (
			<div
				className={twMerge(
					'mb-1 flex flex-1',
					labelBelow ? 'flex-col-reverse' : 'flex-col',
					centered && 'items-center',
					className,
				)}
			>
				<LabelComponent />
				<div>
					<Input
						ref={ref}
						className={twMerge(
							'w-14 flex-1 bg-transparent transition-all duration-200 ease-in-out h-14 font-bold text-lg p-0 text-center',
							diamondType === 'flourish' && 'w-36 h-36 pl-10 text-2xl',
							inputClassName,
						)}
						placeholder='—'
						disabled={editMode === 'view'}
						style={{
							paddingBottom: '0px',
							backgroundImage: `url(${diamondImage})`,
							backgroundSize: 'contain',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center',
							backgroundColor: 'transparent',
							color: '#ba5450',
							...(rest.type === 'number' && {
								appearance: 'none',
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
