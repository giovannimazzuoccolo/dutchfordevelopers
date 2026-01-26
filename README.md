# 🇳🇱 Dutch for Developers

An interactive learning platform designed to help developers learn Dutch through engaging games, structured lessons, and real-world content. Built with modern web technologies for a smooth and enjoyable learning experience.

## 📚 About the Project

Dutch for Developers is a comprehensive educational platform that combines gamification with traditional learning methods. Whether you're a complete beginner or looking to improve your Dutch language skills, this platform offers:

- **Interactive Games**: Learn while playing games like Memory, Detective, Passport, and more
- **Structured Lessons**: Progressive learning modules covering grammar, vocabulary, and language fundamentals
- **Reading Content**: Curated articles and resources to improve reading comprehension
- **Progress Tracking**: Dashboard to monitor your learning journey and track scores
- **User Authentication**: Personalized learning experience with account management

## 🛠️ Technology Stack

### Frontend

- **Nuxt 3**: Modern Vue.js framework for server-side rendering and static site generation
- **Vue 3**: Progressive JavaScript framework for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **TypeScript**: Type-safe JavaScript for better code quality and developer experience

### Backend & Database

- **Nuxt Server Routes**: Server-side API built into Nuxt
- **Prisma**: Modern ORM for database management and migrations
- **NextAuth**: Authentication and session management
- **SQLite**: Lightweight database (via better-sqlite3)

### Development & Testing

- **Vitest**: Fast unit testing framework
- **FontAwesome**: Icon library for UI elements
- **Pinia**: State management library
- **ts-node**: TypeScript execution for Node.js scripts

### Infrastructure

- **Docker**: Containerization for consistent deployment environments

## 🚀 Getting Started

### Prerequisites

- Node.js 24+
- npm, pnpm, or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/giovannimazzuoccolo/dutchfordevelopers.git
cd dutchfordevelopers
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (create a `.env` file):

```bash
# Add your authentication and database configuration
```

4. Set up the database:

```bash
npm run prisma
npx prisma migrate dev
npm run seed:games
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Build for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Testing

Run tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## 📁 Project Structure

```
├── components/          # Vue components (games, UI, pages sections)
├── pages/              # Nuxt pages (routes)
├── layouts/            # Page layouts
├── server/             # Server-side code (API routes)
├── store/              # Pinia state management
├── content/            # Educational content (lessons, games data)
├── plugins/            # Nuxt plugins (auth, fontawesome, etc.)
├── utils/              # Utility functions
├── prisma/             # Database schema and migrations
├── public/             # Static assets
└── enums/              # TypeScript enums
```

## 🎮 Game Modules

- **Memory**: Classic memory card matching game
- **Detective**: Word detective puzzle game
- **Passport**: Language passport game
- **Bijvoeglijk**: Adjective learning game
- **De/Het**: Grammar article learning game

## 📖 Learning Content

Structured lessons covering:

- Nouns
- Verbs
- Adjectives
- Adverbs
- Pronouns
- Prepositions
- Conjunctions
- Numbers

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Setting Up Your Development Environment

1. Fork the repository
2. Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

3. Install dependencies:

```bash
npm install
```

4. Make your changes and ensure code quality:

```bash
npm run test
```

5. Commit your changes with clear messages:

```bash
git commit -m "feat: add new game or feature description"
```

6. Push to your fork:

```bash
git push origin feature/your-feature-name
```

7. Create a Pull Request with a clear description of your changes

### Contribution Guidelines

- **Code Style**: Follow the existing code patterns and use TypeScript
- **Testing**: Write tests for new features using Vitest
- **Documentation**: Update README.md and add comments for complex logic
- **Commits**: Use conventional commit messages (feat:, fix:, docs:, etc.)
- **Pull Requests**: Provide clear descriptions of what you're adding or fixing

### Areas for Contribution

- Adding new games or learning modules
- Improving existing UI components
- Enhancing the authentication system
- Adding more learning content
- Fixing bugs and improving performance
- Improving documentation

### Reporting Issues

If you find a bug or have a suggestion:

1. Check if the issue already exists
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Your environment details

## 📝 License

This project is open source and available under the MIT License.

## 🙋 Support

For questions or discussions, please open an issue or contact the development team.

---

Happy learning! 🎉

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
