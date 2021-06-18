# Ports used by broker:


| Exported port | Internal port |
| ------ | ------ |
| 5673 | 5673 |
| 5672 | 5672 |
| 15672 | 15672 |

The ip of it is: 172.19.0.2



# Running this app
```sh
sudo docker-compose up --build
```
# Access this app

The app will be able from:

```http
http://localhost:5672/
```
The user & password of the server is 'guest'. 

After building the RabbitMQ and the rpcReciever, then you can request information with rpcRequester:

```sh
cd broker/broker_src
python3 rpcRequester.py 
```

# Some useful commands:

```sh
# For creating a new network:
sudo docker network create <network>

# For start the rabbitmq server:
sudo service rabbitmq-server start

# For stop the rabbitmq server:
sudo service rabbitmq-server stop

# Removing all the stoped containers:
sudo docker container prune

# Removing all the images:
sudo docker rmi -f $(sudo docker images -q)
```

