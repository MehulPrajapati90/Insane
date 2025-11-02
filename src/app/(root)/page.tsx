import { onBoardUser } from '@/modules/auth/actions';
import TradingViewWidget from '@/modules/charts/components/trading-view-widget';
import SetUpModel from '@/modules/home/components/setup-model';
import { MARKET_DATA_WIDGET_CONFIG, MARKET_OVERVIEW_WIDGET_CONFIG, TOP_STORIES_WIDGET_CONFIG } from '@/modules/utils';

const Home = async () => {
  const scriptUrl = "https://s3.tradingview.com/external-embedding/embed-widget-";
  const user = await onBoardUser();
  return (
    <div className='flex min-h-screen home-wrapper'>
      <section className='grid w-full gap-8 home-section'>
        <div className='md:col-span-1 xl:col-span-1'>
          <TradingViewWidget
            title='Market Overview'
            scriptUrl={`${scriptUrl}market-overview.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            height={600}
            classname='custom-chart'
          />
        </div>
        <div className='md:col-span-1 xl:col-span-2'>
          <TradingViewWidget
            title='Stock Heatmap'
            scriptUrl={`${scriptUrl}stock-heatmap.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>

      <section className='grid w-full gap-8 home-section'>
        <div className='h-full md:col-span-1 xl:col-span-1'>
          <TradingViewWidget
            title='Top Stories'
            scriptUrl={`${scriptUrl}timeline.js`}
            config={TOP_STORIES_WIDGET_CONFIG}
            height={600}
            classname='custom-chart'
          />
        </div>
        <div className='h-full md:col-span-1 xl:col-span-2'>
          <TradingViewWidget
            title='Stock Heatmap'
            scriptUrl={`${scriptUrl}market-quotes.js`}
            config={MARKET_DATA_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>
      <SetUpModel user={user?.user!} />
    </div>
  )
}

export default Home;