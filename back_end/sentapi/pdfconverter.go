/*package main

import (
	"bytes"

	"github.com/ledongthuc/pdf"
)

func readPDF(pdfPath string) string {
	content, _ := ReadPlainTextFromPDF(pdfPath)
	return content
}

func ReadPlainTextFromPDF(pdfpath string) (text string, err error) {
	f, r, err := pdf.Open(pdfpath)
	if err != nil {
		panic(err)
	}
	defer f.Close()
	if err != nil {
		return
	}

	var buf bytes.Buffer
	b, err := r.GetPlainText()
	if err != nil {
		return
	}

	buf.ReadFrom(b)
	text = buf.String()
	return
}*/

package main

import (
	"fmt"
	"log"

	"code.sajari.com/docconv"
)

func readPDF(file string) string {
	res, err := docconv.ConvertPath(file)
	if err != nil {
		log.Fatal(err)
	}
	content := fmt.Sprint(res)
	fmt.Println(res)
	return content
}
