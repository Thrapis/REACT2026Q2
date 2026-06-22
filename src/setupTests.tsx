import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import React from 'react';

type MockImageProps = React.ComponentPropsWithoutRef<'img'>;

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    className,
    width,
    height,
    ...props
  }: MockImageProps) => {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        {...props}
      />
    );
  },
}));

afterEach(() => {
  cleanup();
});
