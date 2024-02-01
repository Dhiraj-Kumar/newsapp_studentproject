FROM node:18
WORKDIR /newsletter
COPY package.json ./
RUN npm install
COPY . ./
CMD ["node","server"]
EXPOSE 8005
