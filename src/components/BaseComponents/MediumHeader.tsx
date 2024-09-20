import React from 'react'
import { twMerge } from 'tailwind-merge'

interface MediumHeaderProps {
	children: React.ReactNode
	centered?: boolean
}

const MediumHeader: React.FC<MediumHeaderProps> = ({
	children,
	centered = false,
}) => {
	return (
		<h3
			className={twMerge(
				'text-xs font-bold text-[#ba5450]',
				centered && 'text-center',
			)}
			style={{ fontFamily: 'Aniron' }}
		>
			{children}
		</h3>
	)
}

export default MediumHeader
