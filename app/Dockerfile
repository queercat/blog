# grab the required static hosting server.
FROM alpine/git as clone
WORKDIR /repos
RUN git clone https://github.com/PierreZ/goStatic

# build it.
FROM --platform=$BUILDPLATFORM golang:latest as builder

ARG TARGETPLATFORM

WORKDIR /go/src/github.com/PierreZ/goStatic
COPY --from=clone /repos/goStatic ./

RUN mkdir ./bin && \
    apt-get update && apt-get install -y upx && \

    # getting right vars from docker buildx
    # especially to handle linux/arm/v6 for example
    GOOS=$(echo $TARGETPLATFORM | cut -f1 -d/) && \
    GOARCH=$(echo $TARGETPLATFORM | cut -f2 -d/) && \
    GOARM=$(echo $TARGETPLATFORM | cut -f3 -d/ | sed "s/v//" ) && \

    CGO_ENABLED=0 GOOS=${GOOS} GOARCH=${GOARCH} GOARM=${GOARM} go build ${BUILD_ARGS} -ldflags="-s" -tags netgo -installsuffix netgo -o ./bin/goStatic && \

    mkdir ./bin/etc && \
    ID=$(shuf -i 100-9999 -n 1) && \
    upx -9 ./bin/goStatic && \
    echo $ID && \
    echo "appuser:x:$ID:$ID::/sbin/nologin:/bin/false" > ./bin/etc/passwd && \
    echo "appgroup:x:$ID:appuser" > ./bin/etc/group

# setup nginx with our nginx conf
FROM alpine:latest
# install requirements
RUN apk update
RUN apk add nginx
RUN apk add bash

# set config
COPY nginx.conf /etc/nginx/nginx.conf

# setup our static host.

COPY --from=builder /go/src/github.com/PierreZ/goStatic/bin/ /bin/
COPY ./out/ /srv/http

# run the things
COPY wrapper.sh wrapper.sh
CMD chmod +x wrapper.sh
CMD ["sh", "wrapper.sh"]
