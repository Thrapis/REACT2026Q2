import type { CharacterSearchResultEntry } from '@/types/CharacterSearchResult';

export const convertToCSV = (list: CharacterSearchResultEntry[]) => {
  const header = ['id', 'name', 'status', 'species', 'gender', 'image'];

  const getOrderedValues = (item: CharacterSearchResultEntry) => {
    const entries = Object.entries(item);
    return header.map((k) => entries.find(([key]) => key === k)?.[1] || '');
  };

  return [header, ...list.map((e) => getOrderedValues(e))]
    .map((v) => v.join(';'))
    .join('\n');
};
