import { useContext } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { IAdversary, SpecialDamageOption } from '../../interfaces/adversary'
import context from '../BaseComponents/context'
import Label from '../BaseComponents/Form/Label'
import TextArea from '../BaseComponents/Form/Textarea'
import VInput from '../BaseComponents/Form/VInput'

const specialDamageOptions: SpecialDamageOption[] = [
	'Heavy Blow',
	'Break Shield',
	'Pierce',
	'Seize',
]

export default function Adversary() {
	const { state } = useContext(context)
	const document = state?.document
	const values = document?.values || {}

	const onSubmit = (data: IAdversary) => {
		// Handle form submission
		console.log('Adversary data submitted:', data)
	}

	// Access form methods using useFormContext
	const { register, control } = useFormContext<IAdversary>()

	// Set up useFieldArray for fellAbilities
	const {
		fields: fellAbilityFields,
		append: appendFellAbility,
		remove: removeFellAbility,
	} = useFieldArray({
		control,
		name: 'fellAbilities',
	})

	return (
		<div className='p-4 space-y-4'>
			{/* Basic Info */}
			<div className='grid grid-cols-5 gap-2'>
				<VInput name='name' label='Name' className='col-span-4' />
				<VInput
					name='attributeLevel'
					type='number'
					label='Attribute Level'
					centered
				/>
			</div>
			<div className='space-y-2'>
				<Label>Description</Label>
				<TextArea
					name='description'
					label='Description'
					placeholder='Description'
					className='h-24'
				/>
			</div>

			{/* Attributes */}
			<div className='grid grid-cols-5 gap-2'>
				<VInput name='endurance' type='number' label='Endurance' centered />
				<VInput name='might' type='number' label='Might' centered />
				<VInput
					name='hateOrResolve'
					type='number'
					label='Hate/Resolve'
					centered
				/>
				<VInput name='parry' type='number' label='Parry' centered />
				<VInput name='armour' type='number' label='Armour' centered />
			</div>

			{/* Combat Proficiencies */}
			<div className='space-y-2'>
				<h2 className='text-lg font-bold'>Primary Combat Proficiency</h2>
				<div className='grid grid-cols-5 gap-2'>
					<VInput
						name='combatProficiencies.primary.name'
						label='Weapon Name'
						className='col-span-2'
					/>
					<VInput
						name='combatProficiencies.primary.rating'
						type='number'
						label='Rating'
						centered
					/>
					<VInput
						name='combatProficiencies.primary.damage'
						type='number'
						label='Damage'
						centered
					/>
					<VInput
						name='combatProficiencies.primary.injury'
						type='number'
						label='Injury'
						centered
					/>
				</div>
				<div className='grid grid-cols-5 gap-2'>
					<VInput
						name='combatProficiencies.secondary.name'
						label='Weapon Name'
						className='col-span-2'
					/>
					<VInput
						name='combatProficiencies.secondary.rating'
						type='number'
						label='Rating'
						centered
					/>
					<VInput
						name='combatProficiencies.secondary.damage'
						type='number'
						label='Damage'
						centered
					/>
					<VInput
						name='combatProficiencies.secondary.injury'
						type='number'
						label='Injury'
						centered
					/>
				</div>
			</div>

			{/* Special Damage Options */}
			<div className='space-y-1'>
				<label className='block text-lg font-medium'>
					Special Damage Options:
				</label>
				{specialDamageOptions.map(option => (
					<label key={option} className='flex items-center space-x-1'>
						<input
							type='checkbox'
							value={option}
							{...register('combatProficiencies.primary.specialDamageOptions')}
							className='form-checkbox'
						/>
						<span>{option}</span>
					</label>
				))}
			</div>

			{/* Fell Abilities */}
			<div className='space-y-2'>
				<h2 className='text-lg font-bold'>Fell Abilities</h2>
				{fellAbilityFields.map((field, index) => (
					<div key={field.id} className='space-y-1'>
						<VInput name={`fellAbilities.${index}.name`} label='Ability Name' />
						<TextArea
							name={`fellAbilities.${index}.description`}
							label='Description'
							placeholder='Description'
						/>
						<VInput
							name={`fellAbilities.${index}.cost`}
							type='number'
							label='Cost'
						/>
						<button
							type='button'
							onClick={() => removeFellAbility(index)}
							className='text-red-500'
						>
							Remove Ability
						</button>
					</div>
				))}
				<button
					type='button'
					onClick={() =>
						appendFellAbility({ name: '', description: '', cost: 0 })
					}
					className='text-blue-500'
				>
					Add Ability
				</button>
			</div>

			<button
				type='submit'
				className='px-4 py-2 bg-blue-500 text-white rounded'
			>
				Save Adversary
			</button>
		</div>
	)
}
