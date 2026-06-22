import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Providers from './Providers';
import { useQueryClient } from '@tanstack/react-query';
import { DEFAULT_CACHE_TTL_MS } from '@/constants/EnvironmentVariables';

function TestChild() {
  const queryClient = useQueryClient();
  const defaultOptions = queryClient.getDefaultOptions();

  const rawStaleTime = defaultOptions.queries?.staleTime;

  return (
    <div>
      <span data-testid="child-text">It just works</span>
      <span data-testid="stale-time">{rawStaleTime?.toString()}</span>
    </div>
  );
}

describe('Providers Component', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should render children successfully inside all provider wrappers', () => {
    render(
      <Providers>
        <TestChild />
      </Providers>
    );

    expect(screen.getByTestId('child-text')).toBeInTheDocument();
    expect(screen.getByText('It just works')).toBeInTheDocument();
  });

  it('should initialize QueryClient with default cache fallback time when env variable is missing', () => {
    delete process.env.NEXT_PUBLIC_CACHE_TTL_MS;

    render(
      <Providers>
        <TestChild />
      </Providers>
    );

    const staleTimeElement = screen.getByTestId('stale-time');
    expect(staleTimeElement.textContent).toBe(DEFAULT_CACHE_TTL_MS.toString());
  });

  it('should initialize QueryClient with specific cache time from process.env variable', async () => {
    const customCacheTime = '100000';
    process.env.NEXT_PUBLIC_CACHE_TTL_MS = customCacheTime;

    const { default: Providers } = await import('./Providers');

    render(
      <Providers>
        <TestChild />
      </Providers>
    );

    const staleTimeElement = screen.getByTestId('stale-time');
    expect(staleTimeElement.textContent).toBe(customCacheTime);
  });
});
