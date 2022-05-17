FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD {["prisma", "generate"], ["npm", "run", "dev"]}
