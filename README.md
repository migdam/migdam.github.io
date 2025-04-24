# M-Infinity Website with Client-Side Component Loading

This project uses a client-side component loading approach for the M-Infinity website. Each section of the website is stored in a separate HTML file and loaded dynamically using JavaScript.

## File Structure

- `index.html` - The main HTML file that loads all components
- `includes/` - Directory containing all component HTML files:
  - `head.html` - Contains all the head section content (not currently used)
  - `header.html` - Contains the navigation header
  - `hero.html` - Contains the hero/banner section
  - `about.html` - Contains the about section
  - `services.html` - Contains the services section
  - `projects.html` - Contains the projects gallery section
  - `contact.html` - Contains the contact form section
  - `footer.html` - Contains the footer section
  - `ui-elements.html` - Contains UI elements like scroll button and cookie consent
  - `scripts.html` - Contains all JavaScript code

## How It Works

The approach is straightforward:

1. The main `index.html` file contains placeholder `div` elements for each component
2. When the DOM is ready, JavaScript fetches each component HTML file
3. The HTML content is inserted into the corresponding placeholder
4. This happens client-side, so it works perfectly on GitHub Pages

## Benefits

- **Maintainability**: Each section is in its own file, making it easier to update
- **File Size**: Individual files are smaller and more manageable (under 600 lines)
- **GitHub Pages Compatible**: Works without requiring any server-side code
- **Performance**: Uses fetch API to load components asynchronously

## Customization

To customize the website:
1. Edit the individual component files in the `includes/` directory
2. The changes will automatically appear when the page is loaded

## Loading Process

The components are loaded using the `includeHTML` function defined in the main index.html file. This function:

1. Fetches the HTML content from the specified file
2. Inserts it into the target container element
3. Handles any errors that occur during loading

## JavaScript Functionality

All JavaScript functionality is contained in `scripts.html` and includes:
- Mobile menu toggle
- Scroll-to-top button
- Project tabs functionality
- Cookie consent management
- Contact form validation
- Smooth scrolling for internal links

This structure is ideal for GitHub Pages hosting and keeps the codebase clean and maintainable while ensuring the website loads efficiently.
