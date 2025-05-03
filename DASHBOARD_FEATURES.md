# Dashboard Features Documentation

This document provides detailed information about the features available in the dashboard application.

## Dashboard Overview

The dashboard provides a comprehensive view of chatbot ratings data with interactive components for filtering and analyzing the data. It's designed to be user-friendly while providing powerful data visualization capabilities.

## Key Features

### 1. Collapsible Sidebar

- Toggle between expanded and collapsed states
- When collapsed, shows icons for quick access to sections
- When expanded, shows full controls for filtering data
- Resizable width in expanded state

### 2. User Selection

- Select individual users or all users
- Dropdown menu for quick selection
- Expandable view for selecting multiple users
- Real-time filtering of dashboard data based on selection

### 3. Time Period Selection

- Predefined time periods (Last Day, Last Week, Last Month, etc.)
- Custom date range selection with calendar pickers
- Date format validation
- Real-time updating of charts based on selected time period

### 4. Rating Categories

- Filter by different rating categories
- Select multiple categories simultaneously
- Categories include:
  - All Ratings (-10 to 10)
  - Positive (1 to 10)
  - Negative (-10 to -1)
  - Neutral (-3 to +3)
  - Heavily Positive (7 to 10)
  - Heavily Negative (-10 to -7)
  - Mild Positive (1 to 6)
  - Mild Negative (-6 to -1)

### 5. Chart Visualization

- Bar chart showing distribution of ratings over time
- Stacked view to see proportions of different rating categories
- Color-coded for easy identification of rating types
- Responsive design that adapts to different screen sizes

### 6. Rating Summary Boxes

The Rating Summary section provides a quick overview of the total counts for each rating category.

#### Expandable Detail View

Each Rating Summary box is clickable and can be expanded to show detailed information:

- **Interaction**: Click on any rating category box to expand/collapse its detailed view
- **Visual Feedback**: 
  - Selected boxes are highlighted with a colored ring
  - Text changes from "Click to expand" to "Click to collapse"
  - Smooth transition animations

#### Detailed Statistics

When expanded, each rating category shows:

- **Total Count**: Sum of all ratings in the category
- **Average**: Average rating value across the selected time period
- **Highest Value**: Maximum rating value and the date it occurred
- **Lowest Value**: Minimum rating value and the date it occurred

#### Trend Analysis

- **Line Chart**: Shows the trend of the specific rating category over time
- **Interactive**: Hover over data points to see specific values
- **Visual Consistency**: Uses the same color scheme as the main dashboard

### 7. Theme Toggle

- Switch between light and dark themes
- Persistent preference saved in local storage
- Optimized color schemes for both themes

## Implementation Details

### React Version

The React implementation uses:
- React hooks for state management
- Recharts for data visualization
- Tailwind CSS for styling
- TypeScript for type safety

### Vue Version

The Vue implementation uses:
- Vue 3 Composition API with `<script setup>`
- ECharts for data visualization
- Tailwind CSS for styling
- TypeScript for type safety

## Usage Tips

1. **For quick overview**: Use the Rating Summary boxes to see totals at a glance
2. **For detailed analysis**: Click on any Rating Summary box to expand and see detailed statistics and trends
3. **For comparing categories**: Expand multiple Rating Summary boxes to compare trends across different rating categories
4. **For specific time periods**: Use the Time Period selector to focus on specific date ranges
5. **For user-specific data**: Filter by specific users to analyze individual performance

## Future Enhancements

Planned future enhancements include:
- Export functionality for charts and data
- Additional chart types (pie charts, heat maps)
- Comparative analysis between time periods
- User-defined custom categories
- Saved filter presets
