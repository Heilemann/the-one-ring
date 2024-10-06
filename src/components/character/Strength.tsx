import React from 'react'
import AttributeSection from './AttributeSection'
import { SkillListItem } from './SkillsSection'

const Strength: React.FC = () => {
	const strengthSkills: SkillListItem[] = [
		{ name: 'Awe', path: 'strength.skills.awe' },
		{ name: 'Athletics', path: 'strength.skills.athletics' },
		{ name: 'Awareness', path: 'strength.skills.awareness' },
		{ name: 'Hunting', path: 'strength.skills.hunting' },
		{ name: 'Song', path: 'strength.skills.song' },
		{ name: 'Craft', path: 'strength.skills.craft' },
	]

	return (
		<AttributeSection
			title='Strength'
			skills={strengthSkills}
			thirdInputLabel='Endur.'
		/>
	)
}

export default Strength
