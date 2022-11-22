FROM node:alpine
# Autor/Mantenedor
MAINTAINER Bunny Software

# Definir diretório de trabalho

ADD . .
RUN yarn install
RUN yarn build

# Expor porta 80
EXPOSE  8080
EXPOSE  3001

# Rodar o app usando nodemon
CMD ["yarn", "start:prod"]


