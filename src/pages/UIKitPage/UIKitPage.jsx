import React, { useState } from 'react';

import css from './UIKitPage.module.css';

import Button from '@components/Button/Button';
import CheckBox from '@components/CheckBox/CheckBox';
import CustomDropdown from '@components/CustomDropdown/CustomDropdown';
import Icon from '@components/Icon/Icon';
import Loader from '@components/Loader/Loader';
import MainTitle from '@components/MainTitle/MainTitle';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import RecipeCardSkeleton from '@components/RecipeCardSkeleton/RecipeCardSkeleton';
import RecipePagination from '@components/RecipePagination/RecipePagination';
import RecipesPreview from '@components/RecipesPreview/RecipesPreview';
import Subtitle from '@components/Subtitle/Subtitle';
import Tabs from '@components/Tabs/Tabs';

const UIKitPage = () => {
  const [checkboxStates, setCheckboxStates] = useState({
    checkbox1: false,
    checkbox2: true,
    checkbox3: false
  });

  const [dropdownValue, setDropdownValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const dropdownOptions = [
    { value: '', label: 'Select an option' },
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  const mockRecipe = {
    id: '1',
    title: 'Delicious Pasta Recipe',
    description: 'A mouth-watering pasta dish with fresh ingredients and aromatic herbs.',
    thumb: '/src/assets/images/no-image.png',
    owner: {
      id: '1',
      name: 'John',
      avatar: '/src/assets/images/no-avatar.webp'
    },
    time: '30',
    difficulty: 'Medium',
    isFavorite: false
  };

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

        {/* Typography Components Section */}
        <section className={css.section}>
          <h2 className={css.sectionTitle}>Typography Components</h2>

          <h3 className={css.subsectionTitle}>Main Title</h3>
          <div className={css.componentDemo}>
            <MainTitle level={1}>Heading Level 1</MainTitle>
            <MainTitle level={2}>Heading Level 2</MainTitle>
            <MainTitle level={3}>Heading Level 3</MainTitle>
            <MainTitle level={4}>Heading Level 4</MainTitle>
          </div>

          <h3 className={css.subsectionTitle}>Subtitle</h3>
          <div className={css.componentDemo}>
            <Subtitle>This is a subtitle component for secondary text</Subtitle>
            <Subtitle className={css.customSubtitle}>Subtitle with custom styling</Subtitle>
          </div>
        </section>

        {/* Form Components Section */}
        <section className={css.section}>
          <h2 className={css.sectionTitle}>Form Components</h2>

          <h3 className={css.subsectionTitle}>Custom Dropdown</h3>
          <div className={css.componentDemo}>
            <CustomDropdown
              options={dropdownOptions}
              value={dropdownValue}
              onChange={setDropdownValue}
              placeholder="Choose an option"
            />
            <CustomDropdown
              options={dropdownOptions}
              value=""
              onChange={() => {}}
              placeholder="Disabled dropdown"
              disabled
            />
          </div>
        </section>

        {/* Navigation Components Section */}
        <section className={css.section}>
          <h2 className={css.sectionTitle}>Navigation Components</h2>

          <h3 className={css.subsectionTitle}>Tabs</h3>
          <div className={css.componentDemo}>
            <Tabs />
          </div>

          <h3 className={css.subsectionTitle}>Recipe Pagination</h3>
          <div className={css.componentDemo}>
            <RecipePagination
              currentPage={currentPage}
              totalPages={5}
              onPageChange={setCurrentPage}
              isLoading={false}
              totalRecipes={50}
            />
            <div style={{ marginTop: '20px' }}>
              <RecipePagination
                currentPage={3}
                totalPages={10}
                onPageChange={() => {}}
                isLoading={true}
                totalRecipes={100}
              />
            </div>
          </div>
        </section>

        {/* Content Components Section */}
        <section className={css.section}>
          <h2 className={css.sectionTitle}>Content Components</h2>

          <h3 className={css.subsectionTitle}>Recipe Card</h3>
          <div className={css.componentDemo}>
            <div style={{ maxWidth: '300px' }}>
              <RecipeCard
                recipe={mockRecipe}
                onRecipeClick={() => console.log('Recipe clicked')}
                onAuthorClick={() => console.log('Author clicked')}
              />
            </div>
          </div>

          <h3 className={css.subsectionTitle}>Recipe Card Skeleton</h3>
          <div className={css.componentDemo}>
            <div style={{ maxWidth: '300px' }}>
              <RecipeCardSkeleton />
            </div>
          </div>

          <h3 className={css.subsectionTitle}>Recipes Preview</h3>
          <div className={css.componentDemo}>
            <div style={{ maxWidth: '400px' }}>
              <RecipesPreview
                title="Delicious Pasta Recipe"
                description="A mouth-watering pasta dish with fresh ingredients and aromatic herbs that will delight your taste buds."
                image="/src/assets/images/no-image.png"
                onOpen={() => console.log('Open recipe')}
                onDelete={() => console.log('Delete recipe')}
              />
            </div>
          </div>
        </section>

        {/* Utility Components Section */}
        <section className={css.section}>
          <h2 className={css.sectionTitle}>Utility Components</h2>

          <h3 className={css.subsectionTitle}>Loader</h3>
          <div className={css.componentDemo}>
            <Loader />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UIKitPage;
