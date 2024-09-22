export function getEffectiveTargetNumber(attribute: any): number {
	const targetNumber = Number(attribute?.targetNumber)
	const rating = Number(attribute?.rating) || 0

	if (!isNaN(targetNumber) && targetNumber > 0) {
		return targetNumber
	} else {
		return 20 - rating
	}
}
