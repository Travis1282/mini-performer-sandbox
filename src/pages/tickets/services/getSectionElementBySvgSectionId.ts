export const getSectionElementBySvgSectionId = (
  sectionId: string,
  element: HTMLDivElement | null
) => {
  return element?.querySelector(`[id='${sectionId}']`) as HTMLElement
}
