
FROM node:18-alpine


COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

EXPOSE 5000

ENV SUPABASE_URL=
ENV SUPABASE_KEY=


CMD ["node", "server.js"]
