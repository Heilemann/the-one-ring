import React from 'react'
import { twMerge } from 'tailwind-merge'

interface LargeHeaderProps {
	children: React.ReactNode
	centered?: boolean
	className?: string
}

const LargeHeader: React.FC<LargeHeaderProps> = ({
	children,
	centered = false,
	className,
}) => {
	return (
		<h2
			className={twMerge(
				'text-xl font-bold text-[#ba5450]',
				centered && 'text-center',
				className,
			)}
			style={{ fontFamily: 'Aniron' }}
		>
			{children}
		</h2>
	)
}

export default LargeHeader
