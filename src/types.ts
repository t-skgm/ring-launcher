export type Direction = 'right' | 'left'

export interface ItemType {
  id?: string
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
}
