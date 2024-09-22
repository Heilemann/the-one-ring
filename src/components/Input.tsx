import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import divider from '../assets/divider-red.png'
import { useEditMode } from '../hooks/useEditMode'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	centered?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ type = 'text', className, centered, style, ...rest }, ref) => {
		const editMode = useEditMode()

		return (
			<input
				ref={ref}
				type={type}
				className={twMerge(
					'bg-transparent w-full text-[#ba5450] transition-all duration-200 ease-in-out',
					'focus:outline-none placeholder:text-[#ba5450]/50',
					'autofill:bg-transparent autofill:text-[#ba5450] autofill:shadow-[inset_0_0_0px_1000px_transparent]',
					'[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
					centered && 'text-center',
					rest.readOnly && 'cursor-pointer',
					className,
				)}
				style={{
					backgroundRepeat: 'repeat-x',
					backgroundPosition: 'center calc(100% + 9px)',
					backgroundColor: 'transparent',
					...(editMode === 'edit' && {
						paddingTop: '6px',
						paddingBottom: '6px',
						backgroundImage: `url(${divider})`,
					}),
					...style,
				}}
				autoComplete='off'
				autoCorrect='off'
				autoCapitalize='off'
				spellCheck='false'
				{...rest}
			/>
		)
	},
)

Input.displayName = 'Input'

export default Input
