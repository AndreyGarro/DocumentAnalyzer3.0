import pika

# https://www.rabbitmq.com/tutorials/tutorial-four-python.html

import json

import flask
import requests
from flask import jsonify
from NLP_Analyzer import NlpAnalyzer
from Person import Person


class rpcReciever:
    def __init__(self, host='localhost'):
        self.host = host
        self.EXCHANGE = 'broker'
        self.connection = None
        self.channel = None
        self.queues = ['nlp_analyze', 'nlp_compare']
        self.routing_keys = ['analyze_rk', 'compare_rk']
        self.functions = {
            'nlp_analyze': self.analyze_file,
            'nlp_compare': self.compare_bt_databases
        }

    def analyze_file(self, ch, method, props, body):
        body = str(body.decode("utf-8"))
        nlp_analizer = NlpAnalyzer()
        nlp_analizer.init_nlp("english")

        lista_ = nlp_analizer.analyze_file(body)
        response = ""

        if(len(lista_) != 0):
            jsonStr = json.dumps([Person.__dict__ for Person in lista_])
            response_ = requests.get("http://192.168.33.4:9081/database/mongodb/nlpInsert/" + jsonStr) #[{"person_name": "Hola Edgar Andrey", "times": 1, "filename": "textoprueba.txt"}]
            #response = jsonify(jsonStr)
            print("resp: -----------" + response_.text)
            response = jsonStr
            print(body)

        ch.basic_publish(exchange='',
                         routing_key=props.reply_to,
                         properties=pika.BasicProperties(correlation_id= \
                                                             props.correlation_id),
                         body=response)
        ch.basic_ack(delivery_tag=method.delivery_tag)
        #self.delete_file(body)

    def delete_file(self, file):
        nlp_analizer = NlpAnalyzer()
        nlp_analizer.delete_file(file)

    def compare_bt_databases(self, ch, method, props, body):
        body = str(body.decode("utf-8"))
        print(body)
        response_ = requests.get("http://192.168.33.4:9081/database/mongodb/results/?filename=" + body)
        print("resp: " + str(response_.content.decode("utf-8")))
        ch.basic_publish(exchange='',
                         routing_key=props.reply_to,
                         properties=pika.BasicProperties(correlation_id= \
                                                             props.correlation_id),
                         body=str(response_.content.decode("utf-8")))
        ch.basic_ack(delivery_tag=method.delivery_tag)


    def listen(self):
        # Connecting routing keys with queues

        for i in range(0, len(self.queues)):
            pass
            # self.channel.queue_declare(queue=self.routing_keys[i])
            self.channel.queue_declare(queue=self.queues[i])
            self.channel.queue_bind(exchange=self.EXCHANGE, queue=self.queues[i], routing_key=self.routing_keys[i])
            self.channel.basic_consume(queue=self.queues[i], on_message_callback=self.functions[self.queues[i]])

        print("Start listening NLP consumer")
        self.channel.start_consuming()

    def get_connection(self):
        flag = False
        try:

            self.connection = pika.BlockingConnection(pika.ConnectionParameters(host=self.host))
            if self.connection.is_open:
                self.channel = self.connection.channel()
                self.channel.exchange_declare(exchange=self.EXCHANGE, exchange_type='direct')
                flag = True
        except:
            flag = False

        return flag


ser = rpcReciever('192.168.48.2')
response = requests.get("http://192.168.48.2:15672/#/queues")
print("Waiting for the server to start")
while not ser.get_connection():
    pass
ser.listen()
