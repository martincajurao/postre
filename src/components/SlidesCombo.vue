

<template>
  <div>

    <swiper 
    :cssMode="true" 
    :navigation="true" 
    :loop="true"
    :mousewheel="true" 
    :keyboard="true" 
    :modules="modules"
    :pagination="{
      clickable: true,
    }"
    class="mySwiper">
      <swiper-slide><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide><swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide><swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide><swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide><swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide><swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide><swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-7.jpg" /></swiper-slide><swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide>
    </swiper>
  </div>
</template>

<script>
// import Swiper core and required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css/bundle';


// import '../style.css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Mousewheel, Keyboard],
    };
  },
};
</script>

<style scoped>
#app {
  height: 100%;
}

html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 650px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>