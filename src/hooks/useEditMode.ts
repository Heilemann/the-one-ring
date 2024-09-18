import { useContext, useMemo } from 'react'
import context from '../components/BaseComponents/context'

export function useEditMode() {
	const { state } = useContext(context)
	return useMemo(() => state.editMode, [state.editMode])
}
