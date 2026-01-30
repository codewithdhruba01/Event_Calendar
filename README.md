# Goodwell

![Goodwell Banner](public/screenshoot/banner.png)

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38b2ac)

**Goodwell** is a modern, all-in-one productivity suite designed to keep your team organized and efficient. It seamlessly integrates a powerful calendar, file management, task tracking, and note-taking into a single, beautiful interface.

## Features

*   **Advanced Calendar**: Intuitive calendar views to manage your schedule, events, and deadlines.
*   **Task Management**: A robust Todo system to track your tasks and stay on top of your priorities.
*   **File Manager**: Organized file storage system to keep your documents handy and secure.
*   **Sticky Notes**: Quick and easy digital sticky notes for capturing fleeting thoughts and reminders.
*   **Modern UI/UX**: Built with a focus on aesthetics and usability, featuring full Dark/Light mode support.
*   **Secure Authentication**: Integrated with Clerk for secure and seamless user authentication.

## 🛠️ Tech Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), [Hugeicons](https://hugeicons.com/)
*   **State Management:** [Zustand](https://github.com/pmndrs/zustand)
*   **Authentication:** [Clerk](https://clerk.com/)
*   **Charts:** [Recharts](https://recharts.org/)
*   **Date Handling:** [date-fns](https://date-fns.org/)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   Node.js (v18 or higher)
*   pnpm (preferred) or npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/codewithdhruba01/goodwell.git
    cd goodwell
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    # or
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory and add your Clerk API keys:
    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
    CLERK_SECRET_KEY=your_secret_key
    ```

4.  **Run the development server:**
    ```bash
    pnpm dev
    # or
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
├── app/                  # Application routes (Next.js App Router)
│   ├── files/            # File management routes
│   ├── todo/             # Task management routes
│   ├── sticky-notes/     # Sticky notes routes
│   └── page.tsx          # Main dashboard/calendar view
├── components/           # Reusable UI components
│   ├── calendar/         # Calendar specific components
│   ├── todo/             # Todo specific components
│   └── ui/               # Generic UI components (likely Shadcn)
├── lib/                  # Utility functions
├── store/                # State management stores (Zustand)
└── public/               # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
