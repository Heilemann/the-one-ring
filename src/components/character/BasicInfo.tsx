import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import LabelInput from '../BaseComponents/LabelInput'
import Input from '../Input'
import Points from './Points'

const BasicInfo: React.FC = () => {
	const { register } = useFormContext<ICharacter>()

	return (
		<div>
			<Input
				placeholder='Name'
				centered
				className='w-80 absolute left-1/2 top-12 transform -translate-x-1/2 text-xl font-bold text-[#ba5450]'
				style={{
					fontFamily: 'Aniron',
					backgroundImage: 'none',
				}}
				{...register('name')}
			/>

			<div className='grid grid-cols-8 gap-x-8 gap-y-0'>
				<LabelInput
					label='Heroic Culture'
					{...register('basicInfo.heroicCulture')}
					className='col-span-2'
				/>
				<LabelInput
					label='Age'
					centered
					{...register('basicInfo.age')}
					className='col-span-1'
				/>
				<LabelInput
					label='Treasure'
					centered
					{...register('basicInfo.treasure')}
					className='col-span-1'
				/>
				<LabelInput
					label='Standard of Living'
					{...register('basicInfo.standardOfLiving')}
					className='col-span-2'
				/>
				<div className='col-span-2 row-span-3'>
					<Points />
				</div>

				<LabelInput
					label='Distinctive Features'
					{...register('basicInfo.distinctiveFeatures')}
					className='col-span-2'
				/>
				<LabelInput
					label='Cultural Blessing'
					{...register('basicInfo.culturalBlessing')}
					className='col-span-2'
				/>
				<LabelInput
					label='Patron'
					{...register('basicInfo.patron')}
					className='col-span-2'
				/>

				<LabelInput
					label='Calling'
					{...register('basicInfo.calling')}
					className='col-span-2'
				/>
				<LabelInput
					label='Shadow Path'
					{...register('basicInfo.shadowPath')}
					className='col-span-2'
				/>
				<LabelInput
					label='Flaws'
					{...register('basicInfo.flaws')}
					className='col-span-2'
				/>
			</div>
		</div>
	)
}

export default BasicInfo
