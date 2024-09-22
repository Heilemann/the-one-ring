import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import diamond from '../assets/diamond.png'
import diamondWithFlourish from '../assets/diamondwithflourish.png'
import { useEditMode } from '../hooks/useEditMode'
import StyledLabel from './BaseComponents/Form/StyledLabel'
import LargeHeader from './BaseComponents/LargeHeader'
import MediumHeader from './BaseComponents/MediumHeader'
import SmallHeader from './BaseComponents/SmallHeader'
import Input from './Input'

interface IDiamondInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	labelBelow?: boolean
	labelSize?: 'label' | 'small' | 'medium' | 'large'
	labelClass?: string
	centered?: boolean
	inputClassName?: string
	diamondType?: 'small' | 'flourish'
}

const DiamondInput = forwardRef<HTMLInputElement, IDiamondInputProps>(
	(
		{
			children,
			className,
			label,
			labelBelow = false,
			labelSize = 'label',
			labelClass = '',
			centered = true,
			inputClassName,
			style,
			diamondType = 'small',
			...rest
		},
		ref,
	) => {
		const editMode = useEditMode()
		const hasFlourish = diamondType === 'flourish'
		const diamondImage = hasFlourish ? diamondWithFlourish : diamond

		const newLabelClass = twMerge(
			'absolute -translate-x-1/2 left-1/2 -translate-y-full p-0',
			labelBelow ? 'bottom-0 translate-y-full' : 'top-0',
			labelBelow && hasFlourish && 'bottom-4',
			labelClass,
		)

		const LabelComponent = () => {
			switch (labelSize) {
				case 'small':
					return (
						<SmallHeader centered={centered} className={newLabelClass}>
							{label}
						</SmallHeader>
					)
				case 'medium':
					return (
						<MediumHeader centered={centered} className={newLabelClass}>
							{label}
						</MediumHeader>
					)
				case 'large':
					return (
						<LargeHeader centered={centered} className={newLabelClass}>
							{label}
						</LargeHeader>
					)
				default:
					return (
						<StyledLabel
							centered={centered}
							htmlFor={rest.name}
							className={newLabelClass}
						>
							{label}
						</StyledLabel>
					)
			}
		}

		return (
			<div className={twMerge('relative mb-1 inline-block mx-auto', className)}>
				<LabelComponent />
				<Input
					ref={ref}
					className={twMerge(
						'w-14 flex-1 bg-transparent transition-all duration-200 ease-in-out h-14 font-bold text-lg p-0 text-center',
						diamondType === 'flourish' && 'w-36 h-36 pl-10 text-2xl -ml-10',
						inputClassName,
					)}
					placeholder='—'
					disabled={editMode === 'view'}
					style={{
						paddingTop: '0px',
						paddingBottom: '0px',
						backgroundImage: `url(${diamondImage})`,
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						backgroundColor: 'transparent',
						// color: '#ba5450',
						...(rest.type === 'number' && {
							appearance: 'none',
							MozAppearance: 'textfield',
							WebkitAppearance: 'none',
						}),
						fontFamily: 'Aniron',
						...(diamondType === 'flourish' && {
							fontSize: '30px',
							lineHeight: '36px',
						}),
						...style,
					}}
					{...rest}
				/>
				{children}
			</div>
		)
	},
)

DiamondInput.displayName = 'DiamondInput'

export default DiamondInput
