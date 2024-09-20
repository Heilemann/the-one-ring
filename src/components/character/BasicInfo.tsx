import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import Asset from '../BaseComponents/Asset'
import LabelInput from '../BaseComponents/LabelInput'
import Input from '../Input'

const BasicInfo: React.FC = () => {
	const { register } = useFormContext<ICharacter>()
	return (
		<div>
			<Input
				placeholder='Name'
				centered
				{...register('name')}
				className='w-80 absolute left-1/2 top-14 transform -translate-x-1/2 text-xl font-bold'
				style={{
					fontFamily: 'Aniron',
					backgroundImage: 'none',
				}}
			/>

			<div className='grid grid-cols-8 gap-x-2 gap-y-0'>
				<LabelInput
					label='Heroic Culture'
					{...register('heroicCulture')}
					className='col-span-2'
				/>
				<LabelInput label='Age' {...register('age')} className='col-span-1' />
				<LabelInput
					label='Treasure'
					{...register('treasure')}
					className='col-span-1'
				/>
				<LabelInput
					label='Standard of Living'
					{...register('standardOfLiving')}
					className='col-span-2'
				/>
				<Asset
					name='token'
					addLabel='Add Portrait'
					removeLabel='Remove Portrait'
					className='col-span-2 row-span-3 text-white'
				/>

				<LabelInput
					label='Distinctive Features'
					{...register('distinctiveFeatures')}
					className='col-span-2'
				/>
				<LabelInput
					label='Cultural Blessing'
					{...register('culturalBlessing')}
					className='col-span-2'
				/>
				<LabelInput
					label='Patron'
					{...register('patron')}
					className='col-span-2'
				/>

				<LabelInput
					label='Calling'
					{...register('calling')}
					className='col-span-2'
				/>
				<LabelInput
					label='Shadow Path'
					{...register('shadowPath')}
					className='col-span-2'
				/>
				<LabelInput
					label='Flaws'
					{...register('flaws')}
					className='col-span-2'
				/>
			</div>
		</div>
	)
}

export default BasicInfo
