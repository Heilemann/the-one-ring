import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
	Adversary as AdversaryType,
	SpecialDamageOption,
} from '../../interfaces/adversary'

const Adversary: React.FC = () => {
	const { control, handleSubmit } = useForm<AdversaryType>()

	const onSubmit = (data: AdversaryType) => {
		console.log(data)
		// Here you would typically save the data or update the state
	}

	const specialDamageOptions: SpecialDamageOption[] = [
		'Heavy Blow',
		'Break Shield',
		'Pierce',
		'Seize',
	]

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<h2 className='text-2xl font-bold mb-4'>Adversary</h2>

			<div className='grid grid-cols-2 gap-4'>
				<div>
					<label className='block mb-1'>Name</label>
					<Controller
						name='name'
						control={control}
						defaultValue=''
						render={({ field }) => (
							<input {...field} className='w-full p-2 border rounded' />
						)}
					/>
				</div>

				<div>
					<label className='block mb-1'>Attribute Level</label>
					<Controller
						name='attributeLevel'
						control={control}
						defaultValue={0}
						render={({ field }) => (
							<input
								type='number'
								{...field}
								className='w-full p-2 border rounded'
							/>
						)}
					/>
				</div>
			</div>

			<div>
				<label className='block mb-1'>Description</label>
				<Controller
					name='description'
					control={control}
					defaultValue=''
					render={({ field }) => (
						<textarea
							{...field}
							className='w-full p-2 border rounded'
							rows={3}
						/>
					)}
				/>
			</div>

			<div className='grid grid-cols-3 gap-4'>
				<div>
					<label className='block mb-1'>Endurance</label>
					<Controller
						name='endurance'
						control={control}
						defaultValue={0}
						render={({ field }) => (
							<input
								type='number'
								{...field}
								className='w-full p-2 border rounded'
							/>
						)}
					/>
				</div>
				<div>
					<label className='block mb-1'>Might</label>
					<Controller
						name='might'
						control={control}
						defaultValue={0}
						render={({ field }) => (
							<input
								type='number'
								{...field}
								className='w-full p-2 border rounded'
							/>
						)}
					/>
				</div>
				<div>
					<label className='block mb-1'>Hate/Resolve Type</label>
					<Controller
						name='hateOrResolve.type'
						control={control}
						defaultValue='Hate'
						render={({ field }) => (
							<select {...field} className='w-full p-2 border rounded'>
								<option value='Hate'>Hate</option>
								<option value='Resolve'>Resolve</option>
							</select>
						)}
					/>
				</div>
			</div>

			<div className='grid grid-cols-3 gap-4'>
				<div>
					<label className='block mb-1'>Hate/Resolve Value</label>
					<Controller
						name='hateOrResolve.value'
						control={control}
						defaultValue={0}
						render={({ field }) => (
							<input
								type='number'
								{...field}
								className='w-full p-2 border rounded'
							/>
						)}
					/>
				</div>
				<div>
					<label className='block mb-1'>Parry</label>
					<Controller
						name='parry'
						control={control}
						defaultValue={0}
						render={({ field }) => (
							<input
								type='number'
								{...field}
								className='w-full p-2 border rounded'
							/>
						)}
					/>
				</div>
				<div>
					<label className='block mb-1'>Armour</label>
					<Controller
						name='armour'
						control={control}
						defaultValue={0}
						render={({ field }) => (
							<input
								type='number'
								{...field}
								className='w-full p-2 border rounded'
							/>
						)}
					/>
				</div>
			</div>

			<div>
				<h3 className='text-xl font-bold mb-2'>Combat Proficiencies</h3>
				<div className='grid grid-cols-2 gap-4'>
					{['primary', 'secondary'].map(proficiency => (
						<div key={proficiency} className='border p-4 rounded'>
							<h4 className='font-bold mb-2 capitalize'>{proficiency}</h4>
							<div className='space-y-2'>
								<Controller
									name={`combatProficiencies.${proficiency}.name` as any}
									control={control}
									defaultValue=''
									render={({ field }) => (
										<input
											{...field}
											placeholder='Name'
											className='w-full p-2 border rounded'
										/>
									)}
								/>
								<Controller
									name={`combatProficiencies.${proficiency}.rating` as any}
									control={control}
									defaultValue={0}
									render={({ field }) => (
										<input
											type='number'
											{...field}
											placeholder='Rating'
											className='w-full p-2 border rounded'
										/>
									)}
								/>
								<Controller
									name={`combatProficiencies.${proficiency}.damage` as any}
									control={control}
									defaultValue={0}
									render={({ field }) => (
										<input
											type='number'
											{...field}
											placeholder='Damage'
											className='w-full p-2 border rounded'
										/>
									)}
								/>
								<Controller
									name={`combatProficiencies.${proficiency}.injury` as any}
									control={control}
									defaultValue={0}
									render={({ field }) => (
										<input
											type='number'
											{...field}
											placeholder='Injury'
											className='w-full p-2 border rounded'
										/>
									)}
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			<div>
				<h3 className='text-xl font-bold mb-2'>Special Damage Options</h3>
				<div className='grid grid-cols-2 gap-2'>
					{specialDamageOptions.map(option => (
						<div key={option} className='flex items-center'>
							<Controller
								name='specialDamageOptions'
								control={control}
								defaultValue={[]}
								render={({ field }) => (
									<input
										type='checkbox'
										{...field}
										value={option}
										checked={field.value.includes(option)}
										onChange={e => {
											const updatedValue = e.target.checked
												? [...field.value, option]
												: field.value.filter((val: string) => val !== option)
											field.onChange(updatedValue)
										}}
										className='mr-2'
									/>
								)}
							/>
							<label>{option}</label>
						</div>
					))}
				</div>
			</div>

			<div>
				<h3 className='text-xl font-bold mb-2'>Fell Abilities</h3>
				<Controller
					name='fellAbilities'
					control={control}
					defaultValue={[]}
					render={({ field }) => (
						<div>
							{field.value.map((ability: any, index: number) => (
								<div key={index} className='mb-2 p-2 border rounded'>
									<input
										{...field}
										placeholder='Name'
										value={ability.name}
										onChange={e => {
											const updatedAbilities = [...field.value]
											updatedAbilities[index] = {
												...ability,
												name: e.target.value,
											}
											field.onChange(updatedAbilities)
										}}
										className='w-full p-2 border rounded mb-2'
									/>
									<textarea
										{...field}
										placeholder='Description'
										value={ability.description}
										onChange={e => {
											const updatedAbilities = [...field.value]
											updatedAbilities[index] = {
												...ability,
												description: e.target.value,
											}
											field.onChange(updatedAbilities)
										}}
										className='w-full p-2 border rounded mb-2'
										rows={2}
									/>
									<input
										type='number'
										{...field}
										placeholder='Cost'
										value={ability.cost}
										onChange={e => {
											const updatedAbilities = [...field.value]
											updatedAbilities[index] = {
												...ability,
												cost: parseInt(e.target.value),
											}
											field.onChange(updatedAbilities)
										}}
										className='w-full p-2 border rounded'
									/>
								</div>
							))}
							<button
								type='button'
								onClick={() =>
									field.onChange([
										...field.value,
										{ name: '', description: '', cost: 0 },
									])
								}
								className='mt-2 p-2 bg-blue-500 text-white rounded'
							>
								Add Fell Ability
							</button>
						</div>
					)}
				/>
			</div>

			<button type='submit' className='p-2 bg-green-500 text-white rounded'>
				Save Adversary
			</button>
		</form>
	)
}

export default Adversary
