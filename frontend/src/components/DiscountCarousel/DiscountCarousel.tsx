//frontend/src/components/DiscountCarousel/DiscountCarousel.tsx
/// <reference types="node" />
import { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./DiscountCarousel.module.scss";


interface CarouselItem {
  id: number;
  image: string;
  discount: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  timeLimit?: string;
}

interface DiscountCarouselProps {
  items: CarouselItem[];
  autoPlayInterval?: number;
}

const DiscountCarousel = ({
  items,
  autoPlayInterval = 5000,
}: DiscountCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 自动播放控制
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlay) {
      interval = setInterval(nextSlide, autoPlayInterval);
    }
    return () => interval && clearInterval(interval);
  }, [isAutoPlay, nextSlide, autoPlayInterval]);

  // 触摸事件处理
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (deltaX > 50) nextSlide();
    if (deltaX < -50) prevSlide();
  };

  return (
    <div
      className="position-relative overflow-hidden rounded-3 shadow-lg"
      style={{
        backgroundImage: `url(/assets/OnSale.jpeg)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      
    
      {/* 轮播项 */}
      <div className="position-relative" style={{ height: 600 }}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`position-absolute w-100 h-100 transition-opacity ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: "0.6s" }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-100 h-100 object-fit-cover"
            />

            {/* 折扣标签 */}
            <div
              className={styles.discountLabel}
              style={{
                transform: "rotate(5deg)",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
            >
              {item.discount}
            </div>

            {/* 信息框 */}
            <div
              className="position-absolute bottom-0 start-0 end-0 text-white p-4"
              style={{
                background: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8))",
              }}
            >
              <h3 className="mb-2">{item.title}</h3>
              <div className="d-flex align-items-center mb-2">
                <span className="text-decoration-line-through opacity-75 me-3">
                  ¥{item.originalPrice}
                </span>
                <span className="fs-3 text-warning">
                  ¥{item.discountedPrice}
                </span>
              </div>
              {item.timeLimit && (
                <div className="bg-white bg-opacity-10 p-2 rounded">
                  限时优惠剩余 {item.timeLimit}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 导航按钮 */}
      <button
        className="position-absolute top-50 start-0 translate-middle-y btn btn-light bg-opacity-75 rounded-circle p-3 mx-3"
        onClick={prevSlide}
      >
        ‹
      </button>
      <button
        className="position-absolute top-50 end-0 translate-middle-y btn btn-light bg-opacity-75 rounded-circle p-3 mx-3"
        onClick={nextSlide}
      >
        ›
      </button>

      {/* 指示点 */}
      <div className="position-absolute bottom-3 start-50 translate-middle-x d-flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`btn p-1 rounded-circle ${
              index === currentIndex ? "bg-danger" : "bg-white bg-opacity-50"
            }`}
            style={{ width: 12, height: 12 }}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default DiscountCarousel;
