import React, { useState, useEffect, useRef } from "react";

const ProductListingPage = () => {
  const observerRef = useRef(null);
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    collection: "",
    priceRange: "",
    goldPurity: "",
    gemstone: "",
    occasion: "",
    availability: "",
  });
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Sample product data (in real app, this would come from API)
  const products = [
    {
      id: 1,
      name: "Traditional Tilhari Necklace",
      price: 2850,
      originalPrice: null,
      image: "/images/Products/Chhetri Jewelry.png",
      category: "Necklaces",
      collection: "Traditional",
      goldPurity: "22K",
      weight: "45g",
      gemstones: ["Ruby", "Emerald"],
      occasion: "Wedding",
      availability: "In Stock",
      isNew: true,
    },
    {
      id: 2,
      name: "Temple Lotus Earrings",
      price: 1250,
      originalPrice: 1450,
      image: "/images/Products/temple-lotus.png",
      category: "Earrings",
      collection: "Temple-Inspired",
      goldPurity: "18K",
      weight: "12g",
      gemstones: ["Diamond"],
      occasion: "Festival",
      availability: "In Stock",
      isNew: false,
    },
    {
      id: 3,
      name: "Modern Geometric Ring",
      price: 850,
      originalPrice: null,
      image: "/images/Products/modern-gometric.png",
      category: "Rings",
      collection: "Modern",
      goldPurity: "14K",
      weight: "8g",
      gemstones: [],
      occasion: "Daily Wear",
      availability: "In Stock",
      isNew: true,
    },
    {
      id: 4,
      name: "Fusion Mandala Bracelet",
      price: 1850,
      originalPrice: null,
      image: "/images/Products/Fusion Mandala Bracelet.jpg",
      category: "Bracelets",
      collection: "Fusion",
      goldPurity: "18K",
      weight: "28g",
      gemstones: ["Sapphire"],
      occasion: "Special Events",
      availability: "Limited Stock",
      isNew: false,
    },
    {
      id: 5,
      name: "Heritage Mangalsutra",
      price: 3200,
      originalPrice: null,
      image: "/images/Products/mangalsutra.png",
      category: "Necklaces",
      collection: "Traditional",
      goldPurity: "22K",
      weight: "52g",
      gemstones: ["Black Beads"],
      occasion: "Wedding",
      availability: "In Stock",
      isNew: false,
    },
    {
      id: 6,
      name: "Contemporary Pendant Set",
      price: 1650,
      originalPrice: 1850,
      image: "/images/Products/Contemporary Pendant Set.jpg",
      category: "Sets",
      collection: "Modern",
      goldPurity: "18K",
      weight: "22g",
      gemstones: ["Diamond", "Pearl"],
      occasion: "Daily Wear",
      availability: "In Stock",
      isNew: true,
    },
  ];

  const itemsPerPage = 12;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".slide-up");
    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? "" : value,
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      category: "",
      collection: "",
      priceRange: "",
      goldPurity: "",
      gemstone: "",
      occasion: "",
      availability: "",
    });
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const FilterSection = ({ title, children }) => (
    <div className="mb-8 pb-6 border-b border-gray-100 last:border-b-0">
      <h3 className="font-semibold mb-4 text-gray-800 text-base">{title}</h3>
      {children}
    </div>
  );

  return (
    <>
      <style jsx>{`
        .slide-up {
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(159, 126, 84, 0.15);
          box-shadow: 0 8px 32px rgba(159, 126, 84, 0.1);
        }

        .product-card {
          transition: all 0.3s ease;
          cursor: pointer;
          height: 100%;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(159, 126, 84, 0.2);
        }

        .filter-chip {
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .filter-chip:hover {
          background-color: rgba(159, 126, 84, 0.08);
          border-color: rgba(159, 126, 84, 0.2);
        }

        .filter-chip.active {
          background-color: #9f7e54;
          color: white;
          border-color: #9f7e54;
          box-shadow: 0 2px 8px rgba(159, 126, 84, 0.3);
        }

        .price-gradient {
          background: linear-gradient(45deg, #9f7e54, #b8956a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .filter-sidebar {
          max-height: calc(100vh - 120px);
          overflow-y: auto;
        }

        .filter-sidebar::-webkit-scrollbar {
          width: 4px;
        }

        .filter-sidebar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }

        .filter-sidebar::-webkit-scrollbar-thumb {
          background: #9f7e54;
          border-radius: 2px;
        }
      `}</style>

      <div className="font-serif bg-white text-gray-900 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1
                  className="text-3xl font-light"
                  style={{ color: "#9f7e54" }}
                >
                  Our Collection
                </h1>
                <p className="text-gray-600 mt-1">
                  Discover timeless elegance in every piece
                </p>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center gap-2"
              >
                <span>🔍</span>
                Filters & Sort
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div
              className={`w-80 flex-shrink-0 ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              <div className="glass-effect rounded-2xl p-8 sticky top-24 filter-sidebar">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎛️</span>
                    <h2
                      className="text-xl font-semibold"
                      style={{ color: "#9f7e54" }}
                    >
                      Filters
                    </h2>
                  </div>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-gray-500 hover:text-gray-700 underline font-medium"
                  >
                    Clear All
                  </button>
                </div>

                {/* Category Filter */}
                <FilterSection title="📂 Category">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Necklaces",
                      "Earrings",
                      "Rings",
                      "Bracelets",
                      "Sets",
                      "Pendants",
                    ].map((category) => (
                      <button
                        key={category}
                        onClick={() => handleFilterChange("category", category)}
                        className={`filter-chip text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                          selectedFilters.category === category ? "active" : ""
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Collection Filter */}
                <FilterSection title="✨ Collection">
                  <div className="space-y-2">
                    {["Traditional", "Modern", "Temple-Inspired", "Fusion"].map(
                      (collection) => (
                        <button
                          key={collection}
                          onClick={() =>
                            handleFilterChange("collection", collection)
                          }
                          className={`filter-chip block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                            selectedFilters.collection === collection
                              ? "active"
                              : ""
                          }`}
                        >
                          {collection}
                        </button>
                      ),
                    )}
                  </div>
                </FilterSection>

                {/* Price Range Filter */}
                <FilterSection title="💰 Price Range">
                  <div className="space-y-2">
                    {[
                      { label: "Under £500", value: "0-500" },
                      { label: "£500 - £1,000", value: "500-1000" },
                      { label: "£1,000 - £2,000", value: "1000-2000" },
                      { label: "£2,000 - £3,000", value: "2000-3000" },
                      { label: "Above £3,000", value: "3000+" },
                    ].map((range) => (
                      <button
                        key={range.value}
                        onClick={() =>
                          handleFilterChange("priceRange", range.value)
                        }
                        className={`filter-chip block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                          selectedFilters.priceRange === range.value
                            ? "active"
                            : ""
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Gold Purity Filter */}
                <FilterSection title="🏆 Gold Purity">
                  <div className="grid grid-cols-2 gap-2">
                    {["14K", "18K", "22K", "24K"].map((purity) => (
                      <button
                        key={purity}
                        onClick={() => handleFilterChange("goldPurity", purity)}
                        className={`filter-chip text-center px-3 py-2.5 rounded-lg text-sm font-medium ${
                          selectedFilters.goldPurity === purity ? "active" : ""
                        }`}
                      >
                        {purity}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Gemstone Filter */}
                <FilterSection title="💎 Gemstones">
                  <div className="space-y-2">
                    {[
                      "Diamond",
                      "Ruby",
                      "Emerald",
                      "Sapphire",
                      "Pearl",
                      "No Gemstones",
                    ].map((stone) => (
                      <button
                        key={stone}
                        onClick={() => handleFilterChange("gemstone", stone)}
                        className={`filter-chip block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                          selectedFilters.gemstone === stone ? "active" : ""
                        }`}
                      >
                        {stone}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Occasion Filter */}
                <FilterSection title="🎉 Occasion">
                  <div className="space-y-2">
                    {[
                      "Wedding",
                      "Festival",
                      "Daily Wear",
                      "Special Events",
                      "Religious",
                    ].map((occasion) => (
                      <button
                        key={occasion}
                        onClick={() => handleFilterChange("occasion", occasion)}
                        className={`filter-chip block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                          selectedFilters.occasion === occasion ? "active" : ""
                        }`}
                      >
                        {occasion}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Availability Filter */}
                <FilterSection title="📦 Availability">
                  <div className="space-y-2">
                    {["In Stock", "Limited Stock", "Pre-Order"].map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() =>
                            handleFilterChange("availability", status)
                          }
                          className={`filter-chip block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                            selectedFilters.availability === status
                              ? "active"
                              : ""
                          }`}
                        >
                          {status}
                        </button>
                      ),
                    )}
                  </div>
                </FilterSection>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort & Results Info */}
              <div className="flex items-center justify-between mb-8 slide-up">
                <div className="text-gray-600 font-medium">
                  Showing {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, products.length)} of{" "}
                  {products.length} products
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-sm text-gray-600 font-medium">
                    Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-white font-medium"
                    style={{ "--tw-ring-color": "#9f7e54" }}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="product-card glass-effect rounded-2xl overflow-hidden slide-up flex flex-col"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Product Image */}
                    <div className="relative">
                      <div className="w-full h-80 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                       







                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                            







                      </div>
                      {product.isNew && (
                        <div
                          className="absolute top-4 left-4 px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg"
                          style={{ backgroundColor: "#9f7e54" }}
                        >
                          NEW
                        </div>
                      )}
                      {product.availability === "Limited Stock" && (
                        <div className="absolute top-4 right-4 px-3 py-1 text-xs font-bold bg-red-600 text-white rounded-full shadow-lg">
                          LIMITED
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                        <div className="flex gap-3">
                          <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                            <span className="text-lg">👁</span>
                          </button>
                          <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                            <span className="text-lg">♡</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Product Info - Flex grow to push button to bottom */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Product Header */}
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="text-xs px-3 py-1 rounded-full text-white font-medium"
                            style={{ backgroundColor: "#9f7e54" }}
                          >
                            {product.collection}
                          </span>
                          <span className="text-xs text-gray-500 font-medium">
                            {product.goldPurity} • {product.weight}
                          </span>
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold price-gradient">
                          £{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">
                            £{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Gemstones Section - Fixed height container */}
                      <div className="mb-6 min-h-[60px] flex flex-col justify-start">
                        {product.gemstones.length > 0 ? (
                          <>
                            <p className="text-sm text-gray-600 mb-2 font-medium">
                              Gemstones:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {product.gemstones.map((stone) => (
                                <span
                                  key={stone}
                                  className="text-xs px-2.5 py-1 bg-gray-100 rounded-full font-medium"
                                >
                                  {stone}
                                </span>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="text-sm text-gray-400 italic">
                            No gemstones
                          </div>
                        )}
                      </div>

                      {/* Bottom section - pushed to bottom with mt-auto */}
                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`text-sm font-semibold px-2 py-1 rounded-full ${
                              product.availability === "In Stock"
                                ? "text-green-700 bg-green-100"
                                : product.availability === "Limited Stock"
                                  ? "text-orange-700 bg-orange-100"
                                  : "text-blue-700 bg-blue-100"
                            }`}
                          >
                            {product.availability}
                          </span>
                        </div>

                        <button
                          className="w-full px-4 py-3 text-white rounded-xl hover:opacity-90 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl"
                          style={{ backgroundColor: "#9f7e54" }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center space-x-2 slide-up">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-6 py-3 border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400 transition-colors font-medium"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-3 rounded-xl transition-colors font-medium min-w-[50px] ${
                        currentPage === page
                          ? "text-white shadow-lg"
                          : "border border-gray-300 hover:border-gray-400"
                      }`}
                      style={{
                        backgroundColor:
                          currentPage === page ? "#9f7e54" : "transparent",
                      }}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400 transition-colors font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <section className="py-16 mt-16" style={{ backgroundColor: "#f8f6f3" }}>
          <div className="max-w-4xl mx-auto px-4 text-center slide-up">
            <h2
              className="text-3xl font-light mb-4"
              style={{ color: "#9f7e54" }}
            >
              Stay Updated with Our Latest Collections
            </h2>
            <p className="text-gray-700 mb-8">
              Be the first to know about new arrivals, exclusive pieces, and
              special offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ "--tw-ring-color": "#9f7e54" }}
              />
              <button
                className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                style={{ backgroundColor: "#9f7e54" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductListingPage;
