# Pinboard site made with Next.js

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/akosfi/pinboard-site.git

# or

gh repo clone akosfi/pinboard-site
```

2. Navigate to the project directory:

```bash
cd pinboard-site
```

3. Install dependencies with npm:

```bash
npm i
```

4. Running the application

Make sure the following environment variable is always set for correct functionality.

```bash
# Base URL of the backend. It should be specified in .env during build in order to have a working build.
NEXT_PUBLIC_SERVER_BASE_URL=http://localhost:8080
```

4/A. Start the development server:

```bash
npm run dev
```

4/B. Create the production build:

```bash
npm run build
```

Use any HTTP server to serve the built static content or run the following command:

```bash
npm run start
```

Then site should be running on http://localhost:3000.
