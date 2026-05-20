'use client';

import { useState, useCallback } from 'react';

export interface TweaksState {
  accentHue: number;
  motion: 'off' | 'subtle' | 'ambient';
  density: 'compact' | 'regular' | 'spacious';
}

export const useTweaks = (defaults: TweaksState) => {
  const [values, setValues] = useState(defaults);

  const setTweak = useCallback(
    (keyOrEdits: string | Partial<TweaksState>, val?: any) => {
      const edits =
        typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : { [keyOrEdits]: val };
      setValues((prev) => ({ ...prev, ...edits }));
    },
    []
  );

  return [values, setTweak] as const;
};
