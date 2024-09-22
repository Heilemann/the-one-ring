import React from 'react'
import bottomborder from '../../assets/bottomborder.png'
import heroborder from '../../assets/heroborder.png'
import verticalstripes from '../../assets/verticalstripes.png'
import Asset from '../BaseComponents/Asset'
import Divider from '../BaseComponents/Divider'
import HorizontalStripes from '../BaseComponents/HorizontalStripes'
import Armour from './Armour'
import BasicInfo from './BasicInfo'
import CombatProficiencies from './CombatProficiencies'
import Conditions from './Conditions'
import CurrentEndurance from './CurrentEndurance'
import CurrentHope from './CurrentHope'
import Heart from './Heart'
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
			<div className='absolute top-6 left-8 w-20 h-20 rounded-full overflow-hidden'>
				<Asset
					name='token'
					addLabel='Add Portrait'
					removeLabel='Remove Portrait'
					className='col-span-2 row-span-3 text-white max-h-36'
				/>
			</div>

			<BasicInfo />

			<HorizontalStripes />

			<div
				className='grid grid-cols-3 gap-12'
				style={{
					backgroundImage: `url(${verticalstripes}), url(${verticalstripes})`,
					backgroundSize: '10px 100%',
					backgroundPosition: 'calc(33.33% - 12px) 0, calc(66.66% + 12px) 0',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<div>
					<Strength />
					<Divider />
					<CombatProficiencies />
				</div>
				<div>
					<Heart />
					<Divider />
					<Rewards />
				</div>
				<div>
					<Wits />
					<Divider />
					<Virtues />
				</div>
			</div>

			<HorizontalStripes />

			<div className='grid grid-cols-3 gap-8'>
				<CurrentEndurance />
				<CurrentHope />
				<Conditions />
			</div>

			<HorizontalStripes />

			<div className='grid grid-cols-3 gap-8'>
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
				}}
			></div>
		</div>
	)
}

export default Character
