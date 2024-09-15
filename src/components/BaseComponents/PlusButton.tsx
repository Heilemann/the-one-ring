import { PlusCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

const PlusButton: React.FC<Props> = props => {
	return (
		<button {...props}>
			<PlusCircleIcon className='h-6 w-6' />
		</button>
	)
}

export default PlusButton
