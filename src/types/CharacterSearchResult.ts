export interface CharacterSearchResult {
  error?: string;
  info?: CharacterSearchResultInfo;
  results?: CharacterSearchResultEntry[];
}

export interface CharacterSearchResultInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface CharacterSearchResultEntry {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}
