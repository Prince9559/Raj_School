import { useEffect, useState } from 'react';

const Parallaxx = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative overflow-hidden parallax-container">
      <div 
        className="absolute top-0 left-0 w-full h-full parallax-bg bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('group.jpg')",
          transform: `translateY(${scrollPosition * 0.2}px)`,
        }}
      ></div>
      <div className="relative z-10 parallax-content bg-black bg-opacity-40 p-6">
        <h1 className="sm:mt-5 font-semibold text-lg md:text-2xl py-3 ">
          Our team of dedicated, skilled and passionate teachers
        </h1>
        <p className="p-2 sm:mx-20 mx-5 xl:mx-60 text-justify">
          Besides preparing students for academic achievement, we aim at
          empowering them with knowledge, attitudes, values, and skills to face
          the realities of life.
        </p>
      </div>
    </div>
  );
};

export default Parallaxx;
