import { Layout, LegacyCard, Page } from "@shopify/polaris";
import { Card, OrderDetails, OrderGraphs } from "../components";

export default function HomePage() {
  return (
    <Page fullWidth>
      <div className='home-section'>
        <div className='graphs-section'>
          <OrderGraphs />
        </div>
      </div>
    </Page>
  );
}
