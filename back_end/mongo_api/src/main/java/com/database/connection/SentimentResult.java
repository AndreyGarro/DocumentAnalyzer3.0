package com.database.connection;

public class SentimentResult {
    private String sentiment;
    private float score;
    private String filename;

    public SentimentResult(){}

    public String get_sentiment(){
        return this.sentiment;
    }
    public void set_sentiment(String sentiment){this.sentiment = sentiment;
    }
    public float get_score(){
        return this.score;
    }
    public void set_score(float score){this.score = score;}

    public String get_filename(){
        return this.filename;
    }
    public void set_filename(String filename){this.filename = filename;}
}