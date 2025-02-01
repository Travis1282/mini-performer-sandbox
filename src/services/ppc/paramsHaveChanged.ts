export const paramsHaveChanged = (
  currentParams: Record<string, null | string>,
  previousParams: Record<string, null | string>
): boolean => {
  return Object.keys(currentParams).some(
    (key) => currentParams[key] !== previousParams[key]
  )
}
