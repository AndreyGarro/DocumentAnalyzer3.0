package main

import (
	"fmt"
	"io/ioutil"
	"log"
)

func readtxt(file string) string {

	// File to analyze.
	res, err := ioutil.ReadFile(file)

	if err != nil {
		log.Fatal(err)
	}
	content := string(res)

	fmt.Println(string(res))

	return content
}
