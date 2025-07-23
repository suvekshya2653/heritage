import React, { useState, useEffect, useRef } from "react";

const ProductSinglePage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const observerRef = useRef(null);

  // Sample product data
  const product = {
    id: 1,
    name: "Traditional Tilhari Necklace",
    price: 2850,
    originalPrice: 3200,
    collection: "Heritage Collection",
    category: "Necklaces",
    goldPurity: "22K",
    weight: "45g",
    gemstones: ["Ruby", "Emerald", "Pearl"],
    occasion: "Wedding",
    availability: "In Stock",
    isNew: true,
    sku: "TN-2024-001",
    images: [
      // "Traditional Tilhari Main View",
      // "Traditional Tilhari Side View",
      // "Traditional Tilhari Detail View",
      // "Traditional Tilhari Back View",

      "/images/Products/Chhetri Jewelry (2).png",
      "/images/Products/Chhetri Jewelry (2).png",
      "/images/Products/Chhetri Jewelry (2).png",
      "/images/Products/Chhetri Jewelry (2).png",
    ],
    story: `Crafted with centuries-old techniques passed down through generations, this exquisite Tilhari necklace represents the pinnacle of traditional Indian jewelry artistry. Each intricate detail tells a story of royal heritage, with hand-selected rubies and emeralds that catch the light like captured starlight.

The design draws inspiration from ancient temple architecture, where every curve and embellishment serves both aesthetic and spiritual purposes. Our master craftsmen have spent over 120 hours creating this masterpiece, ensuring that every gold wire is perfectly placed and every gemstone is set with precision that honors our ancestors' legacy.

This isn't just jewelry—it's a piece of living history, designed to be treasured for generations and passed down as a family heirloom that grows more beautiful with time.`,
    specifications: {
      "Gold Purity": "22K (91.6% pure gold)",
      "Total Weight": "45 grams",
      "Chain Length": "16-18 inches (adjustable)",
      "Pendant Dimensions": "3.2 x 2.8 inches",
      Gemstones: "Natural Ruby (2ct), Emerald (1.5ct), Pearl (6mm)",
      Closure: "Traditional hook with safety chain",
      "Craft Technique": "Hand-forged and engraved",
    },
    care: [
      "Store in a soft cloth pouch to prevent scratches",
      "Clean gently with a soft brush and mild soap solution",
      "Avoid exposure to perfumes, lotions, and harsh chemicals",
      "Remove before swimming, exercising, or sleeping",
      "Professional cleaning recommended every 6 months",
    ],
    sizes: ["Standard", "Custom Fit Available"],
  };

  // Similar products
  const similarProducts = [
    {
      id: 2,
      name: "Heritage Mangalsutra",
      price: 3200,
      image: "/images/Products/mangalsutra.png",
      collection: "Traditional",
    },
    {
      id: 3,
      name: "Temple Lotus Earrings",
      price: 1250,
      originalPrice: 1450,
      image: "/2.png",
      collection: "Temple-Inspired",
    },
    {
      id: 4,
      name: "Contemporary Pendant Set",
      price: 1650,
      image: "/images/Products/Contemporary Pendant Set.jpg",
      collection: "Modern",
    },
    {
      id: 5,
      name: "Royal Choker Necklace",
      price: 4200,
      image: "/images/Products/royal necklace.png",
      collection: "Heritage",
    },
  ];

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

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    // Add to cart logic
    console.log("Added to cart:", { product, quantity, selectedSize });
  };

  const handleBuyNow = () => {
    // Buy now logic
    console.log("Buy now:", { product, quantity, selectedSize });
  };

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

        .product-image {
          transition: all 0.3s ease;
          cursor: zoom-in;
        }

        .product-image:hover {
          transform: scale(1.05);
        }

        .thumbnail {
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .thumbnail:hover {
          transform: scale(1.1);
        }

        .thumbnail.active {
          border-color: #9f7e54;
          box-shadow: 0 0 0 2px rgba(159, 126, 84, 0.3);
        }

        .price-gradient {
          background: linear-gradient(45deg, #9f7e54, #b8956a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .quantity-btn {
          transition: all 0.2s ease;
        }

        .quantity-btn:hover {
          background-color: #9f7e54;
          color: white;
        }

        .wishlist-btn {
          transition: all 0.3s ease;
        }

        .wishlist-btn.active {
          color: #e53e3e;
          transform: scale(1.1);
        }

        .tab-btn {
          transition: all 0.2s ease;
          position: relative;
        }

        .tab-btn.active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #9f7e54;
        }

        .similar-product-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .similar-product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(159, 126, 84, 0.15);
        }
      `}</style>

      <div className="font-serif bg-white text-gray-900 min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4 border-b border-gray-100">
          <nav className="text-sm text-gray-600">
            <span className="hover:text-gray-800 cursor-pointer">Home</span>
            <span className="mx-2">•</span>
            <span className="hover:text-gray-800 cursor-pointer">
              {product.category}
            </span>
            <span className="mx-2">•</span>
            <span className="hover:text-gray-800 cursor-pointer">
              {product.collection}
            </span>
            <span className="mx-2">•</span>
            <span style={{ color: "#9f7e54" }}>{product.name}</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            {/* Product Images */}
            <div className="slide-up">
              {/* Main Image */}
              <div className="mb-6">
                <div className="relative glass-effect rounded-2xl overflow-hidden">
                  <div className="w-full h-96 lg:h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    {/* <span className="text-gray-400 text-lg font-medium">
                      {product.images[selectedImage]}
                    </span> */}


                    <img
                        src={product.images[selectedImage]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />

                  </div>

                  {product.isNew && (
                    <div
                      className="absolute top-6 left-6 px-4 py-2 text-sm font-bold text-white rounded-full shadow-lg"
                      style={{ backgroundColor: "#9f7e54" }}
                    >
                      NEW ARRIVAL
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`absolute top-6 right-6 p-3 bg-white rounded-full shadow-lg wishlist-btn ${
                      isWishlisted ? "active" : ""
                    }`}
                  >
                    <span className="text-xl">
                      {isWishlisted ? "❤️" : "🤍"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`thumbnail flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                      selectedImage === index ? "active" : "border-gray-200"
                    }`}
                  >
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                      
                      
                      {index + 1}

                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="slide-up">
              {/* Product Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-sm px-3 py-1 rounded-full text-white font-medium"
                    style={{ backgroundColor: "#9f7e54" }}
                  >
                    {product.collection}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">
                    SKU: {product.sku}
                  </span>
                </div>

                <h1 className="text-4xl font-light mb-4 text-gray-800">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold price-gradient">
                    £{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-2xl text-gray-400 line-through">
                      £{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                      Save £
                      {(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  )}
                </div>

                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    product.availability === "In Stock"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  <span className="mr-2">
                    {product.availability === "In Stock" ? "✅" : "⚠️"}
                  </span>
                  {product.availability}
                </div>
              </div>

              {/* Key Specifications */}
              <div className="glass-effect rounded-xl p-6 mb-8">
                <h3 className="font-semibold mb-4 text-gray-800">
                  Key Features
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Gold Purity</span>
                    <p className="font-semibold">{product.goldPurity}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Weight</span>
                    <p className="font-semibold">{product.weight}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Gemstones</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.gemstones.map((stone) => (
                        <span
                          key={stone}
                          className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                        >
                          {stone}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Occasion</span>
                    <p className="font-semibold">{product.occasion}</p>
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Size
                  </label>
                  <div className="flex gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? "border-[#9f7e54] bg-[#9f7e54] text-white"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="quantity-btn px-4 py-2 border-r border-gray-300"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="quantity-btn px-4 py-2 border-l border-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Purchase Buttons */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-4 border-2 border-[#9f7e54] text-[#9f7e54] rounded-xl hover:bg-[#9f7e54] hover:text-white transition-colors font-semibold"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 px-6 py-4 bg-[#9f7e54] text-white rounded-xl hover:opacity-90 transition-opacity font-semibold shadow-lg"
                >
                  Buy Now
                </button>
              </div>

              {/* Additional Info */}
              <div className="text-sm text-gray-600 space-y-2">
                <p className="flex items-center gap-2">
                  <span>🚚</span>
                  Free shipping on orders over £2,000
                </p>
                <p className="flex items-center gap-2">
                  <span>🔒</span>
                  Secure payment & 30-day return policy
                </p>
                <p className="flex items-center gap-2">
                  <span>💎</span>
                  Lifetime craftsmanship warranty
                </p>
                <p className="flex items-center gap-2">
                  <span>📞</span>
                  Expert consultation available
                </p>
              </div>
            </div>
          </div>

          {/* Product Story & Details */}
          <div className="mb-16 slide-up">
            <div className="glass-effect rounded-2xl p-8">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-8">
                {[
                  { id: "story", label: "The Story", icon: "📖" },
                  { id: "details", label: "Specifications", icon: "📋" },
                  { id: "care", label: "Care Guide", icon: "✨" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`tab-btn px-6 py-3 font-semibold flex items-center gap-2 ${
                      activeTab === tab.id
                        ? "text-[#9f7e54]"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "story" && (
                <div className="prose prose-lg max-w-none">
                  <h3
                    className="text-2xl font-light mb-6"
                    style={{ color: "#9f7e54" }}
                  >
                    A Legacy in Gold
                  </h3>
                  {product.story.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-700 leading-relaxed mb-6"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {activeTab === "details" && (
                <div>
                  <h3
                    className="text-2xl font-light mb-6"
                    style={{ color: "#9f7e54" }}
                  >
                    Technical Specifications
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center py-3 border-b border-gray-100"
                        >
                          <span className="font-semibold text-gray-800">
                            {key}
                          </span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {activeTab === "care" && (
                <div>
                  <h3
                    className="text-2xl font-light mb-6"
                    style={{ color: "#9f7e54" }}
                  >
                    Care Instructions
                  </h3>
                  <div className="space-y-4">
                    {product.care.map((instruction, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                      >
                        <span className="text-[#9f7e54] font-bold text-lg">
                          {index + 1}.
                        </span>
                        <p className="text-gray-700">{instruction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Similar Products */}
          <div className="slide-up">
            <div className="text-center mb-12">
              <h2
                className="text-3xl font-light mb-4"
                style={{ color: "#9f7e54" }}
              >
                You Might Also Love
              </h2>
              <p className="text-gray-600">
                Discover more pieces from our curated collection
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {similarProducts.map((item) => (
                <div
                  key={item.id}
                  className="similar-product-card glass-effect rounded-xl overflow-hidden"
                >
                  <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                   
                   

                    {/* <span className="text-gray-400 text-sm">{item.image}</span> */}

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />


                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold price-gradient">
                        £{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          £{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button className="w-full px-4 py-2 bg-[#9f7e54] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
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
              Stay Connected with Our Heritage
            </h2>
            <p className="text-gray-700 mb-8">
              Join our community and be the first to discover new masterpieces
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

export default ProductSinglePage;
