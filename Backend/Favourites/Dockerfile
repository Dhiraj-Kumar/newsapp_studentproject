FROM node:18
WORKDIR /favorite
COPY package.json ./
RUN npm install
COPY . ./
CMD ["node","server"]
EXPOSE 8004
