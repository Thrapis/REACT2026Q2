'use client';

import { createContext } from 'react';
import type { IntlContextType } from './types';

export const IntlContext = createContext<IntlContextType | undefined>(
  undefined
);
