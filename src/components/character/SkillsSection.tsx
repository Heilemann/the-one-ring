import React from 'react'
import { Path } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import SkillItem from './SkillItem'

export interface SkillListItem {
	name: string
	path: Path<ICharacter>
}

interface SkillsSectionProps {
	skills: SkillListItem[]
	attributeTargetNumber: number
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
	skills,
	attributeTargetNumber,
}) => {
	return (
		<div className='space-y-1'>
			{skills.map(skill => (
				<SkillItem
					key={skill.name}
					name={skill.name}
					path={skill.path}
					attributeTargetNumber={attributeTargetNumber}
				/>
			))}
		</div>
	)
}

export default SkillsSection
