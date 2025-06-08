'use client';

import type React from 'react';
import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  AnimatePresence,
} from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Data for the left panel and corresponding videos
const vehicleSectionsData = [
  {
    id: 'passenger',
    title: 'Passenger vehicles',
    description: 'Revving up nonwoven innovation from interior to exterior.',
    videoSrc: '/solutionSection/PassengerAlpha01.mp4',
    bottomControlsData: [
      {
        name: 'Complete Body',
        image: '/icons/complete-body.png',
        video: '/solutionSection/PassengerAlpha01.mp4',
      },
      {
        name: 'Front',
        image: '/icons/front-body.png',
        video: '/solutionSection/PassengerFront.mp4',
      },
      {
        name: 'Cabin',
        image: '/icons/cabin.png',
        video: '/solutionSection/PassengerCabin.mp4',
      },
      {
        name: 'Trunk',
        image: '/icons/trunk.png',
        video: '/solutionSection/PassengerTrunk.mp4',
      },
      {
        name: 'Exterior',
        image: '/icons/exterior.png',
        video: '/solutionSection/PassengerExterior.mp4',
      },
    ],
  },
  {
    id: 'commercial',
    title: 'Commercial vehicles',
    description:
      'Driving efficiency and durability for commercial applications.',
    videoSrc: '/solutionSection/CommercialAlpha01.mp4',
    bottomControlsData: [
      {
        name: 'Complete Body',
        image: '/icons/commercial-body.svg',
        video: '/solutionSection/CommercialAlpha01.mp4',
      },
      {
        name: 'Front',
        image: '/icons/commercial-engine.svg',
        video: '/solutionSection/CommercialEngine.mp4',
      },
      {
        name: 'Cabin',
        image: '/icons/commercial-cabin.svg',
        video: '/solutionSection/CommercialCabin.mp4',
      },
    ],
  },
];

interface VehicleSection {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  bottomControlsData: {
    name: string;
    image: string;
    video: string;
  }[];
}

const bottomControlsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const bottomControlItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

// Play button pulse animation
const playButtonPulseVariants = {
  playing: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  paused: {
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};

// Play button background animation
const playButtonBgVariants = {
  playing: {
    background: [
      'linear-gradient(45deg, #ffffff20, #ffffff40, #ffffff20)',
      'linear-gradient(225deg, #ffffff20, #ffffff40, #ffffff20)',
      'linear-gradient(45deg, #ffffff20, #ffffff40, #ffffff20)',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    },
  },
  paused: {
    background: 'transparent',
    transition: {
      duration: 0.3,
    },
  },
};

const SolutionSection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const sectionsContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // STATE MANAGEMENT
  const [activeVehicleSection, setActiveVehicleSection] =
    useState<VehicleSection>(vehicleSectionsData[0]);
  const [currentVideoSrc, setCurrentVideoSrc] = useState(
    vehicleSectionsData[0].videoSrc
  );
  const [activeControlIndex, setActiveControlIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [sectionElements, setSectionElements] = useState<HTMLElement[]>([]);

  // ANIMATION VALUES
  const headingAnimEnd = 0.1;
  const contentFadeStart = 0.08;
  const contentFadeEnd = 0.15;
  const headingY = useTransform(
    scrollYProgress,
    [0, headingAnimEnd],
    [0, -250]
  );
  const headingScale = useTransform(
    scrollYProgress,
    [0, headingAnimEnd],
    [1, 0.8]
  );
  const panelOpacity = useTransform(
    scrollYProgress,
    [contentFadeStart, contentFadeEnd],
    [0, 1]
  );
  const panelY = useTransform(
    scrollYProgress,
    [contentFadeStart, contentFadeEnd],
    [100, 0]
  );

  // SCROLL-BASED ACTIVE SECTION LOGIC
  const numVehicleSections = vehicleSectionsData.length;
  const sectionInteractionStart = contentFadeEnd;
  const sectionInteractionEnd = 0.8;
  const activeSectionIndexMV: MotionValue<number> = useTransform(
    scrollYProgress,
    (value) => {
      if (value < sectionInteractionStart) return 0;
      if (value >= sectionInteractionEnd) return numVehicleSections - 1;
      const progressInSections =
        (value - sectionInteractionStart) /
        (sectionInteractionEnd - sectionInteractionStart);
      return Math.min(
        numVehicleSections - 1,
        Math.floor(progressInSections * numVehicleSections)
      );
    }
  );

  // EFFECT: Collect section elements for positioning calculations
  useEffect(() => {
    if (sectionsContainerRef.current) {
      const elements = Array.from(sectionsContainerRef.current.children).filter(
        (child) => child.classList.contains('section-item')
      ) as HTMLElement[];
      setSectionElements(elements);
    }
  }, []);

  // EFFECT: Update active section and video based on scroll
  useEffect(() => {
    const unsubscribe = activeSectionIndexMV.onChange((latestIndex) => {
      setActiveSectionIndex(latestIndex);
      const newSection = vehicleSectionsData[latestIndex];
      setActiveVehicleSection(newSection);
      setCurrentVideoSrc(newSection.videoSrc);
      setActiveControlIndex(0);
      setIsPlaying(true);
    });
    return () => unsubscribe();
  }, [activeSectionIndexMV]);

  // EFFECT: Control video playback
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (isPlaying) {
        videoElement
          .play()
          .catch((error) => console.error('Video play failed:', error));
      } else {
        videoElement.pause();
      }
    }
  }, [isPlaying, currentVideoSrc]);

  // HANDLERS
  const handleControlClick = (videoSrc: string, index: number) => {
    setCurrentVideoSrc(videoSrc);
    setActiveControlIndex(index);
    setIsPlaying(true);
  };

  const handleSectionClick = (sectionIndex: number) => {
    const newSection = vehicleSectionsData[sectionIndex];
    setActiveSectionIndex(sectionIndex);
    setActiveVehicleSection(newSection);
    setCurrentVideoSrc(newSection.videoSrc);
    setActiveControlIndex(0);
    setIsPlaying(true);
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleVideoEnded = () => setIsPlaying(false);
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  };

  // Calculate slider position and height
  const getSliderProps = () => {
    if (
      sectionElements.length === 0 ||
      activeSectionIndex >= sectionElements.length
    ) {
      return { height: 0, y: 0 };
    }

    const activeElement = sectionElements[activeSectionIndex];
    const containerRect = sectionsContainerRef.current?.getBoundingClientRect();
    const elementRect = activeElement.getBoundingClientRect();

    if (!containerRect) return { height: 0, y: 0 };

    return {
      height: elementRect.height,
      y:
        elementRect.top -
        containerRect.top +
        sectionsContainerRef.current!.scrollTop,
    };
  };

  const sliderProps = getSliderProps();

  return (
    <div
      ref={targetRef}
      className='relative bg-black text-white'
      style={{ height: '300vh' }}
    >
      <div className='sticky top-0 h-screen overflow-hidden'>
        <motion.div
          style={{ y: headingY, scale: headingScale }}
          className='absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none px-4'
        >
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight'>
            Evolving the drive with{' '}
            <span className='font-bold'>360-degree</span>
          </h1>
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight mt-2'>
            comprehensive solutions
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: panelOpacity, y: panelY }}
          className='absolute inset-0 z-10 flex flex-col justify-between'
        >
          {/* Top spacing - responsive */}
          <div className='h-16 sm:h-20 md:h-24 lg:h-32 xl:h-40 flex-shrink-0' />

          {/* Main content area */}
          <div className='flex-grow flex flex-col lg:flex-row justify-between items-stretch px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-4 min-h-0'>
            {/* Left Panel with Vertical Slider */}
            <div
              ref={leftPanelRef}
              className='relative w-full lg:w-2/5 xl:w-1/3 flex-shrink-0 mb-6 lg:mb-0 lg:pr-6 xl:pr-8'
            >
              {/* Mobile/Tablet: Horizontal scroll for sections */}
              <div className='lg:hidden'>
                {/* Active indicator for mobile */}
                <div className='flex justify-center mb-1.5'>
                  <div className='flex gap-2'>
                    {vehicleSectionsData.map((_, index) => (
                      <motion.div
                        key={index}
                        className={cn(
                          'h-1 rounded-full transition-all duration-300',
                          activeSectionIndex === index
                            ? 'w-8 bg-white'
                            : 'w-2 bg-gray-600'
                        )}
                        animate={{
                          scale: activeSectionIndex === index ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                </div>

                <div className='flex gap-6 overflow-x-auto pb-4 scrollbar-hide'>
                  {vehicleSectionsData.map((section, index) => (
                    <motion.button
                      key={section.id}
                      onClick={() => handleSectionClick(index)}
                      animate={{
                        opacity: activeSectionIndex === index ? 1 : 0.6,
                        scale: activeSectionIndex === index ? 1 : 0.95,
                      }}
                      whileHover={{
                        opacity: 1,
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.5 }}
                      className='flex-shrink-0 w-64 sm:w-80 text-left p-3 rounded-lg hover:bg-white/5 transition-colors'
                    >
                      <h3 className='text-xl sm:text-2xl font-semibold mb-2'>
                        {section.title}
                      </h3>
                      <p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
                        {section.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Desktop: Vertical layout with slider indicator */}
              <div className='hidden lg:block relative'>
                {/* Slider indicator - positioned absolutely */}
                <AnimatePresence>
                  <motion.div
                    className='absolute left-0 w-1 bg-white rounded-full z-10'
                    initial={{ height: 0, y: 0 }}
                    animate={{
                      height: sliderProps.height,
                      y: sliderProps.y,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                      duration: 0.6,
                    }}
                  />
                </AnimatePresence>

                {/* Sections container */}
                <div ref={sectionsContainerRef} className='relative'>
                  {vehicleSectionsData.map((section, index) => (
                    <motion.button
                      key={section.id}
                      onClick={() => handleSectionClick(index)}
                      animate={{
                        opacity: activeSectionIndex === index ? 1 : 0.6,
                        scale: activeSectionIndex === index ? 1 : 0.98,
                      }}
                      whileHover={{
                        opacity: 1,
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.5 }}
                      className='section-item transform-gpu mb-8 xl:mb-10 pl-6 pr-4 py-4 text-left w-full rounded-lg hover:bg-white/5 transition-colors relative'
                    >
                      {/* Glow effect for active section */}
                      {activeSectionIndex === index && (
                        <motion.div
                          className='absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-lg'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}

                      <div className='relative z-10'>
                        <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold mb-2'>
                          {section.title}
                        </h3>
                        <p className='text-base xl:text-lg text-gray-300 leading-relaxed'>
                          {section.description}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel: Video */}
            <div className='w-full lg:w-3/5 xl:w-2/3 flex items-center justify-center lg:pl-6 xl:pl-8 min-h-0'>
              <div className='relative w-full h-full max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] lg:max-h-[65vh] xl:max-h-[70vh]'>
                <video
                  ref={videoRef}
                  key={currentVideoSrc}
                  src={currentVideoSrc}
                  muted
                  playsInline
                  onEnded={handleVideoEnded}
                  onTimeUpdate={handleTimeUpdate}
                  className='w-full h-full object-contain'
                />
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <motion.div
            className='flex-shrink-0 py-4 md:py-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16'
            variants={bottomControlsContainerVariants}
            initial='hidden'
            animate={panelOpacity.get() > 0.5 ? 'visible' : 'hidden'}
          >
            {/* Mobile: Stack controls vertically on small screens */}
            <div className='block sm:hidden'>
              <div className='flex justify-center mb-4'>
                <motion.button
                  onClick={handlePlayPause}
                  className='relative p-3 border border-gray-600 rounded-full transition-colors'
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  variants={{
                    ...bottomControlItemVariants,
                    ...playButtonPulseVariants,
                  }}
                  animate={isPlaying ? 'playing' : 'paused'}
                >
                  <motion.div
                    className='absolute inset-0 rounded-full'
                    variants={playButtonBgVariants}
                    animate={isPlaying ? 'playing' : 'paused'}
                  />
                  <svg className='w-6 h-6 relative z-10' viewBox='0 0 100 100'>
                    <motion.circle
                      cx='50'
                      cy='50'
                      r='40'
                      stroke='#fff'
                      strokeWidth='4'
                      fill='transparent'
                      pathLength='100'
                      style={{
                        strokeDasharray: '100',
                        strokeDashoffset: 100 - videoProgress,
                      }}
                      className='transform -rotate-90 origin-center'
                    />
                  </svg>
                  <div className='absolute inset-0 flex items-center justify-center z-10'>
                    {isPlaying ? (
                      <Pause className='w-3 h-3' />
                    ) : (
                      <Play className='w-3 h-3' />
                    )}
                  </div>
                </motion.button>
              </div>
              <div className='flex justify-center gap-3 overflow-x-auto pb-2'>
                {activeVehicleSection.bottomControlsData.map(
                  (control, index) => (
                    <motion.button
                      key={`${activeVehicleSection.id}-${control.name}`}
                      onClick={() => handleControlClick(control.video, index)}
                      className={cn(
                        'flex flex-col items-center gap-2 p-2 rounded-lg transition-all duration-300 flex-shrink-0',
                        activeControlIndex === index
                          ? 'opacity-100'
                          : 'opacity-30 hover:opacity-70'
                      )}
                      variants={bottomControlItemVariants}
                    >
                      <motion.div
                        animate={{
                          scale: activeControlIndex === index ? 1.1 : 1,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 15,
                        }}
                      >
                        <Image
                          src={control.image || '/placeholder.svg'}
                          alt={control.name}
                          width={40}
                          height={40}
                          className='w-8 h-8'
                        />
                      </motion.div>
                      <span className='text-xs text-center leading-tight'>
                        {control.name}
                      </span>
                    </motion.button>
                  )
                )}
              </div>
            </div>

            {/* Tablet and Desktop: Horizontal layout */}
            <div className='hidden sm:flex items-end justify-center lg:justify-end gap-3 md:gap-4 lg:gap-6'>
              {activeVehicleSection.bottomControlsData.map((control, index) => (
                <motion.button
                  key={`${activeVehicleSection.id}-${control.name}`}
                  onClick={() => handleControlClick(control.video, index)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-2 rounded-lg transition-opacity duration-300',
                    activeControlIndex === index ? 'opacity-100' : 'opacity-40'
                  )}
                  variants={bottomControlItemVariants}
                >
                  <motion.div
                    animate={{ scale: activeControlIndex === index ? 1.15 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <Image
                      src={control.image || '/placeholder.svg'}
                      alt={control.name}
                      width={60}
                      height={60}
                      className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14'
                    />
                  </motion.div>
                  <span className='text-xs sm:text-sm text-center'>
                    {control.name}
                  </span>
                </motion.button>
              ))}

              <motion.button
                onClick={handlePlayPause}
                className='relative p-2 md:p-3 border border-gray-600 rounded-full transition-colors self-center ml-4 lg:ml-6'
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                variants={{
                  ...bottomControlItemVariants,
                  ...playButtonPulseVariants,
                }}
                animate={isPlaying ? 'playing' : 'paused'}
              >
                <motion.div
                  className='absolute inset-0 rounded-full'
                  variants={playButtonBgVariants}
                  animate={isPlaying ? 'playing' : 'paused'}
                />
                <svg
                  className='w-6 h-6 md:w-8 md:h-8 relative z-10'
                  viewBox='0 0 100 100'
                >
                  <motion.circle
                    cx='50'
                    cy='50'
                    r='45'
                    stroke='#fff'
                    strokeWidth='5'
                    fill='transparent'
                    pathLength='100'
                    style={{
                      strokeDasharray: '100',
                      strokeDashoffset: 100 - videoProgress,
                    }}
                    className='transform -rotate-90 origin-center'
                  />
                </svg>
                <div className='absolute inset-0 flex items-center justify-center z-10'>
                  {isPlaying ? (
                    <Pause className='w-3 h-3 md:w-4 md:h-4' />
                  ) : (
                    <Play className='w-3 h-3 md:w-4 md:h-4' />
                  )}
                </div>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SolutionSection;
