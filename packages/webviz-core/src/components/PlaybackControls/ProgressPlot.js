// @flow
//
//  Copyright (c) 2019-present, Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.
import { complement } from "intervals-fn";
import React, { useCallback } from "react";

import AutoSizingCanvas from "webviz-core/src/components/AutoSizingCanvas";
import type { Progress } from "webviz-core/src/players/types";
import { useTheme } from "webviz-core/src/styles/theme";

const BAR_HEIGHT = 40;
const LINE_START = 5;
const LINE_HEIGHT = 5;

type ProgressProps = {|
  progress: Progress,
|};

export const ProgressPlot = React.memo<ProgressProps>(function ProgressPlot({ progress }: ProgressProps) {
  const unloadedColor = useTheme().colors.shadeMedium;
  const draw = useCallback(
    (context: CanvasRenderingContext2D, width: number, height: number) => {
      context.clearRect(0, 0, width, height);

      if (progress.fullyLoadedFractionRanges) {
        context.fillStyle = unloadedColor;
        const invertedRanges = complement({ start: 0, end: 1 }, progress.fullyLoadedFractionRanges);
        for (const range of invertedRanges) {
          const start = width * range.start;
          const end = width * range.end;
          context.fillRect(start, LINE_START + 12, end - start, LINE_HEIGHT);
        }
      }
    },
    [progress, unloadedColor]
  );

  return (
    <div style={{ height: BAR_HEIGHT }}>
      <AutoSizingCanvas draw={draw} />
    </div>
  );
});
