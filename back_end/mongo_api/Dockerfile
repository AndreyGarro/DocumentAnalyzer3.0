FROM openliberty/open-liberty:kernel-java11-openj9-ubi

ARG VERSION=1.0
ARG REVISION=SNAPSHOT

COPY --chown=1001:0 \
    config \
    /config/

COPY --chown=1001:0 \
    build/libs/mongo-1.0-SNAPSHOT.war \
    /config/apps

RUN configure.sh