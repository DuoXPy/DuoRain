# DuoXJS

DuoXJS is a free userscript utility for Duolingo that helps you switch between multiple accounts, automate daily routines (like streak keeping and quest saving), and automatically solve exercises.

---

## Features

### 1. Two Solving Modes
* **Native Mode**: Automates XP, Gems, and Streak restoration in the background using direct requests, without loading the actual lesson interface.
* **Auto Solver Mode**: Injects `SOLVE` and `SOLVE ALL` buttons into the lesson footer. It reads questions on your screen and solves them automatically with configurable delay options (either a fixed speed or a randomized range to mimic human behavior).

### 2. EZ Quiz
* Simplifies standard lessons, stories, and listening challenges to make them incredibly easy and fast to complete.
* Shortens lesson lengths down to a configurable number of questions (default is 5).

### 3. Startup Automations
* **Auto Reach Rank**: Automatically runs in the background on startup until you reach your target league rank.
* **Auto Keep Streak**: Runs a quick lesson on launch to secure your daily streak.
* **Auto Quest Saver**: Automatically logs and claims your quest rewards on launch.

### 4. Account Manager
* Save multiple Duolingo profiles and switch between them instantly.
* View real-time stats (XP, Gems, Streak, and League Rank) for the active profile directly from the menu.

### 5. UI Customization
* Injects a clean floating menu overlay in the bottom-right corner of the page.
* Adaptive Dark/Light themes that automatically match system preferences or Duolingo's colors.

---

## Installation

1. **Install a Userscript Manager**:
   * Install [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) in your browser.
2. **Install DuoXJS**:
   * Click on the raw link of [DuoXJS.user.js](https://raw.githubusercontent.com/LibreDuo/DuoXJS/main/DuoXJS.user.js) to install it.
3. **Open Duolingo**:
   * Navigate to [duolingo.com](https://www.duolingo.com). You will see the floating control panel in the bottom-right corner.

---

## How to Use

1. **Settings & Customization**: Click the floating menu handle in the bottom-right corner of the page to open the panel.
2. **Manage Profiles**: In the **Account Manager** tab, click `SAVE CURRENT` to register profiles and switch between them at any time.
3. **Set Solving Delay**: Toggle `Random Speed` to set minimum/maximum ranges, or input a fixed delay (in milliseconds) to control solving intervals.
4. **Run Automation**: Toggle your preferred background automation settings (Auto Reach Rank, Auto Streak, etc.) and click the main action button to start.

---

## Privacy & Storage

* **Local Storage**: All settings, accounts, and session tokens are saved locally in your browser's private storage using the `dx_` prefix.
* **No Tracking**: No personal information or usage data is sent to external servers. The script only occasionally queries its GitHub repository to check for updates.

---

## License

This project is licensed under the [MIT License](LICENSE).
