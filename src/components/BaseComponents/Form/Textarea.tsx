import React, { forwardRef, useContext } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { twMerge } from 'tailwind-merge'
import divider from '../../../assets/divider-red.png'
import context from '../context'

interface ITextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
	({ className, style, ...rest }, ref) => {
		const { state } = useContext(context)
		const { editMode } = state

		return (
			<ReactTextareaAutosize
				ref={ref}
				className={twMerge(
					`leading-16 mb-1 mt-1 block w-full rounded-lg border-none bg-gray-800/50 py-1 text-sm text-white placeholder-gray-400 shadow-none transition-all duration-200 ease-in-out resize-none min-h-16 focus:outline-none placeholder:text-[#9f4c3f]/50`,
					editMode === 'view' ? 'bg-transparent p-0' : 'bg-transparent',
					className,
				)}
				style={{
					...style,
					backgroundRepeat: 'repeat-x',
					backgroundPosition: 'bottom',
					backgroundColor: 'transparent',
					color: 'black',
					...(editMode === 'edit' && {
						paddingBottom: '16px',
						backgroundImage: `url(${divider})`,
					}),
				}}
				{...rest}
			/>
		)
	},
)

export default TextArea
