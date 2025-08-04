# NestNavApp

**Nicholas Falletta**
**August 3, 2025**

## Project Description

This project is an interactive learning tool designed to educate real estate agents and homeowners on industry knowledge.

In this particular module, users will learn about home inspections through three key lessons:

1. **What is a Home Inspection?**
2. **Types of Inspections**
3. **Red Flags to Watch Out For**

Each section contains a short reading followed by a single multiple-choice question. After completing all three lessons, users are rewarded with coins and a celebratory animation for their effort.

---

## Setup Instructions

To get started locally:

1. Clone or download the project from GitHub
2. Open your terminal and navigate into the project folder:

   ```bash
   cd cher-project
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. Build the project:

   ```bash
   npm run build
   ```
5. Start the development server:

   ```bash
   npm run dev
   ```

### Live Demo

Vercel Link:
[nest-nav-project.vercel.app](nest-nav-project.vercel.app)

---

## Technology Stack

* **React** — Frontend UI
* **Tailwind CSS** — CSS
* **JSON** — Module's data

---

## Assumptions & Design Decisions

1. **Selective Data Persistence**:
   To stay focused on the UI/UX side of development, not all app data is persistent. The only variable that persists is `finished`, which is for to the completion screen. This allows the coin count animation and confetti to trigger only once per user upon completion.

2. **Intentional Design Simplicity**:
   I aimed for a clean, modern layout that prioritizes accessibility and ease of use. However, I also wanted to challenge myself creatively, so I added the coin counter and confetti effects on the completion screen.

---

## Known Issues

1. **Hardcoded Elements**:
   Some elements are still hardcoded rather than being pulled from `module.json`. Given more time, I would have included additional fields like `"complete": false` or `"answered": false` to better track lesson progress. Currently, progress is inferred from the questions that have been answered. This is something I would improve in a more scalable version.

2. **Quiz Logic**:
   Answering every question wrong will still give you the reward. With more time, I would have liked to give the user a minimum of 2 answers be correct for the reward, as well as let them answer each question twice.

---

## Time Spent

**8 Hours**