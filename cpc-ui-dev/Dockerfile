FROM node:8.5.0
MAINTAINER ranpop
WORKDIR /cpc-ui

ADD ./package.json /cpc-ui/

# RUN npm install --production --registry=https://registry.npm.taobao.org
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm rebuild node-sass

RUN \
    rm /etc/localtime && \
    ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

EXPOSE 6061
ENV API_URL=api.gdtrafficad.com \
    API_PORT=80 \
    PORT=6061

ADD . /cpc-ui

CMD ["sh", "start.sh"]
