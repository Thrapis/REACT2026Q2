import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { List } from 'react-window';
import type { Country, YearData } from '../../types';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';
import { CountryCardVirtualized } from './country-card-virtualized';

import styles from './country-list.module.css';

const DEFAULT_HEIGHT = 500;
const OUTER_PADDING = 20;
const META_HEIGHT = 126;
const COLUMN_HEIGHT = 38;
const ELEMENT_GAP = 20;

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
  const filteredCountries = useMemo(
    () =>
      countries.filter((c) => {
        const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
        return matchesSearch && matchesRegion;
      }),
    [countries, searchQuery, selectedRegion]
  );

  const sortedCountries = useMemo(() => {
    const mapOfYearDataMaps = new Map<string, Map<number, YearData>>(
      countries.map((a) => [a.id, createYearDataMap(a.data)])
    );
    const stubMap = new Map();

    return [...filteredCountries].sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
      } else {
        const popA =
          getPopulationForYear(mapOfYearDataMaps.get(a.id) ?? stubMap, selectedYear) || 0;
        const popB =
          getPopulationForYear(mapOfYearDataMaps.get(b.id) ?? stubMap, selectedYear) || 0;
        return sortOrder === 'asc' ? popA - popB : popB - popA;
      }
    });
  }, [filteredCountries, selectedYear, sortField, sortOrder]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = useState(DEFAULT_HEIGHT);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const { top } = containerRef.current.getBoundingClientRect();
        setListHeight(window.innerHeight - top - OUTER_PADDING);
      }
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const itemSize = useMemo(
    () => META_HEIGHT + selectedColumns.length * COLUMN_HEIGHT + ELEMENT_GAP,
    [selectedColumns.length]
  );

  const rowProps = useMemo(
    () => ({ countries: sortedCountries, selectedYear, selectedColumns }),
    [sortedCountries, selectedYear, selectedColumns]
  );

  return (
    <div ref={containerRef} className={styles.countryList} style={{ height: listHeight }}>
      <List
        rowComponent={CountryCardVirtualized}
        rowProps={rowProps}
        rowCount={filteredCountries.length}
        rowHeight={itemSize}
        overscanCount={3}
        defaultHeight={DEFAULT_HEIGHT}
      />
    </div>
  );
});
