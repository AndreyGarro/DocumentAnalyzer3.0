package com.database.mongo;

import com.database.connection.Person;
import com.google.gson.Gson;
import com.database.connection.MongoConnection;
//import com.database.connection.SentimentResult;
import javax.ws.rs.*;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

@Path("/mongodb")
public class MongoResource {

    @GET
    @Path("/test")
    @Produces("text/plain")
    public String hello() {
        return "Mongo API is up1!";
    }

    @GET
    @Path("/nlpInsert/{jsonInfo}")
    @Produces("application/json")
    public String nlp_insert(@PathParam("jsonInfo") String jsonInfo){
        // {[{"person_name": "andrey", "times": 3, "filename": "test"}, {"person_name": "edgar", "times": 3, "filename": "test"}]}
        Gson gson = new Gson();
        Person[] personList = gson.fromJson(jsonInfo, Person[].class);

        if(personList.length == 0){
            return "";
        }

        MongoConnection mongoDb = new MongoConnection();
        mongoDb.set_mongo_server_name("mongodb");
        mongoDb.set_data_base_name("nlp");              //Nombre de la base de MONGO
        mongoDb.set_server_ip("192.168.33.3");
        mongoDb.set_server_port("27017");
        mongoDb.set_collection_name(personList[0].get_filename());
        mongoDb.insert(personList);
        return "ok";
        //System.out.println(listPerson.get(0).get_person_name());
        //return analyzer.get_people_list_json();
    }

    @GET
    @Path("/results/")
    @Produces("application/json")
    public String getNlpResults(@QueryParam("filename") String filename_) throws IOException, InterruptedException{

        MongoConnection mongoDb = new MongoConnection();
        mongoDb.set_mongo_server_name("mongodb");
        mongoDb.set_data_base_name("nlp");              //Nombre de la base de MONGO
        mongoDb.set_server_ip("192.168.33.3");
        mongoDb.set_server_port("27017");
        mongoDb.set_collection_name(filename_);

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://192.168.32.6:9080/database/sqlserver/getAllEmployees"))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("Response sqlserver: " + response.body());

        String response_ = response.body().replace("[", "");
        response_ = response_.replace("]", "");
        response_ = response_.replace("\"", "");
        response_ = response_.toLowerCase();

        String[] listSQL = response_.split(",");
        List<Person> listResults = mongoDb.getData(filename_);

        System.out.println("hola: ------------- " + listResults.get(0).get_person_name());

        List<Person> compareResults = new ArrayList<Person>();

        for(Person p : listResults){
            for(String s : listSQL){
                if(p.get_person_name().equals(s)){
                    compareResults.add(p);
                }
            }
        }
        Gson gson = new Gson();

        // [{'person_name': 'x', 'times': '1'},{'person_name': 'y', 'times': '1'},{'person_name': 'z', 'times': '1'}]
        return gson.toJson(compareResults);
    }

    /*
     @GET
    @Path("/sentimentInsert/{jsonInfo}")
    @Produces("application/json")
    public String sentiment_insert(@PathParam("jsonInfo") String jsonInfo){
        // {[{"sentiment": "Positive", "score": 0.2, "filename": "test.docx"}, {"sentiment": "Negative", "score": -0.5, "filename": "test2.txt"}]}
        Gson gson = new Gson();
        SentimentResult[] sentList = gson.fromJson(jsonInfo, SentimentResult[].class);

        if(sentList.length == 0){
            return "";
        }

        MongoConnection mongoDb = new MongoConnection();
        mongoDb.set_mongo_server_name("mongodb");
        mongoDb.set_data_base_name("sentiment");              //Nombre de la base de MONGO
        mongoDb.set_server_ip("192.168.33.3");
        mongoDb.set_server_port("27017");
        mongoDb.set_collection_name(sentList[0].get_filename());
        mongoDb.insert(sentList);
        return "ok";
        //System.out.println(listPerson.get(0).get_person_name());
        //return analyzer.get_people_list_json();
    }

    @GET
    @Path("/sentimentResults/")
    @Produces("application/json")
    public String getSentimentResults(@QueryParam("filename") String filename_) throws IOException, InterruptedException{

        MongoConnection mongoDb = new MongoConnection();
        mongoDb.set_mongo_server_name("mongodb");
        mongoDb.set_data_base_name("sentiment");              //Nombre de la base de MONGO
        mongoDb.set_server_ip("192.168.33.3");
        mongoDb.set_server_port("27017");
        mongoDb.set_collection_name(filename_);


        List<SentimentResult> listResults = mongoDb.getData(filename_);
        Gson gson = new Gson();

        return gson.toJson(listResults);
    }*/
}