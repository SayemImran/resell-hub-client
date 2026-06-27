"use client";

import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "@/components/products/ProductCard";
import Loading from "../loading";

const ITEMS_PER_PAGE = 8; // Adjust this number to change how many items show per page

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data.data || []);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate total pages dynamically based on data length
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  // Slice the items safely for the current page slice view
  const displayedProducts = useMemo(() => {
    const startOffset = (currentPage - 1) * ITEMS_PER_PAGE;
    const endOffset = startOffset + ITEMS_PER_PAGE;
    return products.slice(startOffset, endOffset);
  }, [products, currentPage]);

  // Reset page safely if it happens to fall out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [products, totalPages, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Smoothly scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">
            Error loading products
          </p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">All Products</h1>
            <p className="text-slate-500">
              Browse our collection of {products.length} products
            </p>
          </div>
          {products.length > 0 && (
            <span className="text-sm font-medium text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
              Showing Page {currentPage} of {totalPages || 1}
            </span>
          )}
        </div>

        {/* Products Grid */}
        {displayedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination Controls Section */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2 border-t border-slate-100 pt-6">
                {/* Previous Button */}
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 bg-white transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Prev
                </button>

                {/* Page Number Sequence */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`h-9 w-9 rounded-xl text-sm font-semibold transition flex items-center justify-center ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white shadow-sm shadow-blue-100"
                            : "border border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 bg-white transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;