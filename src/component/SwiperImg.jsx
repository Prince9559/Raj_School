import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import imageUrl from "../imageUrl";

function SwiperImg() {
  console.log("imageUrl :: ", imageUrl);
  return (
    <div className="max-h-[750px] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        autoplay
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {imageUrl.map((slide) => (
          <SwiperSlide key={slide}>
            <img
              src={slide}
              alt=""
              className="w-full h-[300px] sm:h-[900px]  lg:object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperImg;
