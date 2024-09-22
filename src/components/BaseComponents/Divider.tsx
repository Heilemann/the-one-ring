import React from 'react'
import { twMerge } from 'tailwind-merge'
import divider from '../../assets/divider-red.png'

interface DividerProps {
	className?: string
}

const Divider: React.FC<DividerProps> = ({ className }) => {
	return (
		<div
			className={twMerge('h-8', className)}
			style={{
				backgroundImage: `url(${divider})`,
				backgroundSize: '100% 15px',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		/>
	)
}

export default Divider
