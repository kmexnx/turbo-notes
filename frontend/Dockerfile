FROM node:20-alpine

WORKDIR /app

# Copy dependency definitions and npm config
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]