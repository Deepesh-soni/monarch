// components/SearchableDropdown.tsx
import React, { useState, useCallback, useRef } from 'react';
import { Select, Spin } from 'antd';
import { debounce } from 'lodash';
import axios from 'axios';
import { client } from "@axiosClient";
import { FaSearch } from 'react-icons/fa';

interface Props {
    width?: string;
    onChange?: (stock: any) => void;
}

const SearchableDropdown = ({ width = '100%', onChange }: Props) => {
    const [options, setOptions] = useState([]);
    const [fetching, setFetching] = useState(false);
    const abortControllerRef: any = useRef(null);
    const [selectedLabel, setSelectedLabel] = useState('');


    const fetchOptions = useCallback(
        debounce(async (searchText: any, abortSignal: any) => {
            if (!searchText) return;
            try {
                const response = await client.post('/stock/search', { name: searchText }, { signal: abortSignal });
                const { hits } = response.data;
                const formattedOptions = hits.map((hit: any) => ({
                    value: JSON.stringify(hit),
                    label: (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 500, fontSize: '14px' }}>{hit.companyName}</span>
                            <span style={{ fontSize: '12px', color: '#6b7280' }}>
                                {hit.nseSymbol || hit.bseCode}
                            </span>
                        </div>
                    ),
                    displayLabel: hit.companyName,
                }));
                setOptions(formattedOptions);
            } catch (error) {
                if (!axios.isCancel(error)) console.error(error);
            } finally {
                setFetching(false);
            }
        }, 300),
        []
    );
    const handleSearch = (value: any) => {
        if (abortControllerRef.current) abortControllerRef.current.abort();
        abortControllerRef.current = new AbortController();
        setFetching(true);
        fetchOptions(value, abortControllerRef.current.signal);
    };


    const handleChange = (selected: any) => {
        const selectedItem = JSON.parse(selected.value);
        setSelectedLabel(selected.label.props.children[0].props.children); // set just the name
        if (onChange) onChange(selectedItem);
    };

    return (
        <div
            style={{
                width,
                border: '1px solid #687792',
                borderRadius: '18px',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'white',
            }}
        >
            <FaSearch color="#687792" />
            <Select
                showSearch
                labelInValue
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                style={{ flex: 1, border: 'none' }}
                options={options}
                placeholder="Search by stock name, stock symbol or code"
                value={selectedLabel ? { label: selectedLabel, value: '' } : undefined}
                bordered={false}
            />
        </div>
    );
};

export default SearchableDropdown;
