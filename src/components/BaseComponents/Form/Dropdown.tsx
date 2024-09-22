import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export interface IDropdownProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {
	children: React.ReactNode
}

const Dropdown = forwardRef<HTMLSelectElement, IDropdownProps>(
	(props: IDropdownProps, ref) => {
		const { children, className, ...rest } = props

		return (
			<select
				ref={ref}
				className={twMerge('', 'cursor-pointer text-xl', className)}
				{...rest}
			>
				{children}
			</select>
		)
	},
)

export default Dropdown
