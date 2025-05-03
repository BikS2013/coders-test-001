# Blazor WebAssembly Dashboard

A Blazor WebAssembly implementation of the Chatbot Ratings Dashboard.

## Features

- Interactive dashboard with collapsible sidebar
- User selection with dropdown and expandable options
- Time period selection with date range pickers
- Rating categories selection
- Expandable Rating Summary boxes with detailed statistics and charts
- Dark theme toggle
- Resizable sidebar
- Fully typed with C#
- Styled with Tailwind CSS

## Getting Started

### Prerequisites

- .NET 9.0 SDK or later
- A modern web browser

### Running the Application

1. Clone the repository
2. Navigate to the BlazorDashboard directory
3. Run the application:

```bash
dotnet run
```

This will start the app at http://localhost:5143 (or another available port)

### Building for Production

To build the app for production:

```bash
dotnet publish -c Release
```

The build output will be in the `bin/Release/net9.0/publish` directory.

## Technologies Used

- Blazor WebAssembly
- .NET 9.0
- Tailwind CSS (via CDN)
- Blazorise for UI components
- Font Awesome for icons

## Project Structure

- `Components/` - Contains the Dashboard component
- `Models/` - Contains data models
- `Services/` - Contains services for data and theme management
- `Shared/` - Contains shared layout components
- `wwwroot/` - Contains static assets

## Key Features

### Collapsible Sidebar
The sidebar can be collapsed to show only icons, providing more space for the dashboard content.

### Dark Mode
The dashboard supports both light and dark modes, with a toggle button in the sidebar.

### Expandable Rating Summary
Click on any rating category box to see detailed statistics and trends for that category.

### Interactive Charts
The dashboard includes interactive charts for visualizing rating data over time.
