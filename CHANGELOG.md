## [1.0.2]

- Various bug fixes

## [1.0.1]

- Reordered the Extra Features menu options to: Auto League, Remove Hearts, Shop Items, Quest Center, Social Tools, Leaderboard, XP Summaries, and Activity Feed
- Fixed drag jumping and layout viewport scaling offsets for the show/hide button when zoomed or panned
- Refactored background tasks into a single optimized loop using Promise.allSettled
- Centralized Next Button detection and optimized Auto Solver text extraction
- Replaced inline SVGs with CDN-hosted images to optimize bundle size and rendering
- Refactored Quest Center to use event delegation to prevent memory leaks
- Prevented sticky button focus states and improved panel transition animations
- Minor UI alignment and wording updates in Account Manager, Quest Center, and EZ Quiz

## [1.0.0]

- Rebranded to DuoXJS under LibreDuo organization

## [6.0.0.BETA.03]

- Fixed save streak bug for multiple accounts
- fetchApi now uses either GM_xmlhttpRequest or native browser fetch
- New Safe Streak settings
- Proper checks for the XP and Streak APIs
- Unified polling time

## [6.0.0.BETA.02]

- New Account Manager
- New Native & Solver Modes
- New Auto Solver Settings
- New EZ Quiz Custom Questions
- Unified Design Language
