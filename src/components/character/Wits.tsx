import React from 'react'
import AttributeSection from './AttributeSection'
import { SkillListItem } from './SkillsSection'

const Wits: React.FC = () => {
	const witsSkills: SkillListItem[] = [
		{ name: 'Persuade', path: 'wits.skills.persuade' },
		{ name: 'Stealth', path: 'wits.skills.stealth' },
		{ name: 'Scan', path: 'wits.skills.scan' },
		{ name: 'Explore', path: 'wits.skills.explore' },
		{ name: 'Riddle', path: 'wits.skills.riddle' },
		{ name: 'Lore', path: 'wits.skills.lore' },
	]

	return (
		<AttributeSection
			title='Wits'
			skills={witsSkills}
			thirdInputLabel='Parry'
		/>
	)
}

export default Wits
