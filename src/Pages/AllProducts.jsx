import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxios";
import SkeletonLoader from "../Component/SkeletonLoader";
import ProductCard from "../Component/ProductCard";

const ITEMS_PER_PAGE = 16;

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCategory, setSearchCategory] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const {
    data: response = {},
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["tuitions", currentPage, searchCategory, sortBy],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuitions-pagination", {
        params: {
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          status: "Approved",
          category: searchCategory || undefined,
          sort: sortBy,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const tuitions = response?.tuitions || [];
  const totalTuitions = response.totalTuitions || 0;
  const totalPages = response.totalPages || 1;
  const loading = isLoading || isFetching;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="py-14 px-4">
      <title>MK Sports | All Products</title>

      {/* Header */}
      <div className="mb-12">
        <p className="text-[#C8102E] text-[11px] font-semibold tracking-[0.25em] uppercase mb-3">
          Collection
        </p>
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          All Products
        </h1>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-12 pb-8 border-b border-gray-100">
        <input
          type="text"
          placeholder="Search by category..."
          className="flex-1 px-5 py-3 bg-gray-50 border border-gray-100 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300 transition-colors"
          value={searchCategory}
          onChange={(e) => {
            setSearchCategory(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="px-5 py-3 bg-gray-50 border border-gray-100 text-sm text-gray-700 focus:outline-none focus:border-gray-300 transition-colors w-full sm:w-52"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="date">Newest First</option>
          <option value="budget-high">Price: High to Low</option>
          <option value="budget-low">Price: Low to High</option>
        </select>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
        </div>
      ) : tuitions.length === 0 ? (
        <div className="text-center py-32">
          <div className="text-6xl mb-4 opacity-30"></div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-sm text-gray-400">
            Try different keywords or clear the search
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {tuitions.map((tuition) => (
              <ProductCard key={tuition._id} tuition={tuition} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-1.5 pt-8 border-t border-gray-100">
              <button
                className="px-5 py-2.5 text-[11px] font-semibold tracking-[0.05em] uppercase border border-gray-200 hover:border-black hover:text-black text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(
                  Math.max(0, currentPage - 3),
                  Math.min(totalPages, currentPage + 2),
                )
                .map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 text-[12px] font-semibold transition-all ${
                      currentPage === page
                        ? "bg-black text-white"
                        : "border border-gray-200 text-gray-500 hover:border-black hover:text-black"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}

              <button
                className="px-5 py-2.5 text-[11px] font-semibold tracking-[0.05em] uppercase border border-gray-200 hover:border-black hover:text-black text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}

          <div className="text-center mt-8 text-[11px] text-gray-400 tracking-wider uppercase">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, totalTuitions)} of{" "}
            {totalTuitions} products
          </div>
        </>
      )}
    </div>
  );
};

export default AllProducts;
