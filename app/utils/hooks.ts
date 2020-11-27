import { useCallback } from 'react';
import { IWithID } from './types';

export const useKeyExtractor = <TItem extends IWithID>(prefix: string) =>
  useCallback(
    (item: TItem, index: number) => `${prefix}-${item.id}-${index}`,
    [],
  );
