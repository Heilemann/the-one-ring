import React from 'react'

interface CheckboxRatingProps {
	maxRating?: number
	value: number
	onChange: (value: number) => void
}

const CheckboxRating: React.FC<CheckboxRatingProps> = ({
	maxRating = 6,
	value,
	onChange,
}) => {
	const handleClick = (clickedValue: number) => {
		if (clickedValue === value) {
			// If clicking the rightmost checked checkbox, uncheck all
			onChange(0)
		} else {
			// Otherwise, set the value to the clicked checkbox
			onChange(clickedValue)
		}
	}

	return (
		<div className='flex space-x-1'>
			{[...Array(maxRating)].map((_, index) => (
				<input
					key={index}
					type='checkbox'
					className='form-checkbox h-5 w-5 text-blue-600 cursor-pointer'
					checked={value > index}
					onChange={() => handleClick(index + 1)}
				/>
			))}
		</div>
	)
}

export default CheckboxRating
