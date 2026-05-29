'use client';

import { useState } from 'react';
import posthog from 'posthog-js';
import styles from './page.module.scss';

const fmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const MIN = 1000;
const MAX = 50000;
const STEP = 500;

export function ImpactCalculator() {
  const [budget, setBudget] = useState<number>(5000);
  const donation = Math.round(budget * 0.1);
  const percent = ((budget - MIN) / (MAX - MIN)) * 100;

  return (
    <div className={styles.impactCalc}>
      <div className={styles.impactCalcRow}>
        <div className={styles.impactCalcInputCol}>
          <span className={styles.impactCalcLabel}>Project budget</span>
          <p className={styles.impactCalcValue}>{fmt.format(budget)}</p>
        </div>

        <span className={styles.impactCalcArrow} aria-hidden="true">
          →
        </span>

        <div className={styles.impactCalcResultCol}>
          <span className={styles.impactCalcLabel}>Goes to St. Jude</span>
          <p className={styles.impactCalcValue}>{fmt.format(donation)}</p>
        </div>
      </div>

      <input
        type="range"
        min={MIN}
        max={MAX}
        step={STEP}
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        onMouseUp={() =>
          posthog.capture('impact_calculator_used', {
            budget,
            donation,
          })
        }
        onTouchEnd={() =>
          posthog.capture('impact_calculator_used', {
            budget,
            donation,
          })
        }
        className={styles.impactCalcSlider}
        style={{ '--fill': `${percent}%` } as React.CSSProperties}
        aria-label="Project budget"
        data-attr="impact-budget-slider"
      />

      <div className={styles.impactCalcScale}>
        <span>{fmt.format(MIN)}</span>
        <span>{fmt.format(MAX)}+</span>
      </div>
    </div>
  );
}
