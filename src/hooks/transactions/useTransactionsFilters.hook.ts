'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import {
  Currency,
  TransactionStatus,
  TransactionType,
} from '@transaction-types/transaction';

export const useTransactionsFilters = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<TransactionType[]>([]);
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | 'ALL'>(
    'ALL'
  );
  const [currencyFilter, setCurrencyFilter] = useState<Currency[]>([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    'date' | 'method' | 'currency'
  >('date');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [localTypeFilter, setLocalTypeFilter] = useState<TransactionType[]>([]);
  const [localCurrencyFilter, setLocalCurrencyFilter] = useState<Currency[]>(
    []
  );
  const filterPanelRef = useRef<HTMLDivElement>(null);

  const apiFilters = useMemo(() => {
    const filterObj: Record<string, unknown> = {
      limit: 20,
    };

    if (search) {
      filterObj.search = search;
    }

    if (statusFilter !== 'ALL') {
      filterObj.status = statusFilter;
    }

    if (typeFilter.length > 0) {
      filterObj.type = typeFilter[0];
    }

    if (currencyFilter.length > 0) {
      filterObj.currency = currencyFilter[0];
    }

    if (startDate) {
      filterObj.startDate = startDate.toISOString();
    }

    if (endDate) {
      filterObj.endDate = endDate.toISOString();
    }

    return filterObj;
  }, [search, statusFilter, typeFilter, currencyFilter, startDate, endDate]);

  useEffect(() => {
    if (showFilterPanel && activeFilter === 'method') {
      setLocalTypeFilter(typeFilter);
    }
    if (showFilterPanel && activeFilter === 'currency') {
      setLocalCurrencyFilter(currencyFilter);
    }
  }, [showFilterPanel, activeFilter, typeFilter, currencyFilter]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterPanelRef.current &&
        !filterPanelRef.current.contains(event.target as Node)
      ) {
        setShowFilterPanel(false);
      }
    };

    if (showFilterPanel) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilterPanel]);

  return {
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    currencyFilter,
    setCurrencyFilter,
    showFilterPanel,
    setShowFilterPanel,
    activeFilter,
    setActiveFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    localTypeFilter,
    setLocalTypeFilter,
    localCurrencyFilter,
    setLocalCurrencyFilter,
    filterPanelRef,
    apiFilters,
  };
};
