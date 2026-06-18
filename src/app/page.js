import ExploreCategories from "@/components/home/ExploreCategories";
import FeaturedDeals from "@/components/home/FeaturedDeals";
import HeroSection from "@/components/home/HeroSection";
import MarketplaceStats from "@/components/home/MarketplaceStats";
import SuccessStories from "@/components/home/SuccessStories";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import TrustedSellers from "@/components/home/TrustedSellers";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <HeroSection/>
    <ExploreCategories/>
    <FeaturedDeals/>
    <MarketplaceStats/>
    <SustainabilitySection/>
    <SuccessStories/>
    <TrustedSellers/>
    </>
  );
}
