import { XMarkIcon } from '@heroicons/react/24/solid'
import React from 'react'

interface RemoveRowButtonProps {
	onClick: () => void
	isVisible: boolean
}

const RemoveRowButton: React.FC<RemoveRowButtonProps> = ({
	onClick,
	isVisible,
}) => {
	if (!isVisible) return null

	return (
		<button
			type='button'
			onClick={onClick}
			className='text-red-700 hover:bg-red-500/10 h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full absolute right-2 top-1/2 -translate-y-1/2 pointer'
		>
			<XMarkIcon className='w-4 h-4' />
		</button>
	)
}

export default RemoveRowButton
