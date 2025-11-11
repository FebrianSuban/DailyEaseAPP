# DailyEase

A modern, lightweight productivity mobile app built with React Native (Expo) that helps users manage their daily life through task management, habit tracking, and progress statistics.

## Features

### 🎯 Core Features
- **To-Do List**: Add, edit, complete, and delete daily tasks with priority levels (low, medium, high)
- **Habit Tracker**: Track daily habits with visual progress indicators and streak counting
- **Statistics Dashboard**: View your productivity metrics including task completion rates, weekly habit completions, and current streaks
- **Dark & Light Mode**: Automatic theme switching based on system preference, with manual override options
- **User Authentication**: Secure email/password authentication using Supabase
- **Cloud Sync**: All data automatically synced across devices via Supabase database

### ✨ UI/UX Highlights
- Clean, modern interface with smooth transitions
- Bottom tab navigation for easy access to all features
- Color-coded priority levels and custom habit colors
- Weekly progress visualization for habits
- Real-time statistics and insights

## Tech Stack

- **Framework**: React Native (Expo SDK 54)
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React Native
- **Styling**: React Native StyleSheet API

## Getting Started

### Prerequisites
- Node.js 18+
- Expo Go app (for testing on physical devices)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Environment variables are pre-configured in `.env`

3. Start the development server:
```bash
npm run dev
```

4. Open the app:
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Press `w` to open in web browser

## Project Structure

```
├── app/
│   ├── (tabs)/           # Tab-based navigation screens
│   │   ├── index.tsx     # Home (Tasks) screen
│   │   ├── habits.tsx    # Habits screen
│   │   ├── stats.tsx     # Statistics screen
│   │   └── settings.tsx  # Settings screen
│   ├── auth/             # Authentication screens
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   └── _layout.tsx       # Root layout with auth routing
├── components/           # Reusable UI components
│   ├── TaskCard.tsx
│   ├── HabitCard.tsx
│   └── AddButton.tsx
├── store/               # Zustand state management
│   ├── useAuthStore.ts
│   ├── useTaskStore.ts
│   ├── useHabitStore.ts
│   └── useSettingsStore.ts
├── lib/
│   └── supabase.ts      # Supabase client configuration
├── types/               # TypeScript type definitions
├── constants/           # App constants (colors, etc.)
└── hooks/              # Custom React hooks
```

## Database Schema

### Tables
- **tasks**: User's daily tasks with priority, completion status, and optional reminders
- **habits**: Habit definitions with custom colors and target frequencies
- **habit_logs**: Daily habit completion records
- **user_settings**: User preferences including theme and username

All tables are protected with Row Level Security (RLS) policies ensuring users can only access their own data.

## Usage

### Creating Tasks
1. Navigate to the Home tab
2. Tap the + button
3. Enter task details and select priority
4. Tap "Add Task"

### Tracking Habits
1. Navigate to the Habits tab
2. Tap the + button
3. Enter habit name and choose a color
4. Mark habits as completed daily

### Viewing Stats
Navigate to the Stats tab to see:
- Task completion rate
- Weekly habit completions
- Current streak
- Overall summary

### Customizing Settings
1. Navigate to the Settings tab
2. Choose your preferred theme (Light, Dark, or Auto)
3. View account information
4. Sign out when needed

## Development

### Type Checking
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

### Building for Production
```bash
npm run build:web
```

## License

This project is created for demonstration purposes.
