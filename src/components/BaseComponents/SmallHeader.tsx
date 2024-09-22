import React from 'react'
import { twMerge } from 'tailwind-merge'

interface SmallHeaderProps {
	children: React.ReactNode
	centered?: boolean
	className?: string
}

const SmallHeader: React.FC<SmallHeaderProps> = ({
	children,
	centered = false,
	className,
}) => {
	return (
		<h4
			className={twMerge(
				'text-xs font-bold text-[#ba5450]',
				centered && 'text-center',
				className,
			)}
			style={{ fontFamily: 'Aniron' }}
		>
			{children}
		</h4>
	)
}

export default SmallHeader
