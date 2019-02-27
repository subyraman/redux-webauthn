FROM node:9-alpine

RUN apk add --no-cache python python-dev python3 python3-dev \
    linux-headers build-base bash git ca-certificates libffi-dev openssl-dev && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    rm -r /root/.cache

COPY . /app
WORKDIR /app

RUN yarn install
RUN yarn run build
EXPOSE 5000

WORKDIR /app/server
RUN pip3 install -r requirements.txt

CMD python3 app.py