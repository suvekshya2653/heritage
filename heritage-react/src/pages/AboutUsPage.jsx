import React, { useEffect, useRef } from "react";

const AboutUsPage = () => {
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

  return (
    <>
      <style jsx>{`
        .hero-bg {
          background-image: url("cover2.jpg");
          background-color: transparent;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .mandala-placeholder {
          width: 80px;
          height: 80px;
          border: 2px solid #9f7e54;
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
          width: 60px;
          height: 60px;
          border: 1px solid #9f7e54;
          border-radius: 50%;
          opacity: 0.6;
        }

        .mandala-placeholder::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          border: 1px solid #9f7e54;
          border-radius: 50%;
          opacity: 0.4;
        }

        .slide-up {
          animation: slideUp 0.8s ease-out;
        }

        .float {
          animation: float 4s ease-in-out infinite;
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
            transform: translateY(-5px);
          }
        }

        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(159, 126, 84, 0.1);
          border: 1px solid rgba(159, 126, 84, 0.2);
        }

        .gold-accent {
          background: linear-gradient(45deg, #9f7e54, #b8956a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .heritage-timeline {
          position: relative;
        }

        .heritage-timeline::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #9f7e54;
          transform: translateX(-50%);
        }

        @media (max-width: 768px) {
          .heritage-timeline::before {
            left: 20px;
          }
        }
      `}</style>

      <div className="font-serif bg-white text-gray-900 overflow-x-hidden">
        {/* Hero Section */}
        <section className="hero-bg min-h-screen flex items-center justify-center relative">
          <div className="absolute inset-0 bg-black/80"></div>
          <div className="max-w-6xl mx-auto px-4 text-center">
            <img
              src="logo-only-white.svg"
              className="float w-64 mx-auto mb-8"
            />
            <h1 className="text-5xl md:text-7xl font-light mb-6 text-white z-1000">
              About Heritage
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-white z-100">
              Where eight generations of Nepali gold craftsmanship meets modern
              luxury. A story of tradition, innovation, and unwavering
              commitment to excellence.
            </p>
            <div
              className="w-24 h-1 mx-auto"
              style={{ backgroundColor: "#9f7e54" }}
            ></div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="slide-up">
                <div className="glass-effect p-8 rounded-xl h-full">
                  <img
                    src="logo-only.svg"
                    className="float w-24 mx-auto mb-8"
                  />
                  <h2
                    className="text-4xl font-light mb-6 text-center"
                    style={{ color: "#9f7e54" }}
                  >
                    Our Mission
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-700 text-center">
                    To preserve and celebrate the ancient art of Nepali gold
                    craftsmanship while making it accessible to a global
                    audience. We are committed to honoring our ancestral
                    techniques, supporting local artisans, and creating
                    heirloom-quality jewelry that tells the story of Nepal's
                    rich cultural heritage.
                  </p>
                </div>
              </div>
              <div className="slide-up" style={{ animationDelay: "0.3s" }}>
                <div className="glass-effect p-8 rounded-xl h-full">
                  <img
                    src="logo-only.svg"
                    className="float w-24 mx-auto mb-8"
                  />
                  <h2
                    className="text-4xl font-light mb-6 text-center"
                    style={{ color: "#9f7e54" }}
                  >
                    Our Vision
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-700 text-center">
                    To become the bridge between Nepal's timeless jewelry
                    traditions and the modern world. We envision Heritage as the
                    premier destination for authentic Nepali gold jewelry, where
                    each piece serves as a cultural ambassador, sharing the
                    beauty and significance of our heritage across generations
                    and continents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Heritage Timeline */}
        <section
          className="py-24"
          style={{
            background: "linear-gradient(135deg, #f8f6f3 0%, #f5f3f0 100%)",
          }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16 slide-up">
              <h2
                className="text-5xl font-light mb-6"
                style={{ color: "#9f7e54" }}
              >
                Eight Generations of Excellence
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Our family's journey through time, preserving the sacred art of
                gold craftsmanship across centuries
              </p>
            </div>

            <div className="heritage-timeline space-y-16">
              {/* 1870s */}
              <div className="grid md:grid-cols-2 gap-8 items-center slide-up">
                <div className="md:text-right">
                  <div className="glass-effect p-6 rounded-lg">
                    <h3
                      className="text-2xl font-semibold mb-3"
                      style={{ color: "#9f7e54" }}
                    >
                      1870s - The Foundation
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Our ancestors established the family's first jewelry
                      workshop in the heart of Kathmandu Valley. Working with
                      traditional tools and techniques passed down through oral
                      tradition, they began crafting pieces for local nobles and
                      religious ceremonies.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center md:justify-start">
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center max-w-md">
                   

                    <img
                      src="1870.png"
                      alt="Historical Workshop Image"
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />

                   
                  </div>
                </div>
              </div>

              {/* Early 1900s */}
              <div className="grid md:grid-cols-2 gap-8 items-center slide-up">
                <div className="flex justify-center md:justify-end order-2 md:order-1">
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center max-w-md">
                    
                    
                    
                    
                    <img
                      src="1950.png"
                      alt="Royal Commission Pieces"
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    
                  
                  </div>
                </div>
                <div className="md:text-left order-1 md:order-2">
                  <div className="glass-effect p-6 rounded-lg">
                    <h3
                      className="text-2xl font-semibold mb-3"
                      style={{ color: "#9f7e54" }}
                    >
                      Early 1900s - Royal Patronage
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The family gained recognition from Nepal's royal court,
                      commissioned to create ceremonial pieces for state
                      functions and religious festivals. This period marked our
                      reputation for intricate filigree work and temple-inspired
                      designs.
                    </p>
                  </div>
                </div>
              </div>

              {/* 1950s - Narendra's Era */}
              <div className="grid md:grid-cols-2 gap-8 items-center slide-up">
                <div className="md:text-right">
                  <div className="glass-effect p-6 rounded-lg">
                    <h3
                      className="text-2xl font-semibold mb-3"
                      style={{ color: "#9f7e54" }}
                    >
                      1950s - The Golden Era
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Under the leadership of{" "}
                      <strong>Narendra Man Shrestha</strong>, our family's
                      reputation soared. Known throughout the Kathmandu Valley
                      for his exceptional craftsmanship and generous spirit, he
                      expanded the workshop and trained the next generation in
                      both traditional techniques and business acumen.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center md:justify-start">
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center max-w-md">
                   
                   
                    <img
                      src="1990s.png"
                      alt="Narendra's Workshop 1952"
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                   
                   
                  </div>
                </div>
              </div>

              {/* Modern Era */}
              <div className="grid md:grid-cols-2 gap-8 items-center slide-up">
                <div className="flex justify-center md:justify-end order-2 md:order-1">
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center max-w-md">
                    


                     <img
                      src="2020.png"
                      alt=" Modern Heritage Pieces"
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                  </div>
                </div>
                <div className="md:text-left order-1 md:order-2">
                  <div className="glass-effect p-6 rounded-lg">
                    <h3
                      className="text-2xl font-semibold mb-3"
                      style={{ color: "#9f7e54" }}
                    >
                      2020s - Global Expansion
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Today, under Pranav Man Shrestha's vision, we're bringing
                      our heritage to the world. Combining traditional Nepali
                      craftsmanship with modern business practices and global
                      reach, while never compromising on the quality and
                      authenticity that defines us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pranav's Profile Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 slide-up">
              <h2
                className="text-5xl font-light mb-6"
                style={{ color: "#9f7e54" }}
              >
                The Visionary Behind Heritage
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Meet the entrepreneur who bridges centuries of tradition with
                modern innovation
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="slide-up">
                <div className="w-full h-96 bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
                 
                    <img
                       src="founder-image.jpg"
                       alt="Pranav Man Shrestha"
                       className="w-full h-full object-cover"
                       />
                </div>
                <div className="text-center">
                  <h3
                    className="text-2xl font-semibold mb-2"
                    style={{ color: "#9f7e54" }}
                  >
                    Pranav Man Shrestha
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Founder & CEO, Heritage by Standard Gold Exchange
                  </p>
                  <div className="glass-effect p-4 rounded-lg">
                    <p className="text-sm text-gray-600 italic">
                      "Heritage is not just a business—it's my family's legacy
                      and Nepal's gift to the world."
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="slide-up space-y-8"
                style={{ animationDelay: "0.3s" }}
              >
                <div>
                  <h4
                    className="text-2xl font-semibold mb-4"
                    style={{ color: "#9f7e54" }}
                  >
                    The Entrepreneur
                  </h4>
                  <p className="text-lg leading-relaxed text-gray-700 mb-4">
                    Pranav Man Shrestha represents the eighth generation of his
                    family's gold legacy. As a young entrepreneur with deep
                    respect for tradition, he has successfully modernized
                    ancient practices while preserving their essence.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Before founding Heritage, Pranav established{" "}
                    <strong>Standard Gold Exchange</strong>, Nepal's premier
                    gold liquidity and exchange platform, revolutionizing how
                    gold is traded in his home country.
                  </p>
                </div>

                <div>
                  <h4
                    className="text-2xl font-semibold mb-4"
                    style={{ color: "#9f7e54" }}
                  >
                    Innovation Meets Tradition
                  </h4>
                  <p className="text-lg leading-relaxed text-gray-700 mb-4">
                    Under Pranav's leadership, Standard Gold Exchange has gained
                    the trust of thousands across Nepal, establishing him as a
                    respected figure in the precious metals industry. His
                    expertise in gold valuation, market dynamics, and ethical
                    trading practices forms the foundation of Heritage's
                    operations.
                  </p>
                </div>

                <div>
                  <h4
                    className="text-2xl font-semibold mb-4"
                    style={{ color: "#9f7e54" }}
                  >
                    A Global Vision
                  </h4>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Now, Pranav is bringing his family's centuries-old
                    craftsmanship to the UK, creating Heritage as a bridge
                    between Nepal's rich jewelry traditions and contemporary
                    global markets. His vision extends beyond commerce—it's
                    about cultural preservation, artisan empowerment, and
                    sharing Nepal's golden heritage with the world.
                  </p>
                </div>

                {/* Achievements */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass-effect p-4 rounded-lg text-center">
                    <div
                      className="text-2xl font-bold mb-2"
                      style={{ color: "#9f7e54" }}
                    >
                      8th
                    </div>
                    <p className="text-sm text-gray-600">
                      Generation Craftsman
                    </p>
                  </div>
                  <div className="glass-effect p-4 rounded-lg text-center">
                    <div
                      className="text-2xl font-bold mb-2"
                      style={{ color: "#9f7e54" }}
                    >
                      150+
                    </div>
                    <p className="text-sm text-gray-600">Years Family Legacy</p>
                  </div>
                  <div className="glass-effect p-4 rounded-lg text-center">
                    <div
                      className="text-2xl font-bold mb-2"
                      style={{ color: "#9f7e54" }}
                    >
                      1000+
                    </div>
                    <p className="text-sm text-gray-600">Trusted Customers</p>
                  </div>
                  <div className="glass-effect p-4 rounded-lg text-center">
                    <div
                      className="text-2xl font-bold mb-2"
                      style={{ color: "#9f7e54" }}
                    >
                      #1
                    </div>
                    <p className="text-sm text-gray-600">
                      Gold Exchange in Nepal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section
          className="py-24"
          style={{
            background: "linear-gradient(135deg, #f8f6f3 0%, #f5f3f0 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 slide-up">
              <h2
                className="text-5xl font-light mb-6"
                style={{ color: "#9f7e54" }}
              >
                Our Core Values
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                The principles that guide every piece we create and every
                relationship we build
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div
                className="slide-up text-center"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="glass-effect p-8 rounded-xl h-full">
                  <img
                    src="logo-only.svg"
                    className="float w-16 mx-auto mb-8"
                  />
                  <h3
                    className="text-xl font-semibold mb-4"
                    style={{ color: "#9f7e54" }}
                  >
                    Authenticity
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Every piece is crafted using traditional Nepali techniques,
                    ensuring genuine cultural representation and uncompromising
                    quality.
                  </p>
                </div>
              </div>

              <div
                className="slide-up text-center"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="glass-effect p-8 rounded-xl h-full">
                  <img
                    src="logo-only.svg"
                    className="float w-16 mx-auto mb-8"
                  />
                  <h3
                    className="text-xl font-semibold mb-4"
                    style={{ color: "#9f7e54" }}
                  >
                    Heritage
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We honor our ancestors' wisdom while adapting to
                    contemporary needs, preserving traditions for future
                    generations.
                  </p>
                </div>
              </div>

              <div
                className="slide-up text-center"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="glass-effect p-8 rounded-xl h-full">
                  <img
                    src="logo-only.svg"
                    className="float w-16 mx-auto mb-8"
                  />
                  <h3
                    className="text-xl font-semibold mb-4"
                    style={{ color: "#9f7e54" }}
                  >
                    Excellence
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    From design conception to final delivery, we maintain the
                    highest standards of craftsmanship and customer service.
                  </p>
                </div>
              </div>

              <div
                className="slide-up text-center"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="glass-effect p-8 rounded-xl h-full">
                  <img
                    src="logo-only.svg"
                    className="float w-16 mx-auto mb-8"
                  />
                  <h3
                    className="text-xl font-semibold mb-4"
                    style={{ color: "#9f7e54" }}
                  >
                    Innovation
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We embrace modern techniques and business practices to make
                    our heritage accessible to a global audience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Expertise Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 slide-up">
              <h2
                className="text-5xl font-light mb-6"
                style={{ color: "#9f7e54" }}
              >
                Our Expertise
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Centuries of knowledge refined into modern mastery
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="glass-effect p-8 rounded-xl text-center h-full">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                    <img
    src="Chhetri Jewelry (2).png"
    alt="Traditional Craftsmanship"
    className="w-full h-full object-cover"
  />
                  
                  </div>
                  <h3
                    className="text-2xl font-semibold mb-4"
                    style={{ color: "#9f7e54" }}
                  >
                    Traditional Techniques
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Master artisans skilled in ancient Nepali jewelry-making
                    methods, including hand-forging, intricate filigree work,
                    and traditional stone setting techniques passed down through
                    eight generations.
                  </p>
                </div>
              </div>

              <div className="slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="glass-effect p-8 rounded-xl text-center h-full">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                    
                    <img
    src="Newari Jewelry.png"
    alt="Gold Trading Expertise"
    className="w-full h-full object-cover"
  />
                    
                    
                  </div>
                  <h3
                    className="text-2xl font-semibold mb-4"
                    style={{ color: "#9f7e54" }}
                  >
                    Gold Market Knowledge
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Deep understanding of gold markets, pricing, and quality
                    assessment through Standard Gold Exchange, ensuring our
                    customers receive the best value and authenticity
                    guarantees.
                  </p>
                </div>
              </div>

              <div className="slide-up" style={{ animationDelay: "0.3s" }}>
                <div className="glass-effect p-8 rounded-xl text-center h-full">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                  
                                   <img
    src="Sherpa Jewelry.png"
    alt="Custom Design"
    className="w-full h-full object-cover"
  />
                  
                    
                  </div>
                  <h3
                    className="text-2xl font-semibold mb-4"
                    style={{ color: "#9f7e54" }}
                  >
                    Bespoke Design
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Creating unique, personalized pieces that blend traditional
                    Nepali motifs with contemporary aesthetics, tailored to
                    individual preferences and cultural significance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Future Section */}
        <section
          className="py-24"
          style={{
            background: "linear-gradient(135deg, #f8f6f3 0%, #f5f3f0 100%)",
          }}
        >
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="slide-up">
              <h2
                className="text-5xl font-light mb-8"
                style={{ color: "#9f7e54" }}
              >
                The Future of Heritage
              </h2>
              <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed text-gray-700 mb-12">
                <p>
                  As we prepare to launch in the UK, we're not just opening a
                  showroom—we're creating a cultural bridge. Our vision extends
                  beyond individual sales to building a community that
                  appreciates the artistry, history, and significance of Nepali
                  gold craftsmanship.
                </p>
                <p>
                  We plan to collaborate with local artisans, offer workshops on
                  traditional techniques, and create custom pieces that honor
                  both Nepali heritage and British traditions. Each piece will
                  continue to tell a story—not just of gold and gemstones, but
                  of cultural connection and shared human creativity.
                </p>
                <p
                  className="text-xl font-semibold"
                  style={{ color: "#9f7e54" }}
                >
                  Heritage is more than our name—it's our promise to preserve
                  the past while crafting the future.
                </p>
              </div>

              <div
                className="w-24 h-1 mx-auto mb-8"
                style={{ backgroundColor: "#9f7e54" }}
              ></div>

              <img src="logo-only.svg" className="float w-32 mx-auto mb-8" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="py-12 text-white"
          style={{ backgroundColor: "#231f20" }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <img
              src="logo-only-white.svg"
              className="float w-32 mx-auto mb-8"
            />
            <h3
              className="text-2xl mb-2 font-light"
              style={{ color: "#9f7e54" }}
            >
              HERITAGE
            </h3>
            <p className="text-lg mb-4 opacity-80">by Standard Gold Exchange</p>
            <p className="opacity-60">
              Eight Generations • One Legacy • Infinite Stories
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutUsPage;
