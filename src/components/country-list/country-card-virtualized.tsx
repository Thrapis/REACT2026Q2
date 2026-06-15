import type { RowComponentProps } from 'react-window';
import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';

type CountryCardVirtualizedProps = {
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
} & RowComponentProps;

export const CountryCardVirtualized = ({
  index,
  style,
  ariaAttributes,
  countries,
  selectedYear,
  selectedColumns,
}: CountryCardVirtualizedProps) => {
  const country = countries[index];
  return (
    <div style={{ ...style, paddingBottom: 16 }} {...ariaAttributes}>
      <CountryCard
        country={country}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
};
