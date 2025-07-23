import React, { useState, useEffect, useRef } from "react";

const BlogListingPage = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    tag: "",
    author: "",
    date: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const observerRef = useRef(null);

  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Jewelry Care: Preserving Your Precious Pieces",
      excerpt:
        "Learn professional techniques to keep your jewelry sparkling for generations. Our expert guide covers cleaning, storage, and maintenance tips for different metals and gemstones.",
      content: "Full blog content would go here...",
      featuredImage: "/images/blogs/jewellery-care-guide.png",
      category: "Care & Maintenance",
      tags: ["jewelry care", "maintenance", "cleaning", "storage"],
      author: {
        name: "Sarah Mitchell",
        avatar: "Sarah's Avatar",
        role: "Jewelry Expert",
      },
      publishDate: "2024-12-15",
      readTime: "8 min read",
      isFeatured: true,
      views: 1250,
    },
    {
      id: 2,
      title: "Traditional vs Modern: Bridging Generations in Jewelry Design",
      excerpt:
        "Explore how contemporary designers are reimagining classic techniques, creating pieces that honor heritage while embracing modern aesthetics.",
      content: "Full blog content would go here...",
      featuredImage: "/images/blogs/Traditional Modern Jewelry.png",
      category: "Design & Trends",
      tags: ["traditional", "modern", "design", "heritage"],
      author: {
        name: "Raj Patel",
        avatar: "Raj's Avatar",
        role: "Master Craftsman",
      },
      publishDate: "2024-12-12",
      readTime: "6 min read",
      isFeatured: false,
      views: 890,
    },
    {
      id: 3,
      title: "The Significance of Gemstones in Indian Culture",
      excerpt:
        "Discover the deep cultural meanings behind precious stones in Indian tradition, from protection to prosperity, and how they influence modern jewelry choices.",
      content: "Full blog content would go here...",
      featuredImage: "/images/blogs/Indian Gemstones Culture.png",
      category: "Culture & Heritage",
      tags: ["gemstones", "culture", "tradition", "meaning"],
      author: {
        name: "Dr. Priya Sharma",
        avatar: "Priya's Avatar",
        role: "Cultural Historian",
      },
      publishDate: "2024-12-10",
      readTime: "10 min read",
      isFeatured: false,
      views: 1450,
    },
    {
      id: 4,
      title: "2024 Bridal Jewelry Trends: What's In This Season",
      excerpt:
        "From statement necklaces to delicate earrings, discover the latest bridal jewelry trends that are defining weddings in 2024.",
      content: "Full blog content would go here...",
      featuredImage: "/images/blogs/Bridal Jewelry Trends 2024.png",
      category: "Design & Trends",
      tags: ["bridal", "trends", "2024", "wedding jewelry"],
      author: {
        name: "Emma Thompson",
        avatar: "Emma's Avatar",
        role: "Style Director",
      },
      publishDate: "2024-12-08",
      readTime: "7 min read",
      isFeatured: false,
      views: 2100,
    },
    {
      id: 5,
      title: "Investment Guide: Buying Jewelry That Holds Its Value",
      excerpt:
        "Smart strategies for purchasing jewelry as an investment. Learn about market trends, quality factors, and pieces that appreciate over time.",
      content: "Full blog content would go here...",
      featuredImage: "/images/blogs/Investment Jewelry Guide.png",
      category: "Investment & Value",
      tags: ["investment", "value", "buying guide", "market"],
      author: {
        name: "Michael Chen",
        avatar: "Michael's Avatar",
        role: "Investment Advisor",
      },
      publishDate: "2024-12-05",
      readTime: "12 min read",
      isFeatured: false,
      views: 980,
    },
    {
      id: 6,
      title: "Behind the Scenes: A Day in Our Jewelry Workshop",
      excerpt:
        "Take an exclusive look inside our artisan workshop, where master craftsmen bring intricate designs to life using time-honored techniques.",
      content: "Full blog content would go here...",
      featuredImage: "/images/blogs/Jewelry Workshop Behind Scenes.png",
      category: "Craftsmanship",
      tags: ["workshop", "artisan", "craftsmanship", "behind scenes"],
      author: {
        name: "James Wilson",
        avatar: "James's Avatar",
        role: "Workshop Manager",
      },
      publishDate: "2024-12-03",
      readTime: "9 min read",
      isFeatured: false,
      views: 1350,
    },
  ];

  const categories = [
    "Design & Trends",
    "Care & Maintenance",
    "Culture & Heritage",
    "Investment & Value",
    "Craftsmanship",
    "Bridal & Wedding",
    "Gift Guide",
  ];

  const popularTags = [
    "jewelry care",
    "traditional",
    "modern",
    "bridal",
    "investment",
    "gemstones",
    "gold",
    "craftsmanship",
    "trends",
    "heritage",
    "maintenance",
    "styling",
    "culture",
    "wedding",
    "buying guide",
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);
  const featuredPost = blogPosts.find((post) => post.isFeatured);
  const regularPosts = blogPosts.filter((post) => !post.isFeatured);

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
      tag: "",
      author: "",
      date: "",
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

        .blog-card {
          transition: all 0.3s ease;
          cursor: pointer;
          height: 100%;
        }

        .blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(159, 126, 84, 0.2);
        }

        .featured-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .featured-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(159, 126, 84, 0.2);
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

        .search-input {
          transition: all 0.2s ease;
        }

        .search-input:focus {
          border-color: #9f7e54;
          box-shadow: 0 0 0 3px rgba(159, 126, 84, 0.1);
        }

        .author-avatar {
          background: linear-gradient(45deg, #9f7e54, #b8956a);
        }

        .tag-cloud .tag-item {
          transition: all 0.2s ease;
        }

        .tag-cloud .tag-item:hover {
          background-color: rgba(159, 126, 84, 0.1);
          transform: scale(1.05);
        }
      `}</style>

      <div className="font-serif bg-white text-gray-900 min-h-screen">
        {/* Header */}
        <div className="py-16" style={{ backgroundColor: "#f8f6f3" }}>
          <div className="max-w-4xl mx-auto px-4 text-center slide-up">
            <h1
              className="text-5xl font-light mb-6"
              style={{ color: "#9f7e54" }}
            >
              Our Journal
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              Stories, insights, and inspiration from the world of fine jewelry
            </p>
            <p className="text-gray-600">
              Discover the artistry, heritage, and expertise behind every piece
              in our collection
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="glass-effect rounded-2xl p-6 mb-8 slide-up">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search articles, topics, or keywords..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none text-lg"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                  🔍
                </span>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-6 py-3 border border-gray-300 rounded-xl hover:border-gray-400 transition-colors flex items-center gap-2"
              >
                <span>🎛️</span>
                Filters
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div
              className={`w-80 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}
            >
              <div className="glass-effect rounded-2xl p-8 sticky top-24">
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

                {/* Categories */}
                <FilterSection title="📂 Categories">
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleFilterChange("category", category)}
                        className={`filter-chip block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                          selectedFilters.category === category ? "active" : ""
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Popular Tags */}
                <FilterSection title="🏷️ Popular Tags">
                  <div className="tag-cloud flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleFilterChange("tag", tag)}
                        className={`tag-item px-3 py-1.5 text-xs rounded-full border transition-all ${
                          selectedFilters.tag === tag
                            ? "bg-[#9f7e54] text-white border-[#9f7e54]"
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:border-[#9f7e54]"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Authors */}
                <FilterSection title="✍️ Authors">
                  <div className="space-y-2">
                    {[
                      ...new Set(blogPosts.map((post) => post.author.name)),
                    ].map((author) => (
                      <button
                        key={author}
                        onClick={() => handleFilterChange("author", author)}
                        className={`filter-chip block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                          selectedFilters.author === author ? "active" : ""
                        }`}
                      >
                        {author}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Archive */}
                <FilterSection title="📅 Archive">
                  <div className="space-y-2">
                    {[
                      "December 2024",
                      "November 2024",
                      "October 2024",
                      "September 2024",
                    ].map((month) => (
                      <button
                        key={month}
                        onClick={() => handleFilterChange("date", month)}
                        className={`filter-chip block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                          selectedFilters.date === month ? "active" : ""
                        }`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Popular Posts */}
                <FilterSection title="🔥 Popular Posts">
                  <div className="space-y-4">
                    {blogPosts
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 3)
                      .map((post) => (
                        <div key={post.id} className="text-sm">
                          <h4 className="font-semibold text-gray-800 line-clamp-2 mb-1 hover:text-[#9f7e54] cursor-pointer transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-gray-500 text-xs">
                            {post.views.toLocaleString()} views
                          </p>
                        </div>
                      ))}
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
                  {Math.min(currentPage * itemsPerPage, blogPosts.length)} of{" "}
                  {blogPosts.length} articles
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
                    <option value="latest">Latest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="trending">Trending</option>
                    <option value="title">Title A-Z</option>
                  </select>
                </div>
              </div>

              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-12 slide-up">
                  <div className="featured-card glass-effect rounded-2xl overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Featured Image */}
                      <div className="relative">
                        <div className="w-full h-80 lg:h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                         







                          <img
  src={featuredPost.featuredImage}
  alt={featuredPost.title}
  className="w-full h-80 lg:h-full object-cover"
/>





                        </div>
                        <div className="absolute top-6 left-6 px-4 py-2 bg-[#9f7e54] text-white rounded-full text-sm font-bold">
                          FEATURED
                        </div>
                      </div>

                      {/* Featured Content */}
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 bg-[#9f7e54] text-white rounded-full text-xs font-medium">
                            {featuredPost.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {featuredPost.readTime}
                          </span>
                        </div>

                        <h2 className="text-3xl font-light text-gray-800 mb-4 leading-tight">
                          {featuredPost.title}
                        </h2>

                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                          {featuredPost.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="author-avatar w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold">
                              {featuredPost.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">
                                {featuredPost.author.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatDate(featuredPost.publishDate)}
                              </p>
                            </div>
                          </div>

                          <button className="px-6 py-3 bg-[#9f7e54] text-white rounded-xl hover:opacity-90 transition-opacity font-semibold">
                            Read Article
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Blog Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
                {regularPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="blog-card glass-effect rounded-2xl overflow-hidden slide-up flex flex-col"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Post Image */}
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                       






                    
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    









                      </div>
                      <div
                        className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-medium"
                        style={{ color: "#9f7e54" }}
                      >
                        {post.category}
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 leading-tight">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Post Footer */}
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="author-avatar w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                              {post.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-800">
                                {post.author.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(post.publishDate)}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {post.readTime}
                          </span>
                        </div>

                        <button className="w-full px-4 py-3 bg-[#9f7e54] text-white rounded-xl hover:opacity-90 transition-opacity font-semibold">
                          Read More
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
              Never Miss Our Latest Stories
            </h2>
            <p className="text-gray-700 mb-8">
              Subscribe to our journal for expert insights, care tips, and
              exclusive behind-the-scenes content
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

export default BlogListingPage;
