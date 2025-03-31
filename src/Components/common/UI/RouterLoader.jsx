// components/RouteLoader.tsx
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RouteLoader = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = () => setLoading(true);
        const end = () => setLoading(false);

        router.events.on('routeChangeStart', start);
        router.events.on('routeChangeComplete', end);
        router.events.on('routeChangeError', end);

        return () => {
            router.events.off('routeChangeStart', start);
            router.events.off('routeChangeComplete', end);
            router.events.off('routeChangeError', end);
        };
    }, [router]);

    return loading ? (
        <Overlay>
            <Spin size="large" />
        </Overlay>
    ) : null;
};

export default RouteLoader;
