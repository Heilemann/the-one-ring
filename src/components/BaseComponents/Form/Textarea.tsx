import { forwardRef, useContext } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { twMerge } from 'tailwind-merge'
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
					`leading-16 mb-1 mt-1 block w-full rounded-lg border-none bg-gray-800/50 p-2 text-sm text-white placeholder-gray-400 shadow-none transition-all duration-200 ease-in-out placeholder:text-gray-500`,
					editMode === 'view' ? 'bg-transparent p-0' : '',
					className,
				)}
				{...rest}
			/>
		)
	},
)

export default TextArea
