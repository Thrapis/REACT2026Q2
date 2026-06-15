import { memo, useMemo } from 'react';
import type { YearData } from '../../types';
import { formatNumber } from '../../utils/format-utils';

import styles from './data-table.module.css';

const FORMAT_SETTINGS = {
  maximumFractionDigits: 2,
} as const;

type DataTableProps = {
  data: YearData[];
  year: number;
  columns: string[];
};

export const DataTable = memo(function DataTable({ data, year, columns }: DataTableProps) {
  const yearDataRecord = useMemo(() => data.find((d) => d.year === year), [data, year]);

  if (!yearDataRecord) {
    return <div className={styles.noData}>No data available for year {year}</div>;
  }

  return (
    <table className={styles.table}>
      <tbody>
        {columns.map((column) => (
          <tr key={column} className={styles.row}>
            <td className={styles.labelCell}>{column.replace(/_/g, ' ').toUpperCase()}</td>
            <td className={styles.valueCell}>
              {formatNumber(
                yearDataRecord[column as keyof YearData] as number | undefined,
                FORMAT_SETTINGS
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
