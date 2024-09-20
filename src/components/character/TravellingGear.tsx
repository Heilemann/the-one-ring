import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'

const TravellingGear: React.FC = () => {
	const { register } = useFormContext<ICharacter>()

	return (
		<div>
			<h3>Travelling Gear</h3>
			{/* Add form field for travelling gear */}
		</div>
	)
}

export default TravellingGear
