import { useCallback, useEffect } from 'react';
import { IWithID } from './types';

export const useMount = (func: () => void) => useEffect(func, []);

export const useKeyExtractor = <TItem extends IWithID>(prefix: string) =>
  useCallback(
    (item: TItem, index: number) => `${prefix}-${item.id}-${index}`,
    [],
  );
