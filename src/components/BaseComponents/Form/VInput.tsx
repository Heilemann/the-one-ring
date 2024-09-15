import { Input } from 'nrsystemtools'
import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import context from '../context'
import Label from './Label'

interface IVInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	hide?: boolean
	labelBelow?: boolean
}

const VInput = React.forwardRef<HTMLInputElement, IVInputProps>(
	(
		{
			children,
			className,
			label,
			labelBelow = false,
			hide = false,
			...rest
		}: IVInputProps,
		ref,
	) => {
		const { state } = React.useContext(context)
		const { editMode } = state

		return (
			<div
				className={twMerge(
					'mb-1 flex-1',
					labelBelow ? 'flex-col-reverse' : 'flex-col',
					hide ? 'hidden' : 'flex',
					className,
				)}
			>
				<Label
					className='font-semibold uppercase text-gray-500'
					style={{
						fontSize: '0.65rem',
					}}
					htmlFor={rest.name}
				>
					{label}
				</Label>
				<div
					className={twMerge(
						'flex items-center',
						editMode === 'edit' ? 'bg-gray-800/50 hover:bg-gray-800' : 'px-0',
					)}
				>
					<Input
						ref={ref}
						className={twMerge(
							'w-full flex-1 bg-transparent transition-all duration-200 ease-in-out',
							editMode === 'edit' ? '' : 'px-0',
						)}
						placeholder='—'
						id={rest.name}
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
