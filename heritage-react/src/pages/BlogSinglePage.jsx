import React, { useState, useEffect, useRef } from "react";

const BlogSinglePage = () => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    message: "",
  });
  const observerRef = useRef(null);
  const contentRef = useRef(null);

  // Sample blog post data
  const blogPost = {
    id: 1,
    title: "The Art of Jewelry Care: Preserving Your Precious Pieces",
    slug: "jewelry-care-preserving-precious-pieces",
    excerpt:
      "Learn professional techniques to keep your jewelry sparkling for generations. Our expert guide covers cleaning, storage, and maintenance tips for different metals and gemstones.",
    featuredImage: "Jewelry Care Professional Guide",
    category: "Care & Maintenance",
    tags: [
      "jewelry care",
      "maintenance",
      "cleaning",
      "storage",
      "gemstones",
      "gold care",
    ],
    author: {
      name: "Sarah Mitchell",
      avatar: "Sarah's Professional Avatar",
      role: "Senior Jewelry Expert & Gemologist",
      bio: "With over 15 years of experience in fine jewelry, Sarah has worked with prestigious jewelry houses across Europe. She holds certifications from GIA and specializes in antique jewelry restoration and gemstone identification.",
      social: {
        twitter: "@sarahjewelryexp",
        linkedin: "sarah-mitchell-jewelry",
        instagram: "@sarahmitchell_gems",
      },
    },
    publishDate: "2024-12-15",
    lastUpdated: "2024-12-16",
    readTime: "8 min read",
    views: 1250,
    shares: 89,
    content: {
      sections: [
        {
          id: "introduction",
          title: "Introduction",
          content:
            "Your precious jewelry represents more than monetary value—it carries memories, traditions, and artistry that deserve to be preserved for generations. Proper care ensures that your treasured pieces maintain their beauty, structural integrity, and sentimental value throughout the years.",
        },
        {
          id: "daily-care",
          title: "Daily Care Essentials",
          content:
            "The foundation of jewelry maintenance lies in daily habits that prevent damage before it occurs. Always remove jewelry before applying lotions, perfumes, or cosmetics, as chemicals can cause discoloration and weaken precious metals over time.",
        },
        {
          id: "cleaning-techniques",
          title: "Professional Cleaning Techniques",
          content:
            "Different materials require specific cleaning approaches. Gold jewelry benefits from gentle soap solutions and soft brushing, while diamonds can handle more robust cleaning methods. However, pearls and opals require the most delicate touch, using only damp cloths for cleaning.",
        },
        {
          id: "storage-solutions",
          title: "Proper Storage Solutions",
          content:
            "Storage is crucial for maintaining your jewelry's condition. Each piece should be stored separately to prevent scratching, preferably in soft pouches or lined compartments. Humidity control is essential—consider using silica gel packets in your jewelry box.",
        },
        {
          id: "professional-maintenance",
          title: "When to Seek Professional Help",
          content:
            "While daily care can be handled at home, certain situations require professional intervention. Annual professional cleaning, prong inspection, and clasp maintenance ensure your jewelry remains secure and beautiful.",
        },
      ],
    },
  };

  // Related articles
  const relatedArticles = [
    {
      id: 2,
      title: "Understanding Gold Purity: 14K vs 18K vs 22K",
      excerpt:
        "Discover the differences between gold purities and how they affect durability, color, and value.",
      featuredImage: "/images/blogs/Gold Purity Comparison.png",
      category: "Education",
      readTime: "6 min read",
      publishDate: "2024-12-12",
    },
    {
      id: 3,
      title: "Gemstone Guide: Caring for Different Precious Stones",
      excerpt:
        "Each gemstone has unique properties that require specific care approaches.",
      featuredImage: "/images/blogs/Indian Gemstones Culture.png",
      category: "Care & Maintenance",
      readTime: "10 min read",
      publishDate: "2024-12-10",
    },
    {
      id: 4,
      title: "Insurance and Appraisal: Protecting Your Investment",
      excerpt:
        "Essential guide to properly insuring and appraising your jewelry collection.",
      featuredImage: "/images/blogs/Jewelry Insurance Guide.png",
      category: "Investment & Value",
      readTime: "7 min read",
      publishDate: "2024-12-08",
    },
  ];

  // Sample comments
  const sampleComments = [
    {
      id: 1,
      name: "Emma Johnson",
      date: "2024-12-16",
      message:
        "This article was incredibly helpful! I had no idea I was storing my pearls incorrectly. Thank you for the detailed guidance.",
      replies: [
        {
          id: 2,
          name: "Sarah Mitchell",
          date: "2024-12-16",
          message:
            "I'm so glad you found it helpful, Emma! Proper pearl care can really extend their lifespan significantly.",
          isAuthor: true,
        },
      ],
    },
    {
      id: 3,
      name: "David Chen",
      date: "2024-12-15",
      message:
        "Great tips on cleaning gold jewelry. I've been using the wrong approach for years. Will definitely implement these techniques.",
      replies: [],
    },
  ];

  useEffect(() => {
    // Reading progress tracking
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollTop = window.scrollY;
        const docHeight = contentRef.current.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        setReadingProgress(Math.min(100, Math.max(0, scrollPercent)));
      }
    };

    // Intersection Observer for sections
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -50% 0px",
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll(".content-section");
    sections.forEach((section) => {
      observerRef.current.observe(section);
    });

    window.addEventListener("scroll", handleScroll);
    setComments(sampleComments);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blogPost.title;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
          "_blank",
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          "_blank",
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
          "_blank",
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
        break;
    }
    setShowShareMenu(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = {
      id: Date.now(),
      name: newComment.name,
      date: new Date().toISOString().split("T")[0],
      message: newComment.message,
      replies: [],
    };
    setComments([...comments, comment]);
    setNewComment({ name: "", email: "", message: "" });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <style jsx>{`
        .reading-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, #9f7e54, #b8956a);
          z-index: 1000;
          transition: width 0.3s ease;
        }

        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(159, 126, 84, 0.15);
          box-shadow: 0 8px 32px rgba(159, 126, 84, 0.1);
        }

        .toc-link {
          transition: all 0.2s ease;
        }

        .toc-link.active {
          color: #9f7e54;
          font-weight: 600;
          border-left: 3px solid #9f7e54;
          background-color: rgba(159, 126, 84, 0.05);
        }

        .toc-link:hover {
          color: #9f7e54;
          background-color: rgba(159, 126, 84, 0.05);
        }

        .share-btn {
          transition: all 0.2s ease;
        }

        .share-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .content-section {
          scroll-margin-top: 100px;
        }

        .article-content {
          font-size: 1.125rem;
          line-height: 1.75;
          color: #374151;
        }

        .article-content h2 {
          font-size: 1.875rem;
          font-weight: 600;
          color: #9f7e54;
          margin: 2rem 0 1rem 0;
        }

        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
          margin: 1.5rem 0 0.75rem 0;
        }

        .article-content p {
          margin-bottom: 1.5rem;
        }

        .article-content strong {
          font-weight: 600;
          color: #1f2937;
        }

        .author-avatar {
          background: linear-gradient(45deg, #9f7e54, #b8956a);
        }

        .comment-avatar {
          background: linear-gradient(45deg, #6b7280, #9ca3af);
        }

        .related-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .related-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(159, 126, 84, 0.15);
        }

        .sticky-toc {
          position: sticky;
          top: 120px;
          max-height: calc(100vh - 140px);
          overflow-y: auto;
        }
      `}</style>

      <div
        className="font-serif bg-white text-gray-900 min-h-screen"
        ref={contentRef}
      >
        {/* Reading Progress Bar */}
        <div
          className="reading-progress"
          style={{ width: `${readingProgress}%` }}
        ></div>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4 border-b border-gray-100">
          <nav className="text-sm text-gray-600">
            <span className="hover:text-gray-800 cursor-pointer">Home</span>
            <span className="mx-2">•</span>
            <span className="hover:text-gray-800 cursor-pointer">Blog</span>
            <span className="mx-2">•</span>
            <span className="hover:text-gray-800 cursor-pointer">
              {blogPost.category}
            </span>
            <span className="mx-2">•</span>
            <span style={{ color: "#9f7e54" }}>{blogPost.title}</span>
          </nav>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span
                className="px-4 py-2 text-white rounded-full text-sm font-semibold"
                style={{ backgroundColor: "#9f7e54" }}
              >
                {blogPost.category}
              </span>
              <span className="text-gray-500">{blogPost.readTime}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">
                {blogPost.views.toLocaleString()} views
              </span>
            </div>

            <h1
              className="text-5xl font-light mb-6 leading-tight"
              style={{ color: "#9f7e54" }}
            >
              {blogPost.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {blogPost.excerpt}
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="author-avatar w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {blogPost.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {blogPost.author.name}
                </h3>
                <p className="text-gray-600">{blogPost.author.role}</p>
                <p className="text-sm text-gray-500">
                  Published {formatDate(blogPost.publishDate)}
                  {blogPost.lastUpdated && (
                    <span> • Updated {formatDate(blogPost.lastUpdated)}</span>
                  )}
                </p>
              </div>
            </div>

            {/* Social Share & Actions */}
            <div className="flex items-center justify-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="share-btn px-6 py-3 bg-[#9f7e54] text-white rounded-lg font-semibold flex items-center gap-2"
                >
                  <span>🔗</span>
                  Share Article
                </button>

                {showShareMenu && (
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 glass-effect rounded-lg p-4 z-10 w-48">
                    <div className="space-y-2">
                      <button
                        onClick={() => handleShare("twitter")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded flex items-center gap-3"
                      >
                        <span>🐦</span>Twitter
                      </button>
                      <button
                        onClick={() => handleShare("facebook")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded flex items-center gap-3"
                      >
                        <span>📘</span>Facebook
                      </button>
                      <button
                        onClick={() => handleShare("linkedin")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded flex items-center gap-3"
                      >
                        <span>💼</span>LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare("copy")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded flex items-center gap-3"
                      >
                        <span>📋</span>Copy Link
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`share-btn px-6 py-3 border-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                  isBookmarked
                    ? "border-[#9f7e54] bg-[#9f7e54] text-white"
                    : "border-[#9f7e54] text-[#9f7e54] hover:bg-[#9f7e54] hover:text-white"
                }`}
              >
                <span>{isBookmarked ? "🔖" : "📑"}</span>
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="glass-effect rounded-2xl overflow-hidden mb-12">
            <div className="w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              
              
              <img
  src="/images/blogs/jewellery-care-guide.png"
  alt={blogPost.title}
  className="w-full h-96 object-cover"
/>


            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="flex gap-12">
            {/* Table of Contents - Sidebar */}
            <div className="w-80 flex-shrink-0 hidden lg:block">
              <div className="sticky-toc">
                <div className="glass-effect rounded-2xl p-6">
                  <h3 className="font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <span>📚</span>
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {blogPost.content.sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={`toc-link block px-4 py-2 text-sm rounded-lg transition-colors ${
                          activeSection === section.id
                            ? "active"
                            : "text-gray-600"
                        }`}
                      >
                        {section.title}
                      </a>
                    ))}
                  </nav>

                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h4 className="font-semibold mb-3 text-gray-800">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {blogPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-[#9f7e54] hover:text-white cursor-pointer transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="glass-effect rounded-2xl p-8 mb-12">
                <article className="article-content">
                  {blogPost.content.sections.map((section) => (
                    <div
                      key={section.id}
                      id={section.id}
                      className="content-section mb-8"
                    >
                      <h2>{section.title}</h2>
                      <p>{section.content}</p>

                      {/* Add sample image for some sections */}
                      {section.id === "cleaning-techniques" && (
                        <div className="my-8 glass-effect rounded-xl overflow-hidden">
                          <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                          
                            {/* <span className="text-gray-400">
                              Professional Cleaning Demonstration
                            </span> */}
                                     
                                          <img
                        src="/images/blogs/Professional Cleaning Demonstration.png"
                        alt="Professional Cleaning Demonstration"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />

                          </div>
                          <div className="p-4 bg-gray-50">
                            <p className="text-sm text-gray-600 italic">
                              Professional cleaning techniques vary by material
                              type and require specific tools and solutions.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Call to Action */}
                  <div className="mt-12 p-8 bg-gradient-to-r from-[#f8f6f3] to-[#f5f3f0] rounded-xl border-l-4 border-[#9f7e54]">
                    <h3
                      className="text-2xl font-semibold mb-4"
                      style={{ color: "#9f7e54" }}
                    >
                      Need Professional Care for Your Jewelry?
                    </h3>
                    <p className="text-gray-700 mb-6">
                      Our expert team offers comprehensive jewelry cleaning,
                      maintenance, and restoration services. Trust your precious
                      pieces to certified professionals who understand the
                      unique needs of fine jewelry.
                    </p>
                    <button className="px-8 py-3 bg-[#9f7e54] text-white rounded-lg hover:opacity-90 transition-opacity font-semibold">
                      Schedule a Consultation
                    </button>
                  </div>
                </article>
              </div>

              {/* Author Bio */}
              <div className="glass-effect rounded-2xl p-8 mb-12">
                <div className="flex items-start gap-6">
                  <div className="author-avatar w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                    {blogPost.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-grow">
                    <h3
                      className="text-2xl font-semibold mb-2"
                      style={{ color: "#9f7e54" }}
                    >
                      About {blogPost.author.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {blogPost.author.bio}
                    </p>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        🐦 Twitter
                      </a>
                      <a
                        href="#"
                        className="text-blue-700 hover:text-blue-800 transition-colors"
                      >
                        💼 LinkedIn
                      </a>
                      <a
                        href="#"
                        className="text-pink-500 hover:text-pink-600 transition-colors"
                      >
                        📷 Instagram
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="glass-effect rounded-2xl p-8 mb-12">
                <h3
                  className="text-2xl font-semibold mb-8"
                  style={{ color: "#9f7e54" }}
                >
                  Comments ({comments.length})
                </h3>

                {/* Comment Form */}
                <form
                  onSubmit={handleCommentSubmit}
                  className="mb-8 p-6 bg-gray-50 rounded-xl"
                >
                  <h4 className="font-semibold mb-4">Leave a Comment</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={newComment.name}
                      onChange={(e) =>
                        setNewComment({ ...newComment, name: e.target.value })
                      }
                      required
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f7e54] focus:ring-opacity-50"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={newComment.email}
                      onChange={(e) =>
                        setNewComment({ ...newComment, email: e.target.value })
                      }
                      required
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f7e54] focus:ring-opacity-50"
                    />
                  </div>
                  <textarea
                    placeholder="Your comment..."
                    value={newComment.message}
                    onChange={(e) =>
                      setNewComment({ ...newComment, message: e.target.value })
                    }
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f7e54] focus:ring-opacity-50 mb-4"
                  ></textarea>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#9f7e54] text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
                  >
                    Post Comment
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="border-b border-gray-100 pb-6 last:border-b-0"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`comment-avatar w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${comment.isAuthor ? "author-avatar" : ""}`}
                        >
                          {comment.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-800">
                              {comment.name}
                            </h4>
                            {comment.isAuthor && (
                              <span className="px-2 py-1 bg-[#9f7e54] text-white text-xs rounded-full">
                                Author
                              </span>
                            )}
                            <span className="text-sm text-gray-500">
                              {formatDate(comment.date)}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {comment.message}
                          </p>

                          {/* Replies */}
                          {comment.replies.length > 0 && (
                            <div className="mt-4 ml-8 space-y-4">
                              {comment.replies.map((reply) => (
                                <div
                                  key={reply.id}
                                  className="flex items-start gap-3"
                                >
                                  <div
                                    className={`comment-avatar w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${reply.isAuthor ? "author-avatar" : ""}`}
                                  >
                                    {reply.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <h5 className="font-semibold text-gray-800 text-sm">
                                        {reply.name}
                                      </h5>
                                      {reply.isAuthor && (
                                        <span className="px-2 py-1 bg-[#9f7e54] text-white text-xs rounded-full">
                                          Author
                                        </span>
                                      )}
                                      <span className="text-xs text-gray-500">
                                        {formatDate(reply.date)}
                                      </span>
                                    </div>
                                    <p className="text-gray-700 text-sm">
                                      {reply.message}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-light mb-4"
              style={{ color: "#9f7e54" }}
            >
              Related Articles
            </h2>
            <p className="text-gray-600">
              Continue exploring our jewelry expertise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedArticles.map((article) => (
              <div
                key={article.id}
                className="related-card glass-effect rounded-2xl overflow-hidden"
              >
                <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              
              
<img
  src={article.featuredImage}
  alt={article.title}
  className="w-full h-48 object-cover"
/>







                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-[#9f7e54] text-white text-xs rounded-full font-medium">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {formatDate(article.publishDate)}
                    </span>
                    <button className="px-4 py-2 bg-[#9f7e54] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <section className="py-16" style={{ backgroundColor: "#f8f6f3" }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2
              className="text-3xl font-light mb-4"
              style={{ color: "#9f7e54" }}
            >
              Get Expert Jewelry Tips
            </h2>
            <p className="text-gray-700 mb-8">
              Subscribe to receive exclusive care guides, style tips, and
              insider knowledge from our jewelry experts
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

export default BlogSinglePage;
