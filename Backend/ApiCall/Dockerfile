FROM node:18
WORKDIR /api
COPY package.json ./
RUN npm install
COPY . ./
CMD ["node","api"]
EXPOSE 8001
