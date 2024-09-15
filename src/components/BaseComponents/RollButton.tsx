import { CubeIcon } from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'

type Props = {
	onClick?: () => void
	className?: string
}

const RollButton = ({ onClick, className }: Props) => {
	return (
		<button
			onClick={onClick}
			className={twMerge('text-gray-500 hover:text-white', className)}
		>
			<CubeIcon className='h-5 w-5 ' aria-hidden='true' />
		</button>
	)
}

export default RollButton
