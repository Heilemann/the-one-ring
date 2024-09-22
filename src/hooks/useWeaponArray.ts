import { isEqual, omit } from 'lodash'
import { useCallback, useEffect, useMemo } from 'react'
import { Control, useFieldArray, useWatch } from 'react-hook-form'
import { ICharacter } from '../interfaces/character'

export const emptyWeapon = {
	name: '',
	damage: 0,
	injury: 0,
	load: 0,
	notes: '',
}

export const useWeaponArray = (control: Control<ICharacter>) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'warGear.weapons',
	})

	const weapons = useWatch({
		control,
		name: 'warGear.weapons',
		defaultValue: [],
	})

	const lastItemIsDirty = useMemo(() => {
		if (weapons.length === 0) return false
		const lastItem = weapons[weapons.length - 1]
		return !isEqual(omit(lastItem, 'id'), emptyWeapon)
	}, [weapons])

	const appendEmptyWeapon = useCallback(
		(weapon = emptyWeapon) => {
			append(weapon, { shouldFocus: false })
		},
		[append],
	)

	useEffect(() => {
		if (weapons.length === 0 || lastItemIsDirty) {
			appendEmptyWeapon()
		}
	}, [weapons, lastItemIsDirty, appendEmptyWeapon])

	return { fields, appendEmptyWeapon, remove, weapons }
}
