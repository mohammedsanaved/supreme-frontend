// components/HeroSection.tsx
interface HeroSectionProps {
  tag: string;
  easyText: string;
  easyText2: string;
  video: string;
  heroText: string;
}

export default function HeroSection({
  tag,
  easyText,
  heroText,
  easyText2,
  video,
}: HeroSectionProps) {
  return (
    <section className='relative w-full h-screen overflow-hidden'>
      {/* Background Video */}
      <video
        className='absolute top-0 left-0 w-full h-full object-cover'
        src={video}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay Content */}
      <div className='relative z-10 flex flex-col items-center justify-center h-full text-white text-center bg-black/60 px-4'>
        <span className='font-light pt-2 pb-3 text-lg xl:text-xl 2xl:text-[1.375rem] leading-snug'>
          {tag}
        </span>
        <h2 className='font-light leading-tight pb-2 text-3xl md:text-5xl'>
          <span className='font-semibold'>
            {easyText}
            <span className='text-[#00BFFF]'> {heroText}</span>
          </span>
          <br className='hidden md:block' />
          {easyText2}
        </h2>
      </div>
    </section>
  );
}
