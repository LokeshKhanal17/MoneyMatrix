<<<<<<< HEAD
# Money Matrix 💰

Money Matrix is a modern, intuitive financial management application designed to help users take control of their personal finances with precision and ease. Built with React and powered by real-time analytics, this app transforms complex financial data into actionable insights.

## Key Features

- 📊 Interactive Dashboard: Visual representation of your financial health at a glance
- 💵 Income & Expense Tracking: Smart categorization and monitoring of all financial transactions
- 🤝 Shared Expense Management: Easily split and track shared costs with roommates or partners
- 🎯 Goal Setting & Tracking: Set and monitor financial goals with progress visualization
- 📈 Intelligent Analytics: Advanced insights into spending patterns and financial trends
- 🔔 Smart Notifications: Stay informed about bills, budget limits, and financial goals

## Why Money Matrix?

Money Matrix isn't just another budgeting tool – it's your personal financial command center. Whether you're saving for a big purchase, managing shared household expenses, or simply wanting better control over your finances, Money Matrix provides the clarity and tools you need to make informed financial decisions.

## Tech Stack

- Frontend: React.js with Tailwind CSS
- Animations: Framer Motion
- State Management: Redux
- Authentication: OAuth integration
- Visualization: Recharts

## Getting Started

[Installation and setup instructions will go here]

## Contributing

We welcome contributions! See our contributing guide for more details.
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
>>>>>>> 8fe2f6d (Added welcome page & sign in page)
