"use client";

import { cn } from '@/lib/utils';
import useTradingViewWidget from '@/modules/hooks/use-trading-view';
import { memo } from 'react';

interface TradingViewWidgetProps {
    title: string;
    scriptUrl: string;
    config: Record<string, unknown>;
    height: number;
    classname?: string;
}

const TradingViewWidget = ({ classname, height, scriptUrl, config, title }: TradingViewWidgetProps) => {
    const containerRef = useTradingViewWidget(scriptUrl, config, height = 600);

    return (
        <div className='w-full'>

            {title && (
                <h3 className='font-semibold text-2xl text-gray-100 mb-5'>{title}</h3>
            )}

            <div className="tradingview-widget-container" ref={containerRef}>
                <div className="tradingview-widget-container__widget" style={{ height, width: "100%" }}></div>
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);
