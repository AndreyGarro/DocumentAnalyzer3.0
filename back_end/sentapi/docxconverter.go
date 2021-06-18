package main

import (
	"fmt"
	"log"

	"code.sajari.com/docconv"
)

func readDocx(file string) string {
	res, err := docconv.ConvertPath(file)
	if err != nil {
		log.Fatal(err)
	}
	content := fmt.Sprint(res)
	fmt.Println(res)
	return content
}
