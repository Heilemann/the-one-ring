import React from 'react'
import { twMerge } from 'tailwind-merge'

interface MediumHeaderProps {
	children: React.ReactNode
	centered?: boolean
	className?: string
}

const MediumHeader: React.FC<MediumHeaderProps> = ({
	children,
	centered = false,
	className,
}) => {
	return (
		<h3
			className={twMerge(
				'text-base font-bold text-[#ba5450]',
				centered && 'text-center',
				className,
			)}
			style={{ fontFamily: 'Aniron' }}
		>
			{children}
		</h3>
	)
}

export default MediumHeader
