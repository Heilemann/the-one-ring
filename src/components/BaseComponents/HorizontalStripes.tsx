import React from 'react'
import { twMerge } from 'tailwind-merge'
import horizontalstripes from '../../assets/horizontalstripes.png'

interface HorizontalStripesProps {
	className?: string
}

const HorizontalStripes: React.FC<HorizontalStripesProps> = ({ className }) => {
	return (
		<div
			className={twMerge('h-12', className)}
			style={{
				backgroundImage: `url(${horizontalstripes})`,
				backgroundSize: '100% 15px',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		/>
	)
}

export default HorizontalStripes
