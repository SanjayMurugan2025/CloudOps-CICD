FROM nginx:alpine

RUN apk update && apk upgrade

RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf \
    && sed -i 's/listen  \[::\]:80;/listen       8080;/' /etc/nginx/conf.d/default.conf \
    && chown -R nginx:nginx /var/cache/nginx \
       /var/log/nginx \
       /etc/nginx/conf.d \
       /usr/share/nginx/html \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid

COPY --chown=nginx:nginx dist /usr/share/nginx/html

USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]