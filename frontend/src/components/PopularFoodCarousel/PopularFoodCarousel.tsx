import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./PopularFoodCarousel.module.scss";

interface CarouselItem {
  id: number;
  image: string;
  title: string;
}

interface PopularFoodCarouselProps {
  mainFlavors: string; // Main flavors description
  carouselItems: CarouselItem[]; // Popular food items
  autoPlayInterval?: number; // Auto play interval in milliseconds
}

const PopularFoodCarousel = ({
  mainFlavors,
  carouselItems,
  autoPlayInterval = 5000, // Default auto play interval is 5 seconds
}: PopularFoodCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  }, [carouselItems.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlay) {
      interval = setInterval(nextSlide, autoPlayInterval);
    }
    return () => interval && clearInterval(interval);
  }, [isAutoPlay, nextSlide, autoPlayInterval]);

  // 触摸事件处理，支持移动端滑动切换
  // Touch event handling, support swipe gesture on mobile devices
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
    <div className={styles.popularFoodCarousel}>
      {/* 左侧区域：上部显示主打风味，下部显示跳转菜单按钮 */}
      <div className={styles.leftColumn}>
        <div className={styles.topLeft}>
          <div className={styles.flavors}>
            {mainFlavors}
          </div>
        </div>
        <div className={styles.bottomLeft}>
          <Link to="/menu" className="btn btn-primary">
            Menu
          </Link>
        </div>
      </div>

      {/* 右侧区域：合并上、下区域，放置轮播图 */}
      <div className={styles.rightColumn}>
        <div
          className={styles.carouselContainer}
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {carouselItems.map((item, index) => (
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
              <div 
                className="position-absolute bottom-0 start-0 end-0 text-white p-3" 
                style={{ background: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7))" }}
              >
                <h4>{item.title}</h4>
              </div>
            </div>
          ))}
          {/* 导航按钮 */}
          <button
            className="position-absolute top-50 start-0 translate-middle-y btn btn-light bg-opacity-75 rounded-circle p-2 mx-2"
            onClick={prevSlide}
          >
            ‹
          </button>
          <button
            className="position-absolute top-50 end-0 translate-middle-y btn btn-light bg-opacity-75 rounded-circle p-2 mx-2"
            onClick={nextSlide}
          >
            ›
          </button>
          {/* 指示点 */}
          <div className={`position-absolute start-50 translate-middle-x d-flex gap-2 ${styles.indicatorContainer}`}>
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`btn p-1 rounded-circle ${
                  index === currentIndex ? "bg-danger" : "bg-white bg-opacity-50"
                }`}
                style={{ width: 10, height: 10 }}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularFoodCarousel;
