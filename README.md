# Stock price advisor

## Structure

The application uses [npm workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces) to separate frontend, backend and shared model projects. Each project can be built separately and thus can have different deployment models.

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

To run both projects locally execute:

```bash
npm start
```

The frontend will be accessible at `http://localhost:3000`. The backend will be accessible at `http://localhost:3030`.

> You can run each one individually using `npm run dev --workspace <project>`, where project is either `frontend` or `server` respectively.

To execute the entire test suite you can run:

```bash
CI=true npm test --workspaces --if-present
```

> Similar to running the projects separately you can execute each project tests in watch mode using `npm test --workspace <project>`

### Deployment

Both the frontend and backend build artifacts ready for deployment in their respective projects, i.e. `<project>/build`. To do so use:

```bash
npm run build --workspaces --if-present
```