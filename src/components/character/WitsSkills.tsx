import React from 'react'
import SkillItem, { SkillItemProps } from './SkillItem'

const WitsSkills: React.FC = () => {
	const witsSkills: SkillItemProps[] = [
		{ name: 'Persuade', path: 'wits.skills.persuade' },
		{ name: 'Stealth', path: 'wits.skills.stealth' },
		{ name: 'Scan', path: 'wits.skills.scan' },
		{ name: 'Explore', path: 'wits.skills.explore' },
		{ name: 'Riddle', path: 'wits.skills.riddle' },
		{ name: 'Lore', path: 'wits.skills.lore' },
	]

	return (
		<>
			<h4>Wits Skills</h4>
			<div>
				{witsSkills.map(skill => (
					<SkillItem key={skill.name} name={skill.name} path={skill.path} />
				))}
			</div>
		</>
	)
}

export default WitsSkills
