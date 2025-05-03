# Dashboard App

A multi-framework dashboard application for visualizing chatbot ratings data.

## Implementations

- **React**: TypeScript and Tailwind CSS implementation
- **Blazor WebAssembly**: .NET 9.0 implementation with Chart.js

## Features

- Interactive dashboard with collapsible sidebar
- User selection with dropdown and expandable options
- Time period selection with date range pickers
- Rating categories selection
- Expandable Rating Summary boxes with detailed statistics and charts
- Responsive charts using Recharts
- Fully typed with TypeScript
- Styled with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn
```

### Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the app at http://localhost:5173

### Building for Production

To build the app for production:

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## Technologies Used

### React Implementation
- React 18
- TypeScript
- Vite
- Tailwind CSS (via CDN)
- Recharts for data visualization
- Lucide React for icons

### Blazor WebAssembly Implementation
- .NET 9.0
- Blazor WebAssembly
- Tailwind CSS (via CDN)
- Chart.js for data visualization
- Font Awesome for icons
- JavaScript Interop for Chart.js integration

## Running the Blazor Implementation

### Prerequisites
- .NET 9.0 SDK or later
- A modern web browser

### Running the Application
1. Navigate to the BlazorDashboard directory
2. Run the application:

```bash
cd BlazorDashboard
dotnet run
```

This will start the app at http://localhost:5143 (or another available port)

### Building for Production
To build the app for production:

```bash
cd BlazorDashboard
dotnet publish -c Release
```

The build output will be in the `bin/Release/net9.0/publish` directory.
