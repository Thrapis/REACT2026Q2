import { describe, it, expect, vi } from 'vitest';
import { convertToBase64 } from './ImageProcessing';

describe('convertToBase64', () => {
  it('should successfully convert a File object to a base64 Data URL string', async () => {
    const fileContent = 'hello world';
    const file = new File([fileContent], 'test.txt', { type: 'text/plain' });

    const result = await convertToBase64(file);

    expect(result).toContain('data:text/plain;base64,');
    expect(result).toBeTypeOf('string');
    expect(window.atob(result.split(',')[1])).toBe(fileContent);
  });

  it('should reject the promise when a file reading error occurs', async () => {
    const file = new File([''], 'error.webp', { type: 'image/webp' });

    const readAsDataURLSpy = vi
      .spyOn(FileReader.prototype, 'readAsDataURL')
      .mockImplementation(function (this: FileReader) {
        this.dispatchEvent(new ProgressEvent('error'));
      });

    await expect(convertToBase64(file)).rejects.toBeInstanceOf(ProgressEvent);

    readAsDataURLSpy.mockRestore();
  });
});
