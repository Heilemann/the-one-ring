import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { useEditMode } from '../../../hooks/useEditMode'
import StyledLabel from './StyledLabel'

interface CheckboxGroupProps<T extends FieldValues> {
	options: string[]
	label: string
	name: Path<T>
	register: UseFormRegister<T>
	className?: string
	innerClassName?: string
}

function CheckboxGroup<T extends FieldValues>({
	options,
	label,
	name,
	register,
	className,
	innerClassName,
}: CheckboxGroupProps<T>) {
	const editMode = useEditMode()

	return (
		<div className={twMerge('space-y-1', className)}>
			<StyledLabel>{label}</StyledLabel>
			<div className={twMerge(innerClassName)}>
				{options.map(option => (
					<label key={option} className='flex items-center space-x-1'>
						<input
							type='checkbox'
							value={option}
							{...register(name)}
							className='form-checkbox'
							disabled={editMode === 'view'}
						/>
						<span>{option}</span>
					</label>
				))}
			</div>
		</div>
	)
}

export default CheckboxGroup
