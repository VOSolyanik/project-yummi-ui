import React, { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { Autoplay, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/a11y';

import css from './Testimonials.module.css';

import Icon from '@components/Icon/Icon';
import MainTitle from '@components/MainTitle/MainTitle';
import Subtitle from '@components/Subtitle/Subtitle';

import { testimonialsAPI } from '../../services/testimonialsApi.js';

const Testimonials = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await testimonialsAPI.getTestimonials();
        if (!mounted) return;
        setItems(res.data.items || []);
      } catch (error) {
        toast.error(error?.message || 'Failed to load testimonials');
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className={css.testimonials} aria-labelledby="testimonials-heading">
      <div className={css.container}>
        <Subtitle className={css.subtitle}>What our customers say</Subtitle>
        <MainTitle level={2} id="testimonials-heading" className={css.title}>
          Testimonials
        </MainTitle>

        {items.length === 0 ? (
          <div className={css.empty}>No testimonials yet.</div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination, A11y]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            a11y={{ enabled: true }}
            spaceBetween={20}
            slidesPerView={1}
            watchSlidesProgress={true}
            className={css.slider}
          >
            {items.map(item => (
              <SwiperSlide key={item.id}>
                <article className={css.slide} role="group" aria-roledescription="slide">
                  <Icon name="quote-sign" className={css.quoteIcon} size={48} />
                  <p className={css.quote}>{item.text}</p>
                  <p className={css.author}>{(item.author || '').toUpperCase()}</p>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
