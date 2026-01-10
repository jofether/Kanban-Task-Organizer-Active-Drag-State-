# Kanban Task Organizer - Active Drag State

A React + Vite application demonstrating an interactive Kanban board with an active drag state visualization.

## Features

- **Interactive Drag Visualization**: Displays a card being dragged with visual feedback including:
  - Rotated card with scale transformation
  - Large shadow effect for depth
  - Ghost placeholder in the original position
  - Floating overlay with blue border

- **Task Management**: Display tasks with:
  - Custom color-coded tags (Bug, Design, QA)
  - Task titles and metadata
  - Assignee information and due dates

- **Modern UI**: Built with Tailwind CSS for a clean, professional appearance

## Project Structure

```
├── src/
│   ├── App.jsx          # Main Kanban component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── postcss.config.js    # PostCSS configuration
```

## Getting Started

### Installation

Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Technologies Used

- **React 18**: UI library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS transformation

## Key Implementation Details

### Drag State Visualization

The dragged card uses:
- `absolute` positioning to overlay on top of the Kanban column
- `transform: rotate-3 scale-105` for visual transformation
- `shadow-2xl` for enhanced depth perception
- `border-blue-500` to highlight the active drag state
- `pointer-events: none` to prevent interaction while dragging

### Ghost Placeholder

A dashed border placeholder remains in the original position to show where the card will return if dropped.

## Notes

- The `absolute` positioning on the dragged card is critical; removing it breaks the layout
- The `pointer-events: none` style ensures smooth drag interactions
