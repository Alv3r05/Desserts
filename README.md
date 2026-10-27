
# Desserts Store

A responsive dessert store built with React, TypeScript, and Tailwind CSS. The application includes product browsing, search, category filtering, shopping cart management, and product administration.

## Features

### Store
- Responsive product catalog.
- Search products by name.
- Filter products by category.
- Product detail pages.
- Shopping cart with quantity controls.
- Persistent cart state using Zustand and localStorage.
- Order confirmation modal.

### Product Management
- Create, read, update, and delete products.
- Form validation with React Hook Form and Zod.
- Category selection from the API.
- Loading, error, and empty states.
- Toast notifications for successful and failed operations.
- Paginated product listing.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- TanStack Query
- Zustand
- React Hook Form
- Zod
- React Hot Toast
- JSON Server

## Requirements

- Node.js and npm
- Git (optional)
- A code editor such as Visual Studio Code

## Installation

Clone the repository or download the project files.

Install dependencies:

```bash
npm install
```

## Environment Setup

The frontend uses JSON Server as a local REST API.

Make sure the API base URL in the services points to:

`http://localhost:3000`

The API data is stored in `db.json`.

## Running the Application

Start the API server in one terminal:

```bash
npm run server
```

Start the frontend in another terminal:

```bash
npm run dev
```

Open the local URL provided by Vite, usually:

`http://localhost:5173`

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Builds the production application. |
| `npm run server` | Starts JSON Server. |
| `npx tsc --noEmit` | Checks TypeScript types. |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | Retrieves products. |
| GET | `/products/:id` | Retrieves a product by ID. |
| POST | `/products` | Creates a product. |
| PUT | `/products/:id` | Updates a product. |
| DELETE | `/products/:id` | Deletes a product. |
| GET | `/categories` | Retrieves categories. |

The paginated product endpoint uses `_page` and `_per_page` query parameters.

## Project Structure

```text
src/
├── components/
├── features/
│   └── products/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── schemas/
│       ├── services/
│       └── utils/
├── pages/
├── services/
├── types/
├── features/
│   └── cart/
│       └── stores/
├── App.tsx
└── main.tsx
```

## Technical Decisions

- **React Router:** Handles client-side navigation.
- **TanStack Query:** Manages server state, caching, and data mutations.
- **Zustand:** Manages shopping cart state and persists it in localStorage.
- **Axios:** Centralizes HTTP requests to the REST API.
- **React Hook Form and Zod:** Manage forms and validate user input.
- **Tailwind CSS:** Provides responsive styling.

## Validation

Run the following commands before submitting changes:

```bash
npx tsc --noEmit
npm run build
```

## Deployment

The frontend can be deployed to platforms such as Vercel or Netlify.

For production deployment, configure a publicly accessible API and update the API base URL. JSON Server with a local `db.json` is intended for development and demonstration, not as a production database.
