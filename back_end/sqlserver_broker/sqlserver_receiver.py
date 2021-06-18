import pika
import json
import requests

class sqlserver_receiver:
    def __init__(self, host='localhost'):
        self.host = host
        self.EXCHANGE = 'broker'
        self.connection = None
        self.channel = None
        self.queues = ['login']
        self.routing_keys = ['login_rk']
        self.functions = {
            'login': self.login
        }

    def listen(self):
        for i in range(0, len(self.queues)):
            pass
            self.channel.queue_declare(queue=self.queues[i])
            self.channel.queue_bind(exchange=self.EXCHANGE, queue=self.queues[i], routing_key=self.routing_keys[i])
            self.channel.basic_consume(queue=self.queues[i], on_message_callback=self.functions[self.queues[i]])

        print("Start listening sqlserver consumer")
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

    def login(self, ch, method, props, body):
        body = str(body.decode("utf-8"))
        user_ = json.loads(body)['user']
        pass_ = json.loads(body)['pass']

        request_ = "http://192.168.32.3:9080/database/sqlserver/login/?user="+ user_ +"&pass=" + pass_
        print("Request: " + request_)
        response_ = requests.get(request_).text
        print("Response: " + response_)
        ch.basic_publish(exchange='',
                         routing_key=props.reply_to,
                         properties=pika.BasicProperties(correlation_id= props.correlation_id),
                         body=response_)
        ch.basic_ack(delivery_tag=method.delivery_tag)



ser = sqlserver_receiver('192.168.48.2')
response = requests.get("http://192.168.48.2:15672/#/queues")
print("Waiting for the server to start")
while not ser.get_connection():
    pass
ser.listen()
