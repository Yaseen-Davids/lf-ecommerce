# LittleFish Advanced Frontend Technical Assessment

## Project Overview

This project is an advanced single-page e-commerce product display application built with React, TypeScript, Redux for state management, and Redux Query for API calls. It showcases a comprehensive e-commerce experience with performance optimization, advanced features, and adherence to accessibility standards.

## Tech Stack

- React
- TypeScript
- Vite
- Material-UI (MUI)
- Redux & Redux Toolkit
- Redux Query
- Jest & React Testing Library

## API Integration

This project utilizes the [DummyJSON API](https://dummyjson.com/) to fetch product data. DummyJSON provides a fake REST API for testing and prototyping, offering endpoints for various e-commerce related data including products, categories, and user information.

Key endpoints used:
- `/products`: Fetch all products
- `/products/categories`: Get product categories
- `/products/search`: Search products

For detailed API documentation, visit [DummyJSON Documentation](https://dummyjson.com/docs).

## Setup and Installation

```
git clone
cd lf-ecommerce
npm install
npm run dev
```
Open your browser and visit `http://localhost:5173` to view the application.

## Running Tests

To run the test suite:
```
npm test
```
## Building for Production

To create a production build:
```
npm run build
```
## Architectural Choices

Key components of the app include:

**Product Carousel**: A reusable component on the home page that dynamically fetches and displays products from the API based on their category.

**Product**: A reusable UI component within the carousel that is also used on the search page. The product card is designed for adaptability, displaying product information in a consistent and user-friendly manner.

Both the Product Carousel and Product Card components are central to the app's UI, demonstrating the emphasis on reusability and modular design.

## Approach to Core Requirements

1. **Complex State Management**: Implemented Redux store with slices for different features, utilizing Redux Toolkit for efficient boilerplate reduction. Implemented React Context API for Modal state (example use of Context API).
2. **Performance Optimization**: Created components for lazy loading using Material UI "Skeleton" component and React.memo for component memoization.
3. **Advanced API Integration**: Utilized Redux Query for efficient data fetching and caching, implementing pagination and filtering.
4. **Testing**: Wrote unit and integration tests using Jest and React Testing Library.
5. **Accessibility Compliance**: Ensured proper semantic HTML structure and ARIA attributes for screen reader compatibility.
6. **Complex Design Implementation**: Utilized MUI's Grid and Flexbox for responsive layouts, with custom animations for enhanced UX.
7. **Architectural Design**: Structured the project with a modular architecture, separating concerns into features, components, and utilities.

## Challenges Faced

- Implementing accessible design without compromising on visual appeal