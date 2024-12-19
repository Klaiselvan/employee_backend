
FROM node:18-alpine


COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

EXPOSE 5000

ENV SUPABASE_URL=https://faccghcpitprujgrtonf.supabase.co
ENV SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhY2NnaGNwaXRwcnVqZ3J0b25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MzU4ODUsImV4cCI6MjA1MDExMTg4NX0.bC5FqrXoAAKadogQCJR9oMt3fQRT9jgT9z6x6ffz4FI


CMD ["node", "server.js"]
