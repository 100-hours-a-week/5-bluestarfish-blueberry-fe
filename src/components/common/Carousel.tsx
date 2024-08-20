import React, { useState, useEffect } from "react";

const Carousel = () => {
  const images = [
    `${process.env.PUBLIC_URL}/assets/images/intro-1.png`,
    `${process.env.PUBLIC_URL}/assets/images/intro-2.png`,
    `${process.env.PUBLIC_URL}/assets/images/intro-3.png`,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 슬라이딩을 위한 useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3초마다 자동 슬라이드

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, [images.length]);

  // 수동으로 이전 이미지로 이동
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // 수동으로 다음 이미지로 이동
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full mx-auto">
      {/* 이미지 슬라이드 */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`slide-${index}`}
              className="w-full h-[400px] object-cover"
            />
          ))}
        </div>
      </div>

      {/* 좌우 전환 버튼 */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
      >
        &#8249;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
      >
        &#8250;
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
