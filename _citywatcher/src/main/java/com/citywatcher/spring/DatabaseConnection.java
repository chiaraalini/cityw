package com.citywatcher.spring;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DatabaseConnection {

    private String hostName = "citywatcher.database.windows.net";
    private String dbName = "CityWatcher_db";
    private String user = "myuser";
    private String password = "mypass_0";
    private String url = String.format("jdbc:sqlserver://%s:1433;database=%s;user=%s;password=%s;encrypt=true;"
            + "hostNameInCertificate=*.database.windows.net;loginTimeout=30;", hostName, dbName, user, password);

    private Connection connection = null;

    String provaQuery = null;

    public String loadMap(){

        provaQuery = null;
        // 1. recupero info filtri

        // 2. scrivo la query
        String query = "SELECT pcw.timestamp, pcw.id "+
                "FROM pollutioncitywatcher_watcherdata as pcw "+
                "WHERE pcw.id = 3";

        // 3. provo ad aprire connessione ed eseguire query
        try {
            connection = DriverManager.getConnection(url);

            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query);

            //PROVA STAMPA DATI
            //System.out.println(resultSet.toString());

            //provaQuery = "Grande, la query funziona! :)";
            while(resultSet.next())
            {
                if(provaQuery == null)
                    provaQuery = resultSet.getString(1) + ", " + resultSet.getString(2) + "; ";
                else
                    provaQuery = provaQuery + resultSet.getString(1) + ", " + resultSet.getString(2) + "; ";
            }

            connection.close();
        }
        catch(Exception e){
            e.printStackTrace();
        }

        return provaQuery;

        // 4. richiamo js per visualizzare la mappa
    }
}
