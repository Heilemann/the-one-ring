import React from 'react'
import bottomborder from '../../assets/bottomborder.png'
import heroborder from '../../assets/heroborder.png'
import Armour from './Armour'
import BasicInfo from './BasicInfo'
import CombatProficiencies from './CombatProficiencies'
import Conditions from './Conditions'
import CurrentEndurance from './CurrentEndurance'
import CurrentHope from './CurrentHope'
import Heart from './Heart'
import Points from './Points'
import Rewards from './Rewards'
import Strength from './Strength'
import TravellingGear from './TravellingGear'
import Virtues from './Virtues'
import WarGear from './WarGear'
import Wits from './Wits'

const Character: React.FC = () => {
	return (
		<div
			className='-m-8 p-8 pt-28'
			style={{
				backgroundImage: `url(${heroborder})`,
				backgroundSize: 'auto 95px',
				backgroundPosition: 'top 10px center',
				backgroundRepeat: 'no-repeat',
				minHeight: '100vh',
				height: 'auto',
			}}
		>
			<BasicInfo />

			<div className='grid grid-cols-4 gap-2 mt-4'>
				<div>
					<Strength />
					<CombatProficiencies />
				</div>
				<div>
					<Heart />
					<Rewards />
				</div>
				<div>
					<Wits />
					<Virtues />
				</div>
				<div>
					<Points />
					<CurrentEndurance />
					<CurrentHope />
					<Conditions />
				</div>
			</div>
			<div className='grid grid-cols-4 gap-2 mt-4'>
				<WarGear />
				<Armour />
				<TravellingGear />
			</div>
			<div
				className='mt-4 h-20 -mx-8'
				style={{
					backgroundImage: `url(${bottomborder})`,
					backgroundSize: 'auto 55px',
					backgroundPosition: 'top 10px center',
					backgroundRepeat: 'no-repeat',
					minHeight: '100vh',
					height: 'auto',
				}}
			></div>
		</div>
	)
}

export default Character
