import React, { useEffect, useRef, useState } from "react";
import "../App.css";

const HeritagePage = () => {
  const observerRef = useRef(null);

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

    // Set initial state and observe elements
    const animatedElements = document.querySelectorAll(".slide-up");
    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleExploreClick = () => {
    const targetSection = document.querySelector("section:nth-of-type(2)");
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add your subscription logic here
    console.log("Subscribe clicked");
  };

  const legacySlides = [
    {
      src: "ancient-gold-wide.png",
      caption: "Third Generation, Kathmandu, 1952",
      alt: "Goldsmiths working in a historic workshop in Kathmandu.",
    },
    {
      src: "ancient-goldsmiths.png",
      caption: "Heritage Evidence – Documented in local trade archives",
      alt: "An ancient document showing trade records.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % legacySlides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <style jsx>{`
        .hero-bg {
          background-image: url("home-hero.jpg");
          background-color: transparent;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .mandala-placeholder {
          width: 120px;
          height: 120px;
          border: 3px solid #9f7e54;
          border-radius: 50%;
          position: relative;
          background: radial-gradient(
            circle,
            rgba(159, 126, 84, 0.1) 0%,
            transparent 70%
          );
        }

        .mandala-placeholder::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          border: 2px solid #9f7e54;
          border-radius: 50%;
          opacity: 0.6;
        }

        .mandala-placeholder::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border: 1px solid #9f7e54;
          border-radius: 50%;
          opacity: 0.4;
        }

        .fade-in {
          animation: fadeIn 1s ease-in-out;
        }

        .slide-up {
          animation: slideUp 0.8s ease-out;
        }

        .float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(159, 126, 84, 0.1);
          border: 1px solid rgba(159, 126, 84, 0.2);
        }
      `}</style>
      <div className="font-serif bg-white text-gray-900 overflow-x-hidden">
        {/* Hero Section */}
        <section className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <img
              src="logo-only-white.svg"
              className="float w-64 mx-auto mb-8"
            />
            <h1
              className="text-6xl md:text-8xl font-light mb-4 tracking-wider text-shadow fade-in"
              style={{ color: "#9f7e54" }}
            >
              HERITAGE
            </h1>
            <p
              className="text-xl md:text-2xl mb-2 slide-up opacity-90"
              style={{ animationDelay: "0.3s" }}
            >
              By Standard Gold Exchange
            </p>
            <p
              className="text-lg md:text-xl mb-8 slide-up opacity-80"
              style={{ animationDelay: "0.6s" }}
            >
              Honoring Nepali Heritage
            </p>
            <p
              className="text-2xl md:text-3xl mb-12 slide-up font-light"
              style={{ animationDelay: "0.9s", color: "#9f7e54" }}
            >
              Coming Soon to the UK
            </p>
            <button
              onClick={handleExploreClick}
              className="px-8 py-4 bg-transparent border-2 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 text-lg font-medium slide-up"
              style={{ borderColor: "#9f7e54", animationDelay: "1.2s" }}
            >
              Explore Our Legacy
            </button>
          </div>
        </section>

        {/* Our Legacy Section */}
        {/* <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="slide-up">
                <h2
                  className="text-4xl md:text-5xl mb-8 font-light"
                  style={{ color: "#9f7e54" }}
                >
                  Rooted in History. Forged in Gold.
                </h2>
                <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                  <p>
                    For over five generations, our family has carried the
                    ancient craft of Nepali jewelry-making—an unbroken tradition
                    of excellence that traces back over 150 years, with
                    community records disputing it to be as far as eight
                    generations.
                  </p>
                  <p>
                    From the royal courts of Kathmandu to sacred festivals
                    across the hills and valleys, our creations have adorned
                    Nepal's proudest moments.
                  </p>
                  <p>
                    We are honored to be recognized among Nepal's oldest jewelry
                    families, known for our intricate work, sacred techniques,
                    and deep reverence for gold as a vessel of culture.
                  </p>
                </div>
              </div>
              <div
                className="space-y-8 slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="glass-effect p-6 rounded-lg">
                  <img
                    src="ancient-gold-wide.png"
                    className="w-full rounded-lg mb-4"
                    alt="Goldsmiths working in Kathmandu, 1952"
                  />
                  <p className="text-sm italic text-gray-600">
                    Third Generation, Kathmandu, 1952
                  </p>
                </div>
                <div className="glass-effect p-6 rounded-lg">
                  <img
                    src="ancient-goldsmiths.png"
                    className="w-full rounded-lg mb-4"
                    alt="Goldsmiths working in Kathmandu, 1952"
                  />
                  <p className="text-sm italic text-gray-600">
                    Heritage Evidence – Documented in local trade archives
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section className="py-20 bg-white">
          {/* Add the animation style here */}
          <style>{`
            .fade-in-slide {
              animation: fadeIn 0.8s ease-in-out;
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="slide-up">
                <h2
                  className="text-4xl md:text-5xl mb-8 font-light"
                  style={{ color: "#9f7e54" }}
                >
                  Rooted in History. Forged in Gold.
                </h2>
                <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                  <p>
                    For over five generations, our family has carried the
                    ancient craft of Nepali jewelry-making—an unbroken tradition
                    of excellence that traces back over 150 years, with
                    community records disputing it to be as far as eight
                    generations.
                  </p>
                  <p>
                    From the royal courts of Kathmandu to sacred festivals
                    across the hills and valleys, our creations have adorned
                    Nepal's proudest moments.
                  </p>
                  <p>
                    We are honored to be recognized among Nepal's oldest jewelry
                    families, known for our intricate work, sacred techniques,
                    and deep reverence for gold as a vessel of culture.
                  </p>
                </div>
              </div>

              <div
                className="slide-up relative"
                style={{ animationDelay: "0.3s" }}
              >
                <div
                  key={currentSlide}
                  className="glass-effect p-6 rounded-lg fade-in-slide"
                >
                  <img
                    src={legacySlides[currentSlide].src}
                    className="w-full rounded-lg mb-4"
                    alt={legacySlides[currentSlide].alt}
                  />
                  <p className="text-sm italic text-gray-600">
                    {legacySlides[currentSlide].caption}
                  </p>
                </div>

                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {legacySlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index ? "bg-gray-700" : "bg-gray-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Heritage Story Section */}
        <section
          className="py-20"
          style={{
            background: "linear-gradient(135deg, #f8f6f3 0%, #f5f3f0 100%)",
          }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="slide-up">
              <h2
                className="text-4xl md:text-5xl mb-12 font-light"
                style={{ color: "#9f7e54" }}
              >
                An Ode to Legacy, A Testament to Time
              </h2>
              <div className="space-y-8 text-lg leading-relaxed text-gray-700">
                <p className="text-xl font-light italic">
                  This showroom stands not merely as a space of commerce, but as
                  a sanctuary of heritage—a refined tribute to over a century
                  and a half of Nepali gold craftsmanship preserved and
                  reimagined by the Man Shrestha family.
                </p>

                <p>
                  Heritage is not a new endeavor—it is a rebirth. A refined
                  continuation of a lineage that has shaped Nepal's jewelry
                  traditions through eight generations. At the heart of this
                  legacy stands{" "}
                  <span className="font-semibold" style={{ color: "#9f7e54" }}>
                    Narendra Man Shrestha
                  </span>
                  , a name spoken with admiration and reverence across the
                  Kathmandu Valley and beyond.
                </p>

                <p>
                  A distinguished gold merchant and pioneer of his time,
                  Narendra Man Shrestha embodied the perfect harmony of nobility
                  and charisma. He was a man of boundless generosity—donating
                  his own land to improve public access, welcoming entire
                  neighborhoods into his home to share the rare joy of
                  television, and uplifting his community through countless
                  unspoken acts of goodwill.
                </p>

                <p>
                  A patron of refinement, he lived with a quiet grandeur—once
                  commissioning a miniature replica of his own home, simply to
                  appreciate its architecture as a singular work of art.
                </p>

                <p>
                  Heritage honors this spirit—of giving, of artistry, of
                  grandeur—and redefines it for a new generation. Each piece is
                  crafted with the sacred knowledge passed down through
                  generations, and designed with a contemporary eye—where
                  tradition meets elegance, and every ornament carries the soul
                  of a story once lived.
                </p>

                <div className="pt-8">
                  <p
                    className="text-2xl font-light italic"
                    style={{ color: "#9f7e54" }}
                  >
                    This is more than jewelry.
                  </p>
                  <p
                    className="text-2xl font-light italic"
                    style={{ color: "#9f7e54" }}
                  >
                    This is our history, engraved in gold.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Visionary Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="slide-up">
                <img
                  src="founder-image.jpg"
                  className="w-full h-full bg-gray-200 rounded-lg mb-6 flex items-center justify-center"
                />
                <p className="text-sm italic text-gray-600 text-center">
                  Founder, Heritage by Standard Gold Exchange
                </p>
                <div className="mt-8 p-6 glass-effect rounded-lg text-center">
                  <img
                    src="sge.svg"
                    className="w-32 h-16 rounded mx-auto mb-4 flex items-center justify-center"
                  />
                  <p className="text-sm text-gray-600">
                    Trusted by thousands across Nepal.
                  </p>
                </div>
              </div>
              <div className="slide-up" style={{ animationDelay: "0.3s" }}>
                <h2
                  className="text-4xl md:text-5xl mb-8 font-light"
                  style={{ color: "#9f7e54" }}
                >
                  A New Generation. A New Chapter.
                </h2>
                <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                  <p>
                    I'm{" "}
                    <span
                      className="font-semibold"
                      style={{ color: "#9f7e54" }}
                    >
                      Pranav Man Shrestha
                    </span>
                    , a young entrepreneur and custodian of my family's gold
                    legacy. As the founder of Standard Gold Exchange—Nepal's
                    premier gold liquidity and exchange platform—I've modernized
                    the way gold is bought, sold, and valued in my country.
                  </p>
                  <p>
                    Now, I'm bringing my expertise and our family's
                    craftsmanship to the UK, through Heritage. A brand that
                    connects the past with the present—where legacy meets
                    luxury, and where every piece tells a story.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Craft Section */}
        <section
          className="py-20"
          style={{
            background: "linear-gradient(135deg, #f8f6f3 0%, #f5f3f0 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 slide-up">
              <h2
                className="text-4xl md:text-5xl mb-8 font-light"
                style={{ color: "#9f7e54" }}
              >
                Jewelry That Honors the Past and Embraces the Present
              </h2>
              <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed text-gray-700">
                <p>At Heritage, we design for two worlds:</p>
                <p>
                  <span className="font-semibold">The avid connoisseur</span> of
                  traditional Nepali artistry—think handcrafted tilharis,
                  mangalsutras, karas, and heirloom-worthy hars
                </p>
                <p>
                  <span className="font-semibold">
                    And the modern minimalist
                  </span>
                  —who seeks elegance, geometry, and meaning in every gold line
                </p>
                <p>
                  We are proud to showcase Nepali craftsmanship through both
                  custom commissions and curated seasonal collections that blend
                  ancient symbols with modern luxury.
                </p>
              </div>
            </div>

            {/* Jewelry Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div
                className="slide-up text-center"
                style={{ animationDelay: "0.2s" }}
              >
                <img
                  src="1.png"
                  className="w-64 h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center"
                />
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "#9f7e54" }}
                >
                  Traditional
                </h3>
                <p className="text-gray-600">
                  Authentic Nepali designs passed down through generations
                </p>
              </div>
              <div
                className="slide-up text-center"
                style={{ animationDelay: "0.4s" }}
              >
                <img
                  src="2.png"
                  className="w-64 h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center"
                />
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "#9f7e54" }}
                >
                  Temple-Inspired
                </h3>
                <p className="text-gray-600">
                  Sacred motifs and spiritual symbolism in gold
                </p>
              </div>
              <div
                className="slide-up text-center"
                style={{ animationDelay: "0.6s" }}
              >
                <img
                  src="3.png"
                  className="w-64 h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center"
                />
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "#9f7e54" }}
                >
                  Modern
                </h3>
                <p className="text-gray-600">
                  Contemporary elegance for today's lifestyle
                </p>
              </div>
              <div
                className="slide-up text-center"
                style={{ animationDelay: "0.8s" }}
              >
                <img
                  src="4.png"
                  className="w-64 h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center"
                />
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "#9f7e54" }}
                >
                  Fusion
                </h3>
                <p className="text-gray-600">
                  Where heritage meets contemporary design
                </p>
              </div>
            </div>

            {/* Craftsmanship Details */}
            <div className="grid md:grid-cols-3 gap-8">
              <div
                className="slide-up text-center"
                style={{ animationDelay: "1.0s" }}
              >
                <img
                  src="5.png"
                  className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center object-cover"
                />
                <p className="text-gray-600">Intricate filigree detailing</p>
              </div>
              <div
                className="slide-up text-center"
                style={{ animationDelay: "1.2s" }}
              >
                <img
                  src="6.png"
                  className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center object-cover"
                />
                <p className="text-gray-600">Precious stone craftsmanship</p>
              </div>
              <div
                className="slide-up text-center"
                style={{ animationDelay: "1.4s" }}
              >
                <img
                  src="7.png"
                  className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center object-cover object-top"
                />
                <p className="text-gray-600">Certified quality assurance</p>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="slide-up">
              <h2
                className="text-4xl md:text-5xl mb-8 font-light"
                style={{ color: "#9f7e54" }}
              >
                Launching Soon in the UK
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-gray-700 mb-12">
                <p>
                  We're excited to open our first location in the UK—bringing
                  authentic, ethically crafted Nepali jewelry to new generations
                  of gold lovers across the world.
                </p>
                <p>
                  Stay tuned for launch announcements, previews, and pre-orders.
                </p>
              </div>

              {/* Newsletter Signup */}
              <div className="max-w-md mx-auto">
                <h3
                  className="text-2xl mb-6 font-light"
                  style={{ color: "#9f7e54" }}
                >
                  Be the first to know
                </h3>
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{
                      borderColor: "#9f7e54",
                      "--tw-ring-color": "#9f7e54",
                    }}
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-all duration-300 font-medium"
                    style={{ backgroundColor: "#9f7e54" }}
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="py-12 text-white"
          style={{ backgroundColor: "#231f20" }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <img src="logo-only.svg" className="float w-32 mx-auto mb-8" />
            <h3
              className="text-2xl mb-2 font-light"
              style={{ color: "#9f7e54" }}
            >
              HERITAGE
            </h3>
            <p className="text-lg mb-4 opacity-80">by Standard Gold Exchange</p>
            <p className="opacity-60">
              Honoring Nepali Heritage • Coming Soon to the UK
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HeritagePage;
