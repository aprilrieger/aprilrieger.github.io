FROM node:18-buster as web


USER node
COPY --chown=node . /home/node/app
WORKDIR /home/node/app

ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/home/node/app/node_modules/.bin

RUN bash -l -c " \
  npm install && \
  npm run clean && \
  npm run build"

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8000

# Run the web service on container startup.
CMD ["npm", "run", "serve"]