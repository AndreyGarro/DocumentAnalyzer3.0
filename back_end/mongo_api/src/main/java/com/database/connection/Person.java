package com.database.connection;

public class Person {
    private int times = 0;
    private String person_name;
    private String filename;

    public Person(){}
    public void add_time(){
        this.times += 1;
    }
    public void set_name(String name){
        this.person_name = name;
    }
    public int get_times(){
        return this.times;
    }
    public void set_times(int times){this.times = times;}
    public String get_person_name(){
        return this.person_name;
    }
    public String get_filename(){
        return this.filename;
    }
    public void set_filename(String filename){this.filename = filename;}
}
