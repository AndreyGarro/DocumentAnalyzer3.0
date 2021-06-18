
FROM python:3.8-slim-buster
RUN rabbitmq-plugins enable --offline rabbitmq_mqtt rabbitmq_federation_management rabbitmq_stomp &
WORKDIR /

USER root
RUN pip install requests
RUN pip install pika

COPY . .

CMD ["python3", "sqlserver_receiver.py"]
