import React from 'react'
import SkillItem, { SkillItemProps } from './SkillItem'

const StrengthSkills: React.FC = () => {
	const strengthSkills: SkillItemProps[] = [
		{ name: 'Awe', path: 'strength.skills.awe' },
		{ name: 'Athletics', path: 'strength.skills.athletics' },
		{ name: 'Awareness', path: 'strength.skills.awareness' },
		{ name: 'Hunting', path: 'strength.skills.hunting' },
		{ name: 'Song', path: 'strength.skills.song' },
		{ name: 'Craft', path: 'strength.skills.craft' },
	]

	return (
		<>
			<h4>Strength Skills</h4>
			<div>
				{strengthSkills.map(skill => (
					<SkillItem key={skill.name} name={skill.name} path={skill.path} />
				))}
			</div>
		</>
	)
}

export default StrengthSkills
