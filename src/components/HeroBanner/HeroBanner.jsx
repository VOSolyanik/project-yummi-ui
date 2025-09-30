import React from 'react';

import css from './HeroBanner.module.css';

import Button from '@components/Button/Button';

import bigDesktop from '@assets/images/hero/big-desktop.webp';
import bigDesktop2x from '@assets/images/hero/big-desktop@2x.webp';
import bigMobile from '@assets/images/hero/big-mobile.webp';
import bigMobile2x from '@assets/images/hero/big-mobile@2x.webp';
import bigTablet from '@assets/images/hero/big-tablet.webp';
import bigTablet2x from '@assets/images/hero/big-tablet@2x.webp';
import smallDesktop from '@assets/images/hero/small-desktop.webp';
import smallDesktop2x from '@assets/images/hero/small-desktop@2x.webp';
import smallMobile from '@assets/images/hero/small-mobile.webp';
import smallMobile2x from '@assets/images/hero/small-mobile@2x.webp';
import smallTablet from '@assets/images/hero/small-tablet.webp';
import smallTablet2x from '@assets/images/hero/small-tablet@2x.webp';

const HeroBanner = () => {
  return (
    <section className={css.heroWrapper}>
      <div className={css.hero}>
        <h1 className={css.heading}>Improve Your Culinary Talents</h1>
        <p className={css.subheading}>
          Amazing recipes for beginners in the world of cooking.
          Enveloping you in the aromas and tastes of various cuisines.
        </p>
        <Button
          className={css.heroButton}
          onClick={() => {
            // TODO: Implement the functionality for adding a recipe (Guest/Logged in User)
          }}
        >
          Add Recipe
        </Button>
        <div className={css.mediaWrap}>
          <picture className={`picture ${css.smallImage}`}>
            <source srcSet={`${smallDesktop} 1x, ${smallDesktop2x} 2x`} media="(min-width: 1152px)" type="image/webp" />
            <source srcSet={`${smallTablet} 1x, ${smallTablet2x} 2x`} media="(min-width: 768px)" type="image/webp" />
            <source srcSet={`${smallMobile} 1x, ${smallMobile2x} 2x`} media="(max-width: 767px)" type="image/webp" />
            <img src={smallMobile} alt="Hero secondary image" loading="eager" className="image" />
          </picture>

          <picture className={`picture ${css.bigImage}`}>
            <source srcSet={`${bigDesktop} 1x, ${bigDesktop2x} 2x`} media="(min-width: 1152px)" type="image/webp" />
            <source srcSet={`${bigTablet} 1x, ${bigTablet2x} 2x`} media="(min-width: 768px)" type="image/webp" />
            <source srcSet={`${bigMobile} 1x, ${bigMobile2x} 2x`} media="(max-width: 767px)" type="image/webp" />
            <img src={bigMobile} alt="Hero main image" loading="eager" className="image" />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
