package  com.database.connection;
//Service name: MongoDB
//Data directory: C:\Program Files\MongoDB\Server\4.4\data\
//Log directory: C:\Program Files\MongoDB\Server\4.4\log\
//https://www.youtube.com/watch?v=reYPUvu2Giw

import com.mongodb.*;
import com.mongodb.client.*;
import com.mongodb.client.MongoClient;
import com.mongodb.client.result.*;
import com.database.connection.Person;
import org.bson.Document;
import org.bson.types.ObjectId;

import javax.print.Doc;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Updates.*;

//https://www.mongodb.com/java

public class MongoConnection {
    private MongoClient client;
    private String data_base_name;
    private String collection_name;
    private String mongo_server_name;
    private String server_ip = "localhost";
    private String server_port = "27017";
    public MongoConnection(){}

    public String get_data_base_name(){return this.data_base_name;}
    public void set_data_base_name(String data_base_name){this.data_base_name = data_base_name;}
    public String get_collection_name(){return this.collection_name;}
    public void set_collection_name(String collection_name){this.collection_name = collection_name;}
    public String get_mongo_server_name(){return this.mongo_server_name;}
    public void set_mongo_server_name(String mongo_server_name){this.mongo_server_name = mongo_server_name;}
    public String get_server_ip(){return this.server_ip;}
    public void set_server_ip(String ip){this.server_ip = ip;}
    public String get_server_port(){return this.server_port;}
    public void set_server_port(String server_port){this.server_port = server_port;}

    private MongoDatabase connect() {
        MongoClient client = MongoClients.create(this.get_mongo_server_name()+"://"+this.get_server_ip()+":"+this.get_server_port());
        return client.getDatabase(this.data_base_name);
    }

    public void insert(Person[] persons){
        MongoDatabase database = connect();
        MongoCollection<Document> docs = database.getCollection(this.get_collection_name());
        for (Person person : persons){
            Document temp = new Document("Name", person.get_person_name()).append("Spans", person.get_times());
            docs.insertOne(temp);
        }
    }

    public List<Person> getData(String collectionName){
        MongoDatabase database = connect();

        MongoCollection<Document> docs = database.getCollection(collectionName);

        FindIterable<Document> listDocs =  docs.find();
        List<Person> listPerson = new ArrayList<Person>();

        for(Document doc : listDocs){
            Person temp = new Person();
            temp.set_name(doc.get("Name").toString().toLowerCase());
            temp.set_times((int)doc.get("Spans"));
            temp.set_filename(collectionName);
            listPerson.add(temp);
        }

        return listPerson;
    }

}