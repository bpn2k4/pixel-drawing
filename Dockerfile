FROM node:21 as fe-build

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend/public ./frontend/index.html \
  ./frontend/postcss.config.js ./frontend/tailwind.config.ts \
  ./frontend/tsconfig.app.json ./frontend/tsconfig.json \
  ./frontend/tsconfig.node.json ./frontend/vite.config.ts \
  /app/

COPY ./frontend/src /app/src

RUN npm run build



FROM node:21 as be-build

WORKDIR /app

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend/tsconfig.json /app/

COPY ./backend/src /app/src

RUN npm run build



FROM node:21

WORKDIR /app

COPY ./backend/package*.json ./

RUN npm install --omit=dev

COPY --from=be-build /app/dist /app/dist

COPY --from=fe-build /app/dist /app/static

CMD ["npm", "start"]
