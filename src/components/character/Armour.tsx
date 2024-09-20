import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import StyledLabel from '../BaseComponents/Form/StyledLabel'
import Input from '../Input'

const Armour: React.FC = () => {
	const { register } = useFormContext<ICharacter>()

	return (
		<div className='mt-4'>
			<StyledLabel>Armour</StyledLabel>
			<div className='grid grid-cols-3 gap-4'>
				<div>
					<StyledLabel>Body Armour</StyledLabel>
					<Input placeholder='Name' {...register('armour.armour.name')} />
					<Input
						type='number'
						placeholder='Protection'
						{...register('armour.armour.protection', { valueAsNumber: true })}
					/>
					<Input
						type='number'
						placeholder='Load'
						{...register('armour.armour.load', { valueAsNumber: true })}
					/>
				</div>
				<div>
					<StyledLabel>Helm</StyledLabel>
					<Input placeholder='Name' {...register('armour.helm.name')} />
					<Input
						type='number'
						placeholder='Protection'
						{...register('armour.helm.protection', { valueAsNumber: true })}
					/>
					<Input
						type='number'
						placeholder='Load'
						{...register('armour.helm.load', { valueAsNumber: true })}
					/>
				</div>
				<div>
					<StyledLabel>Shield</StyledLabel>
					<Input placeholder='Name' {...register('armour.shield.name')} />
					<Input
						type='number'
						placeholder='Parry'
						{...register('armour.shield.parry', { valueAsNumber: true })}
					/>
					<Input
						type='number'
						placeholder='Load'
						{...register('armour.shield.load', { valueAsNumber: true })}
					/>
				</div>
			</div>
		</div>
	)
}

export default Armour
