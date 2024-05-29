FROM nginx:mainline-alpine

COPY build/*.html /usr/share/nginx/html/
COPY build/*.png /usr/share/nginx/html/
COPY build/*.txt /usr/share/nginx/html/

RUN mkdir /usr/share/nginx/html/_app
COPY build/_app/env.js /usr/share/nginx/html/_app/
COPY build/_app/version.json /usr/share/nginx/html/_app/

RUN mkdir /usr/share/nginx/html/_app/immutable
RUN mkdir /usr/share/nginx/html/_app/immutable/assets
COPY build/_app/immutable/assets/*.css /usr/share/nginx/html/_app/immutable/assets/
COPY build/_app/immutable/assets/*.woff /usr/share/nginx/html/_app/immutable/assets/
COPY build/_app/immutable/assets/*.woff2 /usr/share/nginx/html/_app/immutable/assets/
COPY build/_app/immutable/assets/*.jpg /usr/share/nginx/html/_app/immutable/assets/

RUN mkdir /usr/share/nginx/html/_app/immutable/chunks
COPY build/_app/immutable/chunks/*.js /usr/share/nginx/html/_app/immutable/chunks/

RUN mkdir  /usr/share/nginx/html/_app/immutable/entry
COPY build/_app/immutable/entry/*.js /usr/share/nginx/html/_app/immutable/entry/

RUN mkdir  /usr/share/nginx/html/_app/immutable/nodes
COPY build/_app/immutable/nodes/*.js /usr/share/nginx/html/_app/immutable/nodes/

EXPOSE 9090