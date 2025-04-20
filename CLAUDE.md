# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks
- `npm run typecheck` - Verify TypeScript types
- `npm run test` - Run tests with Vitest

## Code Style Guidelines
- **Framework**: React with TypeScript, Tailwind CSS
- **Imports**: Group imports by external libraries, then internal modules
- **State Management**: React hooks and context
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Error Handling**: Prefer try/catch with descriptive error messages
- **Components**: Functional components with typed props
- **Formatting**: Use consistent indentation (2 spaces) and formatting
- **Types**: Define explicit types for props, state and functions
- **Conventions**: Use Tailwind utility classes for styling
- **Charts**: Use Recharts for data visualization