import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { convertToCSV, downloadFile } from './FileHelper';
import type { CharacterSearchResultEntry } from '@/types/CharacterSearchResult';

describe('FileHelper', () => {
  describe('convertToCSV', () => {
    it('should convert an empty list to just the header row', () => {
      const result = convertToCSV([]);
      expect(result).toBe('id;name;status;species;gender;image');
    });

    it('should correctly format a list of characters into semicolon-separated rows', () => {
      const mockList: Partial<CharacterSearchResultEntry>[] = [
        {
          id: 1,
          name: 'Rick',
          status: 'Alive',
          species: 'Human',
          gender: 'Male',
          image: 'url1',
        },
        {
          id: 2,
          name: 'Morty',
          status: 'Alive',
          species: 'Human',
          gender: 'Male',
          image: 'url2',
        },
      ];

      const expectedCSV = [
        'id;name;status;species;gender;image',
        '1;Rick;Alive;Human;Male;url1',
        '2;Morty;Alive;Human;Male;url2',
      ].join('\n');

      const result = convertToCSV(mockList as CharacterSearchResultEntry[]);
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

  describe('downloadFile', () => {
    beforeEach(() => {
      URL.createObjectURL = vi.fn(() => 'blob:mock-url');
      URL.revokeObjectURL = vi.fn();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should create an anchor element, trigger a download, and clean up the DOM', () => {
      const appendSpy = vi.spyOn(document.body, 'append');
      const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click');
      const removeSpy = vi.spyOn(HTMLAnchorElement.prototype, 'remove');

      downloadFile('1;name;blah-blah', 'characters.csv');

      expect(URL.createObjectURL).toHaveBeenCalledTimes(1);

      expect(appendSpy).toHaveBeenCalled();
      const createdAnchor = appendSpy.mock.calls[0][0] as HTMLAnchorElement;
      expect(createdAnchor.href).toBe('blob:mock-url');
      expect(createdAnchor.download).toBe('characters.csv');
      expect(createdAnchor.style.display).toBe('none');

      expect(clickSpy).toHaveBeenCalledTimes(1);
      expect(removeSpy).toHaveBeenCalledTimes(1);
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
    });

    it('should fallback to default filename "file" when no name is provided', () => {
      const appendSpy = vi.spyOn(document.body, 'append');

      downloadFile('1;name;blah-blah');

      const createdAnchor = appendSpy.mock.calls[0][0] as HTMLAnchorElement;
      expect(createdAnchor.download).toBe('file');
    });
  });
});
