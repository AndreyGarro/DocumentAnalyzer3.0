package main

import (
	"log"

	amqp "github.com/streadway/amqp"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func initReceiver() (myString string) {
	conn, err := amqp.Dial("amqp://guest:guest@192.168.48.2:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"sentiment", // name
		false,       // durable
		false,       // delete when unused
		false,       // exclusive
		false,       // no-wait
		nil,         // arguments
	)
	failOnError(err, "Failed to declare a queue")

	e := ch.QueueBind(
		"sentiment",    // name
		"analyze_sent", // durable
		"broker",       // delete when unused
		false,          // no-wait
		nil,            // arguments
	)
	failOnError(e, "Failed to declare a queue")

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	failOnError(err, "Failed to register a consumer")

	forever := make(chan bool)

	go func() {
		for d := range msgs {
			er := ch.Publish(
				"",             // queue
				"analyze_sent", // consumer
				false,          // auto-ack
				false,          // exclusive
				amqp.Publishing{
					ContentType:  "text/plain",
					Body:         d.Body,
					DeliveryMode: amqp.Persistent,
				},
			)
			failOnError(er, "Failed to register a consumer")
			myString = BytesToString(d.Body)
			log.Printf("Received a message: %s", d.Body)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
	return
}

func BytesToString(data []byte) string {
	return string(data[:])
}
