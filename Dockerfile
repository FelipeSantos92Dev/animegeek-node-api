FROM node:16.14.2

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "dev"]
