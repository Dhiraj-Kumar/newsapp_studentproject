FROM node:18
WORKDIR /auth
COPY package.json ./
RUN npm install
COPY . ./
CMD ["node","server"]
EXPOSE 8000
