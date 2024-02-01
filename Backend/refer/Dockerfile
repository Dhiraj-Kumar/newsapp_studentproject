FROM node:18
WORKDIR /refer
COPY package.json ./
RUN npm install
COPY . ./
CMD ["node","server"]
EXPOSE 8002
