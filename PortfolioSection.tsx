import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PROJECTS, ProjectItem } from '../data/businessData';
import { ResilientImage } from './ResilientImage';

interface PortfolioSectionProps {
  onSelectProjectScope: (services: string[]) => void;
}

type GalleryFilter = 'all' | ProjectItem['category'];

const GALLERY_FILTERS: { id: GalleryFilter; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'compounds', label: 'Compound & Lawns' },
  { id: 'pavers', label: 'Pavers & Steps' },
  { id: 'rockery', label: 'Rock & Courtyard Gardens' },
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function PortfolioSection({ onSelectProjectScope }: PortfolioSectionProps) {
  const [filter, setFilter] = useState<GalleryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleProjects =
    filter === 'all' ? PROJECTS : PROJECTS.filter((project) => project.category === filter);

  const activeProject = lightboxIndex !== null ? visibleProjects[lightboxIndex] ?? null : null;

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      } else if (event.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleProjects.length
        );
      } else if (event.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + visibleProjects.length) % visibleProjects.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, visibleProjects.length]);

  const handleFilterChange = (nextFilter: GalleryFilter) => {
    setFilter(nextFilter);
    setLightboxIndex(null);
  };

  return (
    <section id="projects" className="py-16 lg:py-24 bg-[#EFF2EE] border-b border-[#DCE2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Interactive Gallery Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-12"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1B5E3A] mb-2">Selected Kampala Work</p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111915]"
              style={{ textWrap: 'balance' }}
            >
              Real compounds, paver installations, and gardens crafted by our team.
            </h2>
          </div>

          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-[#DCE2DA] rounded-xl self-start lg:self-auto"
            role="tablist"
            aria-label="Filter project gallery"
          >
            {GALLERY_FILTERS.map((item) => {
              const isActive = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleFilterChange(item.id)}
                  className={`relative px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E3A] ${
                    isActive ? 'text-white' : 'text-[#46524B] hover:text-[#111915]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="galleryFilterIndicator"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 bg-[#111915] rounded-lg"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Media-First Asymmetric Bento Gallery */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => {
              const isHeroTile = filter === 'all' && index === 0;
              return (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  viewport={{ once: true, amount: 0.08 }}
                  transition={{ duration: 0.35, delay: index * 0.04, ease: EASE_OUT_EXPO }}
                  whileHover={{ y: -3 }}
                  className={`${
                    isHeroTile ? 'md:col-span-2' : ''
                  } group bg-white border border-[#DCE2DA] rounded-2xl overflow-hidden flex flex-col`}
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="relative w-full h-72 sm:h-80 overflow-hidden bg-[#E4EAE3] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1B5E3A]"
                    aria-label={`View larger image of ${project.title}`}
                  >
                    <ResilientImage
                      src={project.image}
                      alt={project.title}
                      fallbackTitle={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-200" />
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-black/55 text-white flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-150">
                      <Expand className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <p className="text-xs text-white/80 mb-1">
                        {project.categoryLabel} · {project.location}
                      </p>
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-white">
                        {project.title}
                      </h3>
                    </div>
                  </button>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                    <p className="text-sm text-[#46524B] leading-relaxed">{project.scope}</p>
                    <div className="pt-4 border-t border-[#EAEFEA] flex items-center justify-between gap-4">
                      <span className="text-xs text-[#546159] truncate">
                        {project.servicesUsed.join(' · ')}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectProjectScope(project.servicesUsed)}
                        className="text-xs font-semibold text-[#1B5E3A] hover:text-[#14482C] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E3A] rounded"
                      >
                        Quote similar
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal with Smooth Entrance/Exit */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.title}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
              className="relative max-w-5xl w-full bg-[#111915] text-white rounded-2xl overflow-hidden border border-white/15"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
                <div className="min-w-0">
                  <p className="text-xs text-white/65 truncate">
                    {activeProject.categoryLabel} · {activeProject.location}
                  </p>
                  <h3 className="font-display text-lg font-semibold truncate">
                    {activeProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close project lightbox"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative bg-black flex items-center justify-center max-h-[65vh] overflow-hidden">
                <ResilientImage
                  src={activeProject.image}
                  alt={activeProject.title}
                  fallbackTitle={activeProject.title}
                  className="max-h-[65vh] w-auto object-contain"
                />
                {visibleProjects.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxIndex((prev) =>
                          prev === null
                            ? 0
                            : (prev - 1 + visibleProjects.length) % visibleProjects.length
                        )
                      }
                      aria-label="Previous project"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-black/65 hover:bg-black/85 text-white flex items-center justify-center cursor-pointer"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxIndex((prev) =>
                          prev === null ? 0 : (prev + 1) % visibleProjects.length
                        )
                      }
                      aria-label="Next project"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-black/65 hover:bg-black/85 text-white flex items-center justify-center cursor-pointer"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                <div className="max-w-2xl">
                  <p className="text-sm text-white/85 leading-relaxed">{activeProject.scope}</p>
                  <p className="text-xs text-white/60 mt-2">
                    Services: {activeProject.servicesUsed.join(' · ')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSelectProjectScope(activeProject.servicesUsed);
                    setLightboxIndex(null);
                  }}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1B5E3A] hover:bg-[#14482C] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Request Similar Scope
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
