# FPL AI Manager Project: Epics and Tickets with Specified Technologies

## EPIC 1: User Interface Development

**Goal**: Create a complete UI for the finished product, so all subsequent work is backend integration.

### Ticket 1.1: Set up Next.js project with shadcn UI

**Background**: We need a modern, component-based UI foundation for the application.
**Acceptance Criteria**:

- Initialize Next.js 14 project with TypeScript and App Router
- Install and configure shadcn/ui component library
- Set up Tailwind CSS with custom theme
- Create responsive layout with navigation sidebar
- Configure basic project structure with pages, components, and hooks folders

**Tech Choices**: Next.js 14, TypeScript, shadcn/ui, Tailwind CSS

### Ticket 1.2: Implement Clerk authentication

**Background**: Users need secure authentication to access their FPL data.
**Acceptance Criteria**:

- Install and configure Clerk SDK
- Create login/signup page with Clerk components
- Implement protected routes with authentication checks
- Add user profile page showing Clerk user data
- Create middleware for route protection

**Tech Choices**: Clerk, Next.js middleware

### Ticket 1.3: Develop team visualization and dashboard UI

**Background**: The main dashboard needs to display the user's team and key metrics.
**Acceptance Criteria**:

- Create football pitch visualization with player positions
- Build player cards with stats, form, and fixtures
- Implement fixture difficulty visualizer for upcoming 5 gameweeks
- Add team budget, value, and transfer status displays
- Create chip status indicators

**Tech Choices**: shadcn/ui components, Tailwind CSS, React state for mock data

### Ticket 1.4: Build recommendation and strategy UI components

**Background**: The app needs to display AI recommendations and explanations.
**Acceptance Criteria**:

- Create transfer recommendation cards with player comparisons
- Build captaincy suggestion component with reasoning display
- Implement chip strategy timeline visualization
- Add AI explanation panels with markdown formatting
- Create action buttons for accepting/rejecting recommendations

**Tech Choices**: shadcn/ui dialog and card components, react-markdown

### Ticket 1.5: Implement analysis and competitor screens

**Background**: Users need deeper insights and competitor information.
**Acceptance Criteria**:

- Create mini-league standings table with rival comparisons
- Build price prediction watchlist with status indicators
- Implement performance analytics dashboard with charts
- Add player comparison tool with radar charts
- Create multi-week planning visualization

**Tech Choices**: shadcn/ui tables, recharts for visualization

### Ticket 1.6: Add mock data service and state management

**Background**: The UI needs realistic data before backend integration.
**Acceptance Criteria**:

- Create TypeScript interfaces for all data models
- Implement mock data service with realistic FPL data
- Add React context providers for global state
- Create loading and error states for all components
- Implement Zustand store for client-side state management

**Tech Choices**: TypeScript interfaces, Zustand, SWR for data fetching

## EPIC 2: Backend API and Supabase Setup

**Goal**: Create the backend API and database infrastructure to support the frontend.

### Ticket 2.1: Set up Supabase project and schema

**Background**: We need a database to store FPL data and user preferences.
**Acceptance Criteria**:

- Create new Supabase project
- Define database tables for players, teams, fixtures, and user teams
- Set up RLS (Row Level Security) policies for user data
- Create database indexes for query optimization
- Add initial seed data for testing

**Tech Choices**: Supabase, PostgreSQL

### Ticket 2.2: Implement Prisma ORM and API routes

**Background**: We need an ORM to interact with Supabase and API routes for the frontend.
**Acceptance Criteria**:

- Set up Prisma with Supabase connection
- Create Prisma schema matching Supabase tables
- Implement API routes for all required data endpoints
- Add error handling and response formatting
- Create middleware for authentication checks

**Tech Choices**: Prisma, Next.js API routes

### Ticket 2.3: Implement FPL API client for bootstrap data

**Background**: We need to fetch core FPL data from the official API.
**Acceptance Criteria**:

- Create API client for bootstrap-static endpoint (https://fantasy.premierleague.com/api/bootstrap-static/)
- Implement data transformation to match frontend models
- Add caching mechanism to prevent excessive API calls
- Create Supabase storage functions for fetched data
- Build admin endpoint to manually trigger data refresh

**Tech Choices**: Axios, Supabase storage

### Ticket 2.4: Create user team and preferences integration

**Background**: Users need to connect their FPL accounts and save preferences.
**Acceptance Criteria**:

- Create form for users to input FPL credentials/team ID
- Implement secure storage in Supabase with Clerk user ID as key
- Add API route to fetch user team data from FPL API
- Create preferences schema and storage
- Add verification of FPL account connection

**Tech Choices**: Clerk user management, Supabase secure storage

### Ticket 2.5: Implement additional FPL API endpoints integration

**Background**: We need fixtures, league data, and transfer info.
**Acceptance Criteria**:

- Add API clients for all required FPL endpoints:
  - Fixtures: https://fantasy.premierleague.com/api/fixtures/
  - Entry: https://fantasy.premierleague.com/api/entry/{entry_id}/event/{gw}/picks/
  - History: https://fantasy.premierleague.com/api/entry/{entry_id}/history/
  - League: https://fantasy.premierleague.com/api/leagues-classic/{league_id}/standings/
  - Transfers: https://fantasy.premierleague.com/api/transfers/
- Implement data storage in Supabase
- Create scheduled functions to update data regularly

**Tech Choices**: Supabase Edge Functions for scheduling

## EPIC 3: Decision Engine Implementation

**Goal**: Implement the core algorithms for FPL team management recommendations.

### Ticket 3.1: Implement player evaluation engine

**Background**: We need to evaluate player performance and potential.
**Acceptance Criteria**:

- Create serverless function for player form calculation
- Implement fixture difficulty rating system
- Add injury and suspension detection from news fields
- Create expected points model based on form and fixtures
- Build API endpoint for frontend to fetch player evaluations

**Tech Choices**: Supabase Edge Functions, TypeScript

### Ticket 3.2: Develop transfer recommendation algorithm

**Background**: The system needs to suggest optimal transfers.
**Acceptance Criteria**:

- Create algorithm to identify underperforming players
- Implement replacement player finder within budget constraints
- Add position-specific evaluation metrics
- Create team constraint validation (e.g., max 3 from one team)
- Build API endpoint for frontend transfer recommendations

**Tech Choices**: Supabase Edge Functions, TypeScript for algorithms

### Ticket 3.3: Implement captaincy and lineup optimization

**Background**: Weekly team management requires captain selection and bench ordering.
**Acceptance Criteria**:

- Create captaincy ranking algorithm based on fixture and form
- Implement bench order optimization by expected points
- Add starting lineup optimization
- Create formation recommendation
- Build API endpoint for frontend team management display

**Tech Choices**: TypeScript, Supabase functions

### Ticket 3.4: Create multi-week planning engine

**Background**: Long-term planning is essential for FPL success.
**Acceptance Criteria**:

- Implement fixture analysis for next 5 gameweeks
- Create transfer planning algorithm considering multiple weeks
- Add blank/double gameweek detection
- Implement chip usage planning for optimal timing
- Build API endpoint for frontend planning visualization

**Tech Choices**: TypeScript optimization algorithms, Supabase Edge Functions

### Ticket 3.5: Implement price prediction system

**Background**: Price changes affect team value and transfer timing.
**Acceptance Criteria**:

- Create price change prediction algorithm based on transfer trends
- Implement LiveFPL-style threshold calculation
- Add watchlist functionality for players near price changes
- Create scheduled job to update predictions daily
- Build API endpoint for frontend price change indicators

**Tech Choices**: Supabase scheduled functions, TypeScript

## EPIC 4: AI Integration

**Goal**: Integrate OpenAI for generating natural language explanations of recommendations.

### Ticket 4.1: Set up OpenAI API client

**Background**: We need to connect to OpenAI for generating explanations.
**Acceptance Criteria**:

- Create OpenAI client with secure API key management
- Implement rate limiting and token usage tracking
- Add error handling with fallback explanations
- Create middleware for connecting to decision engine
- Build API endpoint for frontend to request explanations

**Tech Choices**: OpenAI Node.js SDK, Supabase Edge Functions

### Ticket 4.2: Design FPL prompt templates

**Background**: Well-crafted prompts are needed for quality explanations.
**Acceptance Criteria**:

- Create base FPL context template with game rules
- Implement specific templates for transfers, captaincy, and chip decisions
- Add examples of good explanations for few-shot prompting
- Create context formatting functions to optimize token usage
- Build template selection logic based on recommendation type

**Tech Choices**: Template literals, TypeScript

### Ticket 4.3: Create recommendation explanation pipeline

**Background**: Decision data needs to be converted to natural language.
**Acceptance Criteria**:

- Implement pipeline to format recommendation data for prompts
- Create context preparation with team, fixtures, and league position
- Add explanation caching in Supabase to reduce API calls
- Implement markdown formatting for structured explanations
- Build API endpoint for frontend explanation display

**Tech Choices**: Supabase for caching, TypeScript

### Ticket 4.4: Add user preference controls for explanations

**Background**: Users may prefer different explanation styles.
**Acceptance Criteria**:

- Create Supabase table for user explanation preferences
- Implement settings UI for verbosity (concise, detailed)
- Add tone selection (formal, casual, enthusiastic)
- Create focus options (statistical, narrative, strategic)
- Build API endpoint to save and retrieve preferences

**Tech Choices**: Supabase for preference storage, shadcn/ui form components

## EPIC 5: Automation and Real-time Updates

**Goal**: Create systems for automated team management and real-time data updates.

### Ticket 5.1: Implement FPL session management

**Background**: Automated actions require secure FPL authentication.
**Acceptance Criteria**:

- Create secure storage for FPL credentials in Supabase
- Implement FPL login session management
- Add CSRF token handling and cookie management
- Create session refresh logic for long-running operations
- Build API endpoint for testing authentication status

**Tech Choices**: Supabase storage with encryption, Axios for requests

### Ticket 5.2: Create automated action execution

**Background**: The system should be able to perform actions on user's behalf.
**Acceptance Criteria**:

- Implement transfer execution function with FPL API
- Create captain and team selection automation
- Add chip activation functionality
- Implement safety checks before execution
- Build webhook endpoint for confirming completed actions

**Tech Choices**: Supabase Edge Functions, Axios

### Ticket 5.3: Develop scheduled update system

**Background**: Data needs regular updates to stay current.
**Acceptance Criteria**:

- Create Supabase scheduled function for daily data updates
- Implement gameweek deadline detection
- Add price change monitoring scheduled job
- Create logging system for all scheduled operations
- Build admin panel for manual triggers and status checks

**Tech Choices**: Supabase scheduled functions, cron syntax

### Ticket 5.4: Implement real-time notification system

**Background**: Users need timely alerts for important events.
**Acceptance Criteria**:

- Create email notification service using Supabase Auth
- Implement in-app notifications with real-time updates
- Add deadline reminders (24h, 6h, 1h before)
- Create price change alerts for watchlisted players
- Build notification preference settings in user profile

**Tech Choices**: Supabase Auth for emails, react-hot-toast for in-app notifications

### Ticket 5.5: Add real-time data synchronization

**Background**: UI needs to reflect latest data without refresh.
**Acceptance Criteria**:

- Implement Supabase real-time subscriptions for user data
- Create optimistic UI updates for user actions
- Add background data refresh mechanism
- Implement conflict resolution for simultaneous updates
- Build loading and success indicators for all actions

**Tech Choices**: Supabase real-time subscriptions, SWR for data management

## EPIC 6: Advanced Analytics and Insights

**Goal**: Add sophisticated analytics and competitive insights to enhance strategy.

### Ticket 6.1: Implement mini-league analysis

**Background**: Comparing with rivals helps inform strategy.
**Acceptance Criteria**:

- Create rival team data collection and storage
- Implement effective ownership calculation
- Add differential player identification
- Create head-to-head comparison visualizations
- Build API endpoint for frontend league visualization

**Tech Choices**: Supabase for data storage, TypeScript for analysis

### Ticket 6.2: Develop risk management system

**Background**: Different league positions require different risk strategies.
**Acceptance Criteria**:

- Create variance calculation for player performances
- Implement risk profile settings based on league position
- Add differential strategy suggestions for rank chasers
- Create template strategy for rank defenders
- Build API endpoint for frontend risk controls

**Tech Choices**: TypeScript statistical functions, Supabase Edge Functions

### Ticket 6.3: Add performance tracking and analysis

**Background**: Users need insights on their performance over time.
**Acceptance Criteria**:

- Create historical performance tracking in Supabase
- Implement decision quality evaluation (recommended vs actual)
- Add what-if analysis for alternative decisions
- Create improvement suggestions based on missed opportunities
- Build API endpoint for frontend performance dashboard

**Tech Choices**: Supabase for historical data, recharts for visualizations

### Ticket 6.4: Implement custom strategy settings

**Background**: Advanced users want to customize the recommendation engine.
**Acceptance Criteria**:

- Create strategy preference schema in Supabase
- Implement weighting controls for different factors
- Add favorite/blocked player functionality
- Create custom chip strategy settings
- Build API endpoint for frontend strategy customization

**Tech Choices**: Supabase for preference storage, shadcn/ui for controls

## EPIC 7: System Optimization and Testing

**Goal**: Optimize performance, add comprehensive testing, and prepare for production.

### Ticket 7.1: Implement frontend performance optimization

**Background**: The UI needs to be fast and responsive.
**Acceptance Criteria**:

- Add code splitting and lazy loading for routes
- Implement static generation for appropriate pages
- Add image optimization for player photos
- Create performance monitoring
- Optimize bundle size with tree shaking

**Tech Choices**: Next.js optimization features, Lighthouse for testing

### Ticket 7.2: Optimize database and API performance

**Background**: Backend operations need to be fast and efficient.
**Acceptance Criteria**:

- Create database indexes for common queries
- Implement query optimization in Prisma
- Add caching layer for frequent requests
- Create database connection pooling
- Build performance monitoring for API endpoints

**Tech Choices**: Prisma query optimization, Supabase performance features

### Ticket 7.3: Add comprehensive testing suite

**Background**: Testing ensures reliability and prevents regressions.
**Acceptance Criteria**:

- Implement unit tests for core algorithms
- Create integration tests for API endpoints
- Add end-to-end tests for critical user flows
- Implement visual regression testing for UI
- Create automated test pipeline in CI/CD

**Tech Choices**: Jest, React Testing Library, Cypress

### Ticket 7.4: Prepare for production deployment

**Background**: The system needs to be ready for production use.
**Acceptance Criteria**:

- Create production deployment configuration
- Implement environment-specific settings
- Add error monitoring and logging
- Create backup and recovery procedures
- Build status page for system health

**Tech Choices**: Vercel for deployment, Sentry for error monitoring
