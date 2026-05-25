import { describe, it, expect, vi, beforeEach } from 'vitest';
import useLocalStorage from './UseLocalStorage';
import { act, renderHook } from '@testing-library/react';

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.clear();
  });

  it('should initialize with the provided initialValue', () => {
    const initialValue = 'test';
    const { result } = renderHook(() => useLocalStorage('key', initialValue));

    expect(result.current[0]).toBe(initialValue);
  });

  it('should initialize with null if no initialValue and localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('key'));

    expect(result.current[0]).toBeNull();
  });

  it('should initialize with localStorage value if no initialValue', () => {
    mockLocalStorage.setItem('key', 'stored-value');

    const { result } = renderHook(() => useLocalStorage('key'));

    expect(result.current[0]).toBe('stored-value');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('key');
  });

  it('should update the value and localStorage when setItemValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('key', 'updated');
  });

  it('should handle undefined initialValue as null', () => {
    const { result } = renderHook(() => useLocalStorage('key', undefined));

    expect(result.current[0]).toBeNull();
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('key');
  });

  it('should persist the value across re-renders', () => {
    const { result, rerender } = renderHook(
      ({ key, initialValue }) => useLocalStorage(key, initialValue),
      { initialProps: { key: 'key', initialValue: 'initial' } }
    );

    act(() => {
      result.current[1]('updated');
    });

    rerender({ key: 'key', initialValue: 'initial' });

    expect(result.current[0]).toBe('updated');
    expect(mockLocalStorage.getItem('key')).toBe('updated');
  });
});
