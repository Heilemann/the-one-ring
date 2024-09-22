import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import divider from '../assets/divider-red.png'
import { useEditMode } from '../hooks/useEditMode'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	value?: string
	className?: string
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
					'bg-transparent focus:outline-none placeholder:text-[#ba5450]/50 w-full autofill:bg-transparent autofill:text-[#ba5450] autofill:shadow-[inset_0_0_0px_1000px_transparent] text-[#ba5450] transition-all duration-200 ease-in-out',
					'[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
					centered && 'text-center',
					rest.readOnly && 'cursor-pointer',
					className,
				)}
				autoComplete='off'
				autoCorrect='off'
				autoCapitalize='off'
				spellCheck='false'
				style={{
					backgroundRepeat: 'repeat-x',
					backgroundPosition: 'bottom',
					backgroundColor: 'transparent',
					...(editMode === 'edit' && {
						paddingBottom: '16px',
						backgroundImage: `url(${divider})`,
					}),
					...style,
				}}
				{...rest}
			/>
		)
	},
)

Input.displayName = 'Input'

export default Input
