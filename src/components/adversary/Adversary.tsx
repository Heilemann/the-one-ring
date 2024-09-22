import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { useEditMode } from '../../hooks/useEditMode'
import { IAdversary } from '../../interfaces/adversary'
import Asset from '../BaseComponents/Asset'
import StyledLabel from '../BaseComponents/Form/StyledLabel'
import TextArea from '../BaseComponents/Form/Textarea'
import useMessageToApp from '../BaseComponents/hooks/UseMessageToApp'
import DiamondInput from '../DiamondInput'
import Input from '../Input'

export default function Adversary() {
	const editMode = useEditMode()
	const messageToApp = useMessageToApp()
	const { register, control } = useFormContext<IAdversary>()
	const {
		fields: fellAbilityFields,
		append: appendFellAbility,
		remove: removeFellAbility,
	} = useFieldArray({
		control,
		name: 'fellAbilities',
	})

	const fellAbilities =
		useWatch({
			control,
			name: 'fellAbilities',
		}) || []
	const description = useWatch({
		control,
		name: 'description',
	})
	const combatProficiency = useWatch({
		control,
		name: 'combatProficiencies.primary',
	})

	const handleAttack = () => {
		messageToApp({
			message: 'send message',
			data: {
				payload: `/roll 1d12+${combatProficiency.rating}d6`,
			},
		})
	}

	// Watch hateOrResolve as a number
	const hateOrResolve =
		useWatch({
			control,
			name: 'hateOrResolve',
		}) || 0

	const traits = useWatch({
		control,
		name: 'traits',
	})

	// Compute total cost of fell abilities
	const totalFellAbilityCost = fellAbilities.reduce((total, ability) => {
		const cost = Number(ability.cost) || 0
		return total + cost
	}, 0)

	// Calculate remaining Hate/Resolve points
	const remainingHateOrResolve = hateOrResolve - totalFellAbilityCost

	return (
		<div>
			<div className='grid grid-cols-5 gap-2 items-start'>
				<div className='col-span-5'>
					<Input
						className='text-xl font-bold'
						placeholder='Name...'
						disabled={editMode === 'view'}
						style={{
							fontFamily: 'Aniron',
						}}
						{...register('name')}
					/>

					{(editMode === 'edit' || (editMode === 'view' && traits)) && (
						<Input
							className='text-sm mt-1 pb-0 font-medium text-black'
							placeholder={'Traits...'}
							disabled={editMode === 'view'}
							{...register('traits')}
						/>
					)}

					{editMode === 'edit' || (editMode === 'view' && description) ? (
						<TextArea
							placeholder={editMode === 'edit' ? 'Description...' : ''}
							spellCheck={editMode !== 'view'}
							{...register('description')}
						/>
					) : null}
				</div>
			</div>

			{/* Attributes */}
			<div className='grid md:grid-cols-6 gap-2 mt-6 grid-cols-3'>
				<DiamondInput
					label='Attribute'
					className='col-span-1'
					centered
					disabled={editMode === 'view'}
					{...register('attributeLevel')}
				/>
				<DiamondInput
					label='Endurance'
					centered
					disabled={editMode === 'view'}
					{...register('endurance')}
				/>
				<DiamondInput
					label='Might'
					centered
					disabled={editMode === 'view'}
					{...register('might')}
				/>
				<DiamondInput
					label='Hate/Resolve'
					centered
					disabled={editMode === 'view'}
					value={editMode === 'view' ? remainingHateOrResolve : hateOrResolve}
					readOnly={editMode === 'view'}
					{...register('hateOrResolve')}
				/>
				<DiamondInput
					label='Parry'
					centered
					disabled={editMode === 'view'}
					{...register('parry')}
				/>
				<DiamondInput
					label='Armour'
					centered
					disabled={editMode === 'view'}
					{...register('armour')}
				/>
			</div>

			{/* Combat Proficiencies */}
			<div className='space-y-2 mt-8'>
				<div className='grid grid-cols-6 gap-2'>
					<StyledLabel className='pb-0 col-span-2'>
						<span className='hidden md:block'>Combat Proficiency</span>
						<span className='block md:hidden'>Proficiency</span>
					</StyledLabel>
					<StyledLabel className='pb-0 text-center'>Rating</StyledLabel>
					<StyledLabel className='pb-0 text-center'>
						<span className='hidden md:block'>Damage</span>
						<span className='block md:hidden'>Dmg</span>
					</StyledLabel>
					<StyledLabel className='pb-0 text-center'>Injury</StyledLabel>
					<StyledLabel className='pb-0 text-center'>Effect</StyledLabel>
				</div>
				<div className='grid grid-cols-6 gap-2'>
					<Input
						className='col-span-2 text-black'
						{...register('combatProficiencies.primary.name')}
					/>
					<Input
						type='number'
						centered
						className={twMerge(
							'text-black',
							editMode === 'view' && 'cursor-pointer underline',
						)}
						readOnly={editMode === 'view'}
						onClick={editMode === 'view' ? handleAttack : undefined}
						{...register('combatProficiencies.primary.rating')}
					/>
					<Input
						type='number'
						centered
						className='text-black'
						{...register('combatProficiencies.primary.damage')}
					/>
					<Input
						type='number'
						centered
						className='text-black'
						{...register('combatProficiencies.primary.injury')}
					/>
					<Input
						centered
						className='text-black'
						{...register('combatProficiencies.primary.effect')}
					/>
				</div>
				<div className='grid grid-cols-6 gap-2'>
					<Input
						className='col-span-2 text-black'
						{...register('combatProficiencies.secondary.name')}
					/>
					<Input
						type='number'
						centered
						className={twMerge(
							'text-black',
							editMode === 'view' && 'cursor-pointer underline',
						)}
						readOnly={editMode === 'view'}
						onClick={editMode === 'view' ? handleAttack : undefined}
						{...register('combatProficiencies.secondary.rating')}
					/>
					<Input
						type='number'
						className='text-black'
						centered
						{...register('combatProficiencies.secondary.damage')}
					/>
					<Input
						type='number'
						className='text-black'
						centered
						{...register('combatProficiencies.secondary.injury')}
					/>
					<Input
						centered
						className='text-black'
						{...register('combatProficiencies.secondary.effect')}
					/>
				</div>
			</div>

			{/* Conditionally render Fell Abilities section */}
			{/* {(editMode === 'edit' || */}
			{(true ||
				fellAbilities.some(
					ability => ability.name || ability.description || ability.cost !== 0,
				)) && (
				<div className='space-y-2 mt-8'>
					{/* Header */}
					<div className='grid grid-cols-6 gap-2'>
						<StyledLabel className='pb-0 col-span-2'>
							Fell Abilities
						</StyledLabel>
						<StyledLabel className='pb-0 col-span-1 text-center'>
							Cost
						</StyledLabel>
						<StyledLabel className='pb-0 col-span-3'>Description</StyledLabel>
					</div>

					{fellAbilityFields.map((field, index) => (
						<div key={field.id} className='grid grid-cols-6 gap-2 items-start'>
							{/* Ability Name */}
							<Input
								className='col-span-2 text-black'
								placeholder='—'
								disabled={editMode === 'view'}
								{...register(`fellAbilities.${index}.name`)}
							/>

							{/* Cost */}
							<Input
								type='number'
								className='text-center col-span-1'
								placeholder='—'
								disabled={editMode === 'view'}
								{...register(`fellAbilities.${index}.cost`)}
							/>

							{/* Description */}
							<TextArea
								className={twMerge('col-span-3', editMode === 'view' && 'my-0')}
								placeholder='—'
								disabled={editMode === 'view'}
								{...register(`fellAbilities.${index}.description`)}
							/>

							{/* Remove Button (only in edit mode and if more than one ability) */}
							{editMode === 'edit' && fellAbilityFields.length > 1 && (
								<button
									type='button'
									onClick={() => removeFellAbility(index)}
									className='text-red-500 col-span-6 text-right'
								>
									Remove Ability
								</button>
							)}
						</div>
					))}

					{/* Add Ability Button */}
					{editMode === 'edit' && (
						<button
							type='button'
							onClick={() =>
								appendFellAbility({ name: '', description: '', cost: '' })
							}
							className='text-blue-500'
						>
							Add Ability
						</button>
					)}
				</div>
			)}
			<Asset
				name='token'
				addLabel='Add Portrait'
				removeLabel='Remove Portrait'
				className='mx-auto'
			/>
		</div>
	)
}
