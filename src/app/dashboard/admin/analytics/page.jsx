import AdminAnalyticsClient from "@/components/dashboard/admin/AdminAnalyticsClient";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function AdminAnalyticsPage() {
  let statsData = {
    revenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    activeListings: 0,
    categoryDistribution: [],
    recentActivities: []
  };

  try {
    const res = await fetch(`${API_URL}/api/admin/stats/summary`, {
      cache: "no-store", // Keep analytics completely fresh
    });
    
    if (res.ok) {
      const body = await res.json();
      statsData = body.data;
    }
  } catch (err) {
    console.error("Failed to load dashboard analytics:", err);
  }

  return <AdminAnalyticsClient initialStats={statsData} />;
}