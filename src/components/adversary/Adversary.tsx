import { useEffect } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import background from '../../assets/background.jpg'
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

	// Ensure there is at least one empty ability on mount
	useEffect(() => {
		if (fellAbilityFields.length === 0) {
			appendFellAbility({ name: '', description: '', cost: '' })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // Run only once on mount

	// Watch the fellAbilities array
	const fellAbilities =
		useWatch({
			control,
			name: 'fellAbilities',
		}) || []

	// Automatically add an empty ability when the last one has data
	useEffect(() => {
		if (editMode !== 'edit') return

		const lastIndex = fellAbilities.length - 1
		const lastAbility = fellAbilities[lastIndex]

		if (
			lastAbility &&
			(lastAbility.name || lastAbility.description || lastAbility.cost)
		) {
			// Check if there's already an empty ability at the end
			const isNextAbilityEmpty =
				fellAbilities[lastIndex + 1] &&
				!fellAbilities[lastIndex + 1].name &&
				!fellAbilities[lastIndex + 1].description &&
				!fellAbilities[lastIndex + 1].cost

			if (!isNextAbilityEmpty) {
				appendFellAbility({ name: '', description: '', cost: '' })
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editMode, fellAbilities.length]) // Depend only on the length

	const description = useWatch({
		control,
		name: 'description',
	})
	const combatProficiency = useWatch({
		control,
		name: 'combatProficiencies.primary',
	})

	const handleAttack = () => {
		const payload = `/roll 1d12+${combatProficiency.rating}d6`
		console.log(payload)
		messageToApp({
			message: 'send message',
			data: {
				payload,
			},
		})
	}

	return (
		<div
			className='p-8 space-y-8 text-black h-full'
			style={{
				borderImageSource: `url(${background})`,
				borderImageSlice: '500 fill',
				borderImageWidth: '120px',
			}}
		>
			<div className='grid grid-cols-5 gap-2 items-start'>
				<div className='col-span-3'>
					<Input
						className='text-xl font-bold'
						placeholder='Name...'
						disabled={editMode === 'view'}
						style={{
							fontFamily: 'Aniron',
						}}
						{...register('name')}
					/>

					<Input
						className='text-sm mt-1 pb-0 font-medium text-black'
						placeholder='Traits...'
						disabled={editMode === 'view'}
						{...register('traits')}
					/>

					{editMode === 'edit' ||
					(editMode === 'view' && description !== '') ? (
						<TextArea
							placeholder={editMode === 'edit' ? 'Description...' : ''}
							spellCheck={editMode !== 'view'}
							{...register('description')}
						/>
					) : null}
				</div>

				<DiamondInput
					label='Attribute Level'
					className='col-span-2'
					inputClassName='h-20 w-20 text-xl'
					centered
					disabled={editMode === 'view'}
					{...register('attributeLevel')}
				/>
			</div>

			{/* Attributes */}
			<div className='grid grid-cols-5 gap-2 mt-6'>
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
						Combat Proficiencies
					</StyledLabel>
					<StyledLabel className='pb-0 text-center'>Rating</StyledLabel>
					<StyledLabel className='pb-0 text-center'>Damage</StyledLabel>
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
							editMode === 'view' && 'cursor-pointer',
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
							editMode === 'view' && 'cursor-pointer',
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
			{(editMode === 'edit' ||
				fellAbilities.some(
					ability => ability.name || ability.description || ability.cost !== '',
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
