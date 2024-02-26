export interface Filter {
  name: string
  backName: string
  options: {name: string, backName: string}[]
}

export interface SearchFilter {
  filter: Filter[],
  Name: string | null
}