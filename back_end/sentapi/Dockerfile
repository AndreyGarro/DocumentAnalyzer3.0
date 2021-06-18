FROM golang:alpine

RUN mkdir /app
ENV GOOGLE_APPLICATION_CREDENTIALS=./sentimentanalysis-315620-51cd413739f1.json

COPY . /app
WORKDIR /app
RUN go build .
CMD ["/app/main"]