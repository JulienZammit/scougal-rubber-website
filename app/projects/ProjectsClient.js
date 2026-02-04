"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, ChevronRight, X, ChevronLeft, MapPin, Calendar } from "lucide-react";

const projects = [
  {
    id: "bay-bridge",
    name: "Bay Bridge, San Francisco, California",
    description: "Scougal Rubber supplied elastomeric bearings for the Bay Bridge, ensuring long-lasting, durable support for critical infrastructure.",
    location: "San Francisco, CA",
    year: "2020",
    featured: true,
    slides: [
      { type: "video", src: "https://myblogimages.blob.core.windows.net/videos/Bay_Bridge.webm" },
      { type: "image", src: "/Bayway/bw1.webp" },
      { type: "image", src: "/Bayway/bw2.webp" },
      { type: "image", src: "/Bayway/bw3.webp" },
      { type: "image", src: "/Bayway/bw4.webp" }
    ]
  },
  {
    id: "interstate-95",
    name: "Interstate 95 Rehab, Pennsylvania",
    description: "Scougal Rubber supplied elastomeric components for the Interstate 95 rehabilitation, supporting critical structural performance and longevity.",
    location: "Pennsylvania",
    year: "2024",
    slides: [
      { type: "video", src: "https://myblogimages.blob.core.windows.net/videos/I95RollerBearingsPA.mp4" },
    ]
  },
  {
    id: "hood-canal",
    name: "Hood Canal Bridge",
    description: "Custom rubber solutions ensuring flexibility and strength for one of the longest floating bridges in the world.",
    location: "Washington State",
    year: "2018",
    slides: [
      { type: "image", src: "/Hood Canal/September 2008 001.webp" },
      { type: "image", src: "/Hood Canal/September 2008 002.webp" },
      { type: "image", src: "/Hood Canal/September 2008 007.webp" },
      { type: "image", src: "/Hood Canal/September 2008 008.webp" }
    ]
  },
  {
    id: "advanced-american",
    name: "Advanced American Project",
    description: "Precision-engineered elastomeric bearings and rubber components to support key industrial operations.",
    location: "California",
    year: "2019",
    slides: [
      { type: "image", src: "/advanced-american/1A.webp" },
      { type: "image", src: "/advanced-american/1B.webp" },
      { type: "image", src: "/advanced-american/1C.webp" },
      { type: "image", src: "/advanced-american/1D.webp" },
      { type: "image", src: "/advanced-american/1N.webp" },
      { type: "image", src: "/advanced-american/1O.webp" },
      { type: "image", src: "/advanced-american/1P.webp" },
      { type: "image", src: "/advanced-american/1Q.webp" }
    ]
  },
  {
    id: "lynn-lake",
    name: "Lynn Lake Project",
    description: "Customized elastomeric bearings and rubber solutions ensuring optimal performance in harsh environmental conditions.",
    location: "Texas",
    year: "2021",
    slides: [
      { type: "image", src: "/lynnlake/ll1.webp" },
      { type: "image", src: "/lynnlake/ll2.webp" },
      { type: "image", src: "/lynnlake/ll3.webp" },
      { type: "image", src: "/lynnlake/ll4.webp" }
    ]
  }
];

// Unified Hero + Featured Project Component
function ProjectsHero({ project }) {
  return (
    <section className="relative w-full">
      {/* Full Screen Hero with Background Image */}
      <div className="relative min-h-screen">
        {/* Background Image - Full Screen */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/project/banner.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

        {/* Content Container */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Title Section - Top */}
          <div className="pt-32 pb-8 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                Our Projects
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                Engineering Excellence in Every Detail
              </p>
            </motion.div>
          </div>

          {/* Video Card - Centered */}
          <div className="flex-1 flex items-center justify-center px-4 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full max-w-5xl"
            >
              {/* Featured Label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-full shadow-lg">
                  <Play className="w-4 h-4 text-white" fill="white" />
                  <span className="text-white text-sm font-semibold">Latest Project</span>
                </div>
                <div className="h-px flex-1 bg-white/30" />
              </div>

              {/* Video Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl">
                {/* Video */}
                <div className="relative aspect-video bg-black">
                  <video
                    src={project.slides[0].src}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="auto"
                  />
                </div>

                {/* Project Details */}
                <div className="p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        {project.name}
                      </h2>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex md:flex-col gap-4 md:gap-2 md:items-end shrink-0">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{project.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex justify-center mt-6"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2 text-white/70 cursor-pointer hover:text-white transition-colors"
                >
                  <span className="text-sm font-medium">Explore More Projects</span>
                  <ChevronRight className="w-5 h-5 rotate-90" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Project Card Component
function ProjectCard({ project, onClick, index }) {
  const [imageError, setImageError] = useState(false);
  const firstMedia = project.slides[0];
  const isVideo = firstMedia.type === "video";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      {/* Thumbnail */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-gray-900">
        {isVideo ? (
          <>
            <video
              src={firstMedia.src}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              muted
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-gray-900 ml-1" fill="currentColor" />
              </div>
            </div>
          </>
        ) : (
          <>
            {!imageError ? (
              <Image
                src={firstMedia.src}
                alt={project.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-400">Image unavailable</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>{project.location}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {project.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex items-center text-blue-600 font-medium text-sm">
          View Project
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

// Project Modal/Lightbox
function ProjectModal({ project, isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentSlide(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const currentMedia = project.slides[currentSlide];
  const isVideo = currentMedia.type === "video";

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % project.slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + project.slides.length) % project.slides.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Main content */}
        <div
          className="relative w-full max-w-6xl mx-4 md:mx-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Project info header */}
          <div className="mb-4 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {project.name}
            </h3>
            <p className="text-gray-400">
              {project.location} • {project.year}
            </p>
          </div>

          {/* Media container */}
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                {isVideo ? (
                  <video
                    src={currentMedia.src}
                    className="w-full h-full object-contain"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  />
                ) : (
                  !imageErrors[currentSlide] ? (
                    <Image
                      src={currentMedia.src}
                      alt={`${project.name} - Slide ${currentSlide + 1}`}
                      fill
                      className="object-contain"
                      onError={() => setImageErrors(prev => ({ ...prev, [currentSlide]: true }))}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400">Image unavailable</span>
                    </div>
                  )
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            {project.slides.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {project.slides.length > 1 && (
            <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2">
              {project.slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${index === currentSlide ? 'border-blue-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                >
                  {slide.type === "video" ? (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white" fill="currentColor" />
                    </div>
                  ) : (
                    <Image
                      src={slide.src}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Slide counter */}
          <div className="text-center mt-4 text-gray-400 text-sm">
            {currentSlide + 1} / {project.slides.length}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjectsClient() {
  const [selectedProject, setSelectedProject] = useState(null);
  const featuredProject = projects.find(p => p.featured) || projects[0];
  const otherProjects = projects.filter(p => p.id !== featuredProject.id);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Unified Hero + Featured Project */}
      <ProjectsHero project={featuredProject} />

      {/* Projects Grid Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              More Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our portfolio of bridge construction and industrial rubber solutions delivered across North America.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {otherProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

