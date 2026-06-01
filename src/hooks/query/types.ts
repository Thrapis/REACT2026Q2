export const characterKeys = {
  search: (name: string, page: number) =>
    ['characters', 'search', { name, page }] as const,
  detail: (id: number) => ['characters', 'detail', id] as const,
};
