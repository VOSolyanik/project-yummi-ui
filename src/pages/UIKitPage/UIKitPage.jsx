import React, { useState } from 'react';

import css from './UIKitPage.module.css';

import Button from '../../components/Button/Button';
import CheckBox from '../../components/CheckBox/CheckBox';
import Icon from '../../components/Icon/Icon';

const UIKitPage = () => {
  const [checkboxStates, setCheckboxStates] = useState({
    checkbox1: false,
    checkbox2: true,
    checkbox3: false
  });

  const handleCheckboxChange = name => {
    setCheckboxStates(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <div className={css.uiKit}>
      <div className="container">
        <h1 className={css.title}>UI Kit Components</h1>

        {/* Colors Section */}
        <section className={css.section}>
          <h2 className={css.sectionTitle}>Colors</h2>
          <div className={css.colorGrid}>
            <div className={css.colorSample}>
              <div className={css.colorBox} style={{ backgroundColor: '#050505' }}></div>
              <span>Black (#050505)</span>
            </div>
            <div className={css.colorSample}>
              <div className={css.colorBox} style={{ backgroundColor: '#1A1A1A' }}></div>
              <span>Charcoal (#1A1A1A)</span>
            </div>

            <div className={css.colorSample}>
              <div className={css.colorBox} style={{ backgroundColor: '#BFBFBF' }}></div>
              <span>Gray (#BFBFBF)</span>
            </div>

            <div className={css.colorSample}>
              <div className={css.colorBox} style={{ backgroundColor: '#E8E8E8', border: '1px solid #BFBFBF' }}></div>
              <span>Light Gray (#E8E8E8)</span>
            </div>
            <div className={css.colorSample}>
              <div className={css.colorBox} style={{ backgroundColor: '#FFFFFF', border: '1px solid #BFBFBF' }}></div>
              <span>White (#FFFFFF)</span>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className={css.section}>
          <h2 className={css.sectionTitle}>Typography</h2>
          <div className={css.typographyGrid}>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <p>Regular paragraph text with normal weight</p>
            <p className={css.mediumText}>Medium weight text</p>
            <p className={css.boldText}>Bold weight text</p>
            <small>Small text for captions and notes</small>
          </div>
        </section>

        {/* Buttons Section */}
        <section className={css.section}>
          <h2 className={css.sectionTitle}>Buttons</h2>

          <h3 className={css.subsectionTitle}>Primary Buttons</h3>
          <div className={css.buttonGrid}>
            <Button variant="primary" size="large">
              Large Primary
            </Button>
            <Button variant="primary" size="medium">
              Medium Primary
            </Button>
            <Button variant="primary" size="medium" disabled>
              Disabled Primary
            </Button>
          </div>

          <h3 className={css.subsectionTitle}>Outline Buttons</h3>
          <div className={css.buttonGrid}>
            <Button variant="outline" size="large">
              Large Outline
            </Button>
            <Button variant="outline" size="medium">
              Medium Outline
            </Button>
            <Button variant="outline" size="medium" disabled>
              Disabled Outline
            </Button>
          </div>

          <h3 className={css.subsectionTitle}>Buttons with Icons</h3>
          <div className={css.buttonGrid}>
            <Button variant="primary" size="medium">
              <Icon name="plus" />
              Add Recipe
            </Button>
            <Button variant="outline" size="medium">
              <Icon name="heart" />
              Favorite
            </Button>
            <Button variant="primary" size="medium">
              Dropdown
              <Icon name="arrow-down" />
            </Button>
          </div>

          <h3 className={css.subsectionTitle}>Icon Only Buttons</h3>
          <div className={css.buttonGrid}>
            <Button variant="primary" size="large">
              <Icon name="plus" />
            </Button>
            <Button variant="primary" size="medium">
              <Icon name="plus" size={18} />
            </Button>
            <Button variant="outline" size="large">
              <Icon name="trash" />
            </Button>
            <Button variant="outline" size="medium">
              <Icon name="heart" size={18} />
            </Button>
          </div>
        </section>

        {/* Icons Section */}
        <section className={css.section}>
          <h2 className={css.sectionTitle}>Icons</h2>
          <div className={css.iconGrid}>
            <div className={css.iconSample}>
              <Icon name="plus" size={24} />
              <span>plus</span>
            </div>
            <div className={css.iconSample}>
              <Icon name="minus" size={24} />
              <span>minus</span>
            </div>
            <div className={css.iconSample}>
              <Icon name="close" size={24} />
              <span>close</span>
            </div>
            <div className={css.iconSample}>
              <Icon name="menu" size={24} />
              <span>menu</span>
            </div>
            <div className={css.iconSample}>
              <Icon name="arrow-down" size={24} />
              <span>arrow-down</span>
            </div>
            <div className={css.iconSample}>
              <Icon name="arrow-up-right" size={24} />
              <span>arrow-up-right</span>
            </div>
            <div className={css.iconSample}>
              <Icon name="heart" size={24} />
              <span>heart</span>
            </div>
            <div className={css.iconSample}>
              <Icon name="trash" size={24} />
              <span>trash</span>
            </div>
            <div className={css.iconSample}>
              <Icon name="eye" size={24} />
              <span>eye</span>
            </div>
            <div className={css.iconSample}>
              <Icon name="eye-off" size={24} />
              <span>eye-off</span>
            </div>
          </div>

          <h3 className={css.subsectionTitle}>Social Icons</h3>
          <div className={css.iconGrid}>
            <div className={css.iconSample}>
              <Icon name="facebook" size={24} />
              <span>facebook</span>
            </div>
            <div className={css.iconSample}>
              <Icon name="instagram" size={24} />
              <span>instagram</span>
            </div>
            <div className={css.iconSample}>
              <Icon name="youtube" size={24} />
              <span>youtube</span>
            </div>
          </div>
        </section>

        {/* Checkboxes Section */}
        <section className={css.section}>
          <h2 className={css.sectionTitle}>Checkboxes</h2>
          <div className={css.checkboxGrid}>
            <CheckBox
              id="checkbox1"
              name="checkbox1"
              checked={checkboxStates.checkbox1}
              onChange={() => handleCheckboxChange('checkbox1')}
              label="Unchecked checkbox"
            />
            <CheckBox
              id="checkbox2"
              name="checkbox2"
              checked={checkboxStates.checkbox2}
              onChange={() => handleCheckboxChange('checkbox2')}
              label="Checked checkbox"
            />
            <CheckBox
              id="checkbox3"
              name="checkbox3"
              checked={checkboxStates.checkbox3}
              onChange={() => handleCheckboxChange('checkbox3')}
              label="Disabled checkbox"
              disabled
            />
            <CheckBox
              id="checkbox4"
              name="checkbox4"
              checked={false}
              onChange={() => {}}
              label="Error checkbox"
              error
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UIKitPage;
