import { describe, it, expect } from 'vitest';
import { convertToCSV } from './FileHelper';
import { MOCK_CHARACTERS } from '@/test-utils/Api';
import type { CharacterSearchResultEntry } from '@/types/CharacterSearchResult';

describe('FileHelper', () => {
  describe('convertToCSV', () => {
    it('should convert an empty list to just the header row', () => {
      const result = convertToCSV([]);
      expect(result).toBe('id;name;status;species;gender;image');
    });

    it('should correctly format a list of characters into semicolon-separated rows', () => {
      const expectedCSV = [
        'id;name;status;species;gender;image',
        '1;Rick Sanchez;Alive;Human;Male;image-link-1',
        '2;Morty Smith;Alive;Human;Male;image-link-2',
      ].join('\n');

      const result = convertToCSV(MOCK_CHARACTERS);
      expect(result).toBe(expectedCSV);
    });

    it('should leave fields blank if they are missing or out of order in the object', () => {
      const mockList: Partial<CharacterSearchResultEntry>[] = [
        { name: 'No ID', status: 'Dead' },
      ];

      const expectedCSV = [
        'id;name;status;species;gender;image',
        ';No ID;Dead;;;',
      ].join('\n');

      const result = convertToCSV(mockList as CharacterSearchResultEntry[]);
      expect(result).toBe(expectedCSV);
    });
  });
});
