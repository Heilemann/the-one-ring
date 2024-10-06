import React from 'react'
import { Path, useFormContext, useWatch } from 'react-hook-form' // Added 'Path' to the import
import { ICharacter } from '../../interfaces/character'
import { getEffectiveTargetNumber } from '../../utils/getEffectiveTargetNumber' // Import the utility function
import SkillItem from './SkillItem'

export interface SkillListItem {
	name: string
	path: Path<ICharacter>
}

interface SkillsSectionProps {
	title: string
	skills: SkillListItem[]
	attributeTargetNumber: number
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
	title,
	skills,
	attributeTargetNumber,
}) => {
	const { control } = useFormContext<ICharacter>()
	const lowerCaseTitle = title.toLowerCase() as keyof ICharacter

	// Define the Attribute type
	interface Attribute {
		rating?: number
		targetNumber?: number
	}

	// Watch attribute values with correct typing
	const attribute = useWatch<Attribute>({
		control,
		name: lowerCaseTitle as Path<ICharacter>,
		defaultValue: {},
	})

	const effectiveTargetNumber = getEffectiveTargetNumber(attribute)

	return (
		<div className='space-y-1'>
			{skills.map(skill => (
				<SkillItem
					key={skill.name}
					name={skill.name}
					path={skill.path}
					attributeTargetNumber={effectiveTargetNumber}
				/>
			))}
		</div>
	)
}

export default SkillsSection
