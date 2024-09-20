// this component renders the correct component based on a given document's type.
// This is where you add and remove your sheets.
import background from '../assets/background.jpg'
import { TDocumentType } from '../interfaces/document'
import Adversary from './adversary/Adversary'
import Character from './character/Character'
import Effect from './effect/Effect'
import Equipment from './equipment/Equipment'
import Handout from './handout/Handout'
import Note from './note/Note'
import Weapon from './weapon/Weapon'

type Props = {
	type: TDocumentType
}

export default function TypeSwitcher({ type }: Props) {
	if (!type) return null

	return (
		<div
			className='min-h-screen h-auto flex flex-col text-sm text-black p-8'
			style={{
				backgroundImage: `url(${background})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				minHeight: '100vh',
				height: 'auto',
			}}
		>
			{type === 'character' && <Character />}
			{type === 'note' && <Note />}
			{type === 'weapon' && <Weapon />}
			{type === 'handout' && <Handout />}
			{type === 'effect' && <Effect />}
			{type === 'equipment' && <Equipment />}
			{type === 'adversary' && <Adversary />}
		</div>
	)
}
