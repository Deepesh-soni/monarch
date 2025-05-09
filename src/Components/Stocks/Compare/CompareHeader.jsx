import React from "react";
import { Breadcrumb, Skeleton } from "antd";
import Link from "next/link";
import dynamic from "next/dynamic";

const SearchableDropdown = dynamic(() => import("@common/UI/Search/SearchDropdownCmp"), { ssr: false });
const FaArrowRightArrowLeft = dynamic(() => import("react-icons/fa6").then(mod => mod.FaArrowRightArrowLeft), { ssr: false });

const Title = ({ children }) => <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{children}</h2>;
const Subtitle = ({ children }) => <p style={{ color: '#6b7280', marginBottom: '2rem' }}>{children}</p>;
const Row = ({ children }) => <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>{children}</div>;

const CompareHeader = ({ dataA, dataB, stockA, stockB, setStockA, setStockB, loadingA, loadingB }) => (
    <>
        <Breadcrumb
            style={{ marginBottom: '1rem' }}
            items={[
                {
                    title: <Link href="/"> Home</Link>,
                },
                {
                    title: dataA ? <Link href={`/stocks/${dataA?.fqn}`}>{dataA?.companyName}</Link> : '',
                },
                {
                    title: "Compare",
                },
            ]}
        />
        <Title>Stock Comparison</Title>
        <Subtitle>Compare key metrics between two stocks</Subtitle>
        <Row>
            <SearchableDropdown
                placeholder="Select Stock A"
                width="100%"
                onChange={(item) => setStockA(item.fqn)}
                value={stockA}
                loading={loadingA}
            />
            <FaArrowRightArrowLeft size={24} />
            <SearchableDropdown
                placeholder="Select Stock B"
                width="100%"
                onChange={(item) => setStockB(item.fqn)}
                value={stockB}
                loading={loadingB}
            />
        </Row>
    </>
);

export default CompareHeader; 