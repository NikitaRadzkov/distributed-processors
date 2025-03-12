
# Distributed Processors Project

This project is a distributed URL processing system built with TypeScript and Node.js. It fetches URLs from a PostgreSQL database, processes them in parallel using Worker Threads, and updates their status in the database.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Configuration](#configuration)
4. [Running the Project](#running-the-project)
5. [Building the Project](#building-the-project)

---

## Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/) (v13 or higher)
- [Docker](https://www.docker.com/) (optional, for running PostgreSQL in a container)

---

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/NikitaRadzkov/distributed-processors.git
cd distributed-processors
```

### 2. Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

### 3. Set Up PostgreSQL

You can either use a local PostgreSQL instance or run it in a Docker container.

#### Option 1: Local PostgreSQL

1. Create a database named `urls_db`.
2. Update the `.env` file with your PostgreSQL credentials (see [Configuration](#configuration)).

#### Option 2: Docker (Recommended)

Run PostgreSQL using Docker Compose:

```bash
docker-compose up -d
```

This will start a PostgreSQL container and initialize the database with the `init.sql` script.

---

## Configuration

### Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```env
DB_USER=user
DB_PASSWORD=password
DB_HOST=localhost
DB_NAME=urls_db
DB_PORT=5432
BATCH_SIZE=5
```

### Database Initialization

The `init.sql` script (located in `scripts/init.sql`) creates the `urls` table and inserts sample data. If you're using Docker, this script will run automatically.

---

## Running the Project

### Development Mode

To run the project in development mode, use:

```bash
npm start
```

This will start the URL processor using `ts-node`.

### Production Mode

1. Build the project:

   ```bash
   npm run build
   ```

   This compiles the TypeScript code into JavaScript and outputs it to the `dist` folder.

2. Run the compiled code:

   ```bash
   npm run serve
   ```

---

## Building the Project

To compile the TypeScript code into JavaScript, run:

```bash
npm run build
```

The compiled files will be placed in the `dist` folder.
