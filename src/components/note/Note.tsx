import React, { useContext } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import context from '../BaseComponents/context'
import RichTextEditor from '../BaseComponents/Form/RTE/RichTextEditor'
import Input from '../Input'

const Note: React.FC = () => {
	const { state } = useContext(context)
	const { document, editMode } = state
	const { values } = document
	const { register } = useFormContext()

	const text = useWatch({
		name: 'text',
		defaultValue: values?.text || '',
	})

	return (
		<div className='flex flex-col gap-2'>
			<Input
				className={twMerge(
					'flex-0 w-full text-lg',
					editMode === 'view' && 'hidden',
				)}
				placeholder='Name...'
				{...register('name')}
			/>
			<RichTextEditor
				name='text'
				defaultValue={text}
				className={editMode === 'edit' ? 'mt-3' : ''}
			/>
		</div>
	)
}

export default Note
