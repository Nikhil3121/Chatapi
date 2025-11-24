# myChatify Frontend - AI Coding Agent Instructions

## Architecture Overview

**myChatify** is a real-time chat application built with React + Vite, styled with Tailwind CSS and DaisyUI. The frontend implements a two-panel layout (contacts list + chat view) with WebSocket-powered real-time messaging.

### Key Architectural Patterns

1. **State Management**: Zustand stores (`src/store/`) - single source of truth for auth and chat data
   - `useAuthStore`: Authentication state, user session, and Socket.IO connection management
   - `useChatStore`: Chat history, contacts, messages, and UI state (active tab, selected user)

2. **Real-time Communication**: Socket.IO connected via `useAuthStore` 
   - Socket initialized after auth success
   - Server emits `getOnlineUsers` event; client listens in `connectSocket()`
   - Chat store subscribes to `newMessage` events in `subscribeToMessages()`

3. **API Communication**: Axios instance with credentials (`src/lib/axios.js`)
   - Development: `http://localhost:3000/api`
   - Production: `/api` (relative path)
   - Base URL for Socket.IO: `http://localhost:3000` (dev) or `/` (prod)

4. **Optimistic UI Updates**: `sendMessage()` adds message to UI before server response
   - Implements optimistic updates for responsive UX
   - Falls back to previous state on error

## Component Organization

- **Pages** (`src/pages/`): Route-level components (ChatPage, LoginPage, SignUpPage)
- **Components** (`src/components/`): Reusable UI elements with clear separation
  - Container components: `ChatContainer`, `ContactList`, `ChatsList`
  - UI components: `MessageInput`, `ChatHeader`, `ProfileHeader`
  - Loading/Empty states: `MessagesLoadingSkeleton`, `NoChatHistoryPlaceholder`
- **Hooks** (`src/hooks/`): Custom hooks like `useKeyboardSound` for audio effects

## Critical Workflows

### Development
```bash
npm run dev          # Start Vite dev server with HMR
npm run lint         # Run ESLint
npm run build        # Production build
npm run preview      # Preview production build
```

### Environment Variables
- Development: Backend at `http://localhost:3000`
- Production: Backend at relative path `/api`
- Configured in `vite.config.js` via `import.meta.env.MODE`

## Project-Specific Conventions

1. **Styling**: Tailwind CSS with DaisyUI components
   - No CSS files for component styles; use className directly
   - Gradient patterns: `bg-gradient-to-r from-cyan-500 to-cyan-600`
   - Glass-morphism: `bg-slate-800/50 backdrop-blur-sm`
   - Color scheme: slate-900 (dark bg), cyan/pink accents

2. **Toast Notifications**: `react-hot-toast` for user feedback
   - Always show on success, error, and validation failures
   - Example: `toast.error(error.response.data.message)`

3. **Loading States**
   - Store flags: `isCheckingAuth`, `isLoggingIn`, `isSigningUp`, `isUsersLoading`, `isMessagesLoading`
   - Show `<PageLoader />` during app initialization
   - Use skeleton components for content loading

4. **Sound Effects**
   - `useKeyboardSound()` hook plays random keystroke sounds
   - Controlled via `isSoundEnabled` toggle (persisted in localStorage)
   - Audio file: `public/sounds/notification.mp3`

5. **Image Handling**
   - Messages support image attachments
   - Preview: base64 DataURL before sending
   - FileReader API for client-side encoding

## Authentication Flow

1. App mounts → `checkAuth()` (verifies session via `/auth/check`)
2. Success → Set `authUser`, connect Socket.IO
3. Redirects: unauthenticated → login, authenticated → chat
4. Logout → Disconnect Socket.IO, clear auth state

## Message Flow

1. User selects contact → `setSelectedUser()` + `getMessagesByUserId()`
2. Subscribes to socket: `subscribeToMessages()` (on ContactList click)
3. Sends message → Optimistic update → API call → Server response
4. Incoming messages → Socket listener updates store → UI re-renders

## ESLint Configuration

- Unused variables allowed if uppercase (constants)
- React Hooks warnings enabled
- React Refresh plugin configured for Vite

## Key Files Reference

- **Entry**: `src/main.jsx` (React DOM root)
- **Store**: `src/store/useAuthStore.js`, `src/store/useChatStore.js`
- **API**: `src/lib/axios.js`
- **Auth/UI Routes**: `src/App.jsx` (route guards)
- **Main Chat UI**: `src/pages/ChatPage.jsx`
