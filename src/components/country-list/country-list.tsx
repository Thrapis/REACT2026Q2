import type { Country, YearData } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';
import { memo, useMemo } from 'react';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

export const CountryList = memo(function CountryList({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) {
  const mapOfYearDataMaps = useMemo(() => {
    return new Map<string, Map<number, YearData>>(
      countries.map((a) => [a.id, createYearDataMap(a.data)])
    );
  }, [countries]);
  const stubMap = useMemo(() => new Map(), []);

  const filteredCountries = useMemo(
    () =>
      countries.filter((c) => {
        const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
        return matchesSearch && matchesRegion;
      }),
    [countries, searchQuery, selectedRegion]
  );

  const sortedCountries = useMemo(
    () =>
      [...filteredCountries].sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
        } else {
          const popA =
            getPopulationForYear(mapOfYearDataMaps.get(a.id) ?? stubMap, selectedYear) || 0;
          const popB =
            getPopulationForYear(mapOfYearDataMaps.get(b.id) ?? stubMap, selectedYear) || 0;
          return sortOrder === 'asc' ? popA - popB : popB - popA;
        }
      }),
    [filteredCountries, selectedYear, sortField, sortOrder, mapOfYearDataMaps]
  );

  return (
    <div className={styles.countryList}>
      {sortedCountries.map((country) => (
        <CountryCard
          key={country.id}
          country={country}
          selectedYear={selectedYear}
          selectedColumns={selectedColumns}
        />
      ))}
    </div>
  );
});
