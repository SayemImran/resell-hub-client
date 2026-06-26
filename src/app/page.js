import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PopularCategories from "@/components/home/PopularCategories";
import SuccessStories from "@/components/home/SuccessStories";
import MarketplaceStats from "@/components/home/MarketplaceStats";
import SustainabilityImpact from "@/components/home/SustainabilityImpact";
import TrustedSellers from "@/components/home/TrustedSellers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Home() {
  const [productsRes, statsRes, sellersRes] = await Promise.all([
    fetch(`${API_URL}/api/products?approvalStatus=approved&limit=6`, {
      cache: "no-store",
    }),
    fetch(`${API_URL}/api/stats/marketplace`, { cache: "no-store" }),
    fetch(`${API_URL}/api/sellers/trusted`, { cache: "no-store" }),
  ]);
 console.log(sellersRes);
  const { data: featuredProducts = [] } = productsRes.ok
    ? await productsRes.json()
    : { data: [] };
  const { data: stats = {} } = statsRes.ok
    ? await statsRes.json()
    : { data: {} };
  const { data: trustedSellers = [] } = sellersRes.ok
    ? await sellersRes.json()
    : { data: [] };

  return (
    <main className="overflow-hidden">
      <HeroSection products={featuredProducts} />
      <FeaturedProducts products={featuredProducts} />
      <PopularCategories />
      <MarketplaceStats stats={stats} />
      <SuccessStories />
      <TrustedSellers sellers={trustedSellers} />
      <SustainabilityImpact />
    </main>
  );
}
