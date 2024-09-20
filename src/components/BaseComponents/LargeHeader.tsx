import React from 'react'

interface LargeHeaderProps {
	children: React.ReactNode
	centered?: boolean
}

const LargeHeader: React.FC<LargeHeaderProps> = ({
	children,
	centered = false,
}) => {
	return (
		<h2
			className={`text-xl font-bold text-[#ba5450] ${centered ? 'text-center' : ''}`}
			style={{ fontFamily: 'Aniron' }}
		>
			{children}
		</h2>
	)
}

export default LargeHeader
