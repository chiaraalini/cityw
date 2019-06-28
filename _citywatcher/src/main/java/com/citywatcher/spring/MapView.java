package com.citywatcher.spring;

import ch.qos.logback.core.Layout;
import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dependency.JavaScript;
import com.vaadin.flow.component.dependency.StyleSheet;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.dom.Element;
import com.vaadin.flow.dom.ElementFactory;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;


import static com.vaadin.flow.dom.ElementFactory.*;

@Route(value = "Map", layout = MyAppLayoutRouterLayout.class)
@JavaScript("frontend://src/script.js")
@JavaScript("https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js")
@StyleSheet("frontend://styles/style.css")
public class MapView extends Div {


    private Button bt1, bt2;

    private DatabaseConnection dbConnection = new DatabaseConnection();

    public MapView() {
        setId("container");
        HorizontalLayout hor = new HorizontalLayout();

//PROVA QUERY
        Button btn4 = new Button("Prova Query");
        btn4.addClickListener(e -> {
            if (dbConnection.loadMap() == null)
                Notification.show("Error.");
            else Notification.show(dbConnection.loadMap());
        });
        Button btn1 = new Button("Change Radius");
        btn1.addClickListener(e -> {
            getElement().executeJavaScript("changeRadius()");
        });

        Button btn2 = new Button("Change Opacity");
        btn2.addClickListener(e -> {
            getElement().executeJavaScript("changeOpacity()");
        });

        Button btn3 = new Button("Change Gradient");
        btn3.addClickListener(e -> {
            getElement().executeJavaScript("changeGradient()");
        });

        Button filterPm25 = new Button("View PM25");
        filterPm25.addClickListener(e -> {
            getElement().executeJavaScript("filterPM25()");
        });

        Button filterPm10 = new Button("View PM10");
        filterPm10.addClickListener(e -> {
            getElement().executeJavaScript("filterPM10()");
        });

        Button filterCO2 = new Button("View CO2");
        filterCO2.addClickListener(e -> {
            getElement().executeJavaScript("filterCO2()");
        });

        Button filterIqa = new Button("View IQA");
        filterIqa.addClickListener(e -> {
            getElement().executeJavaScript("filterIqa()");
        });

        Button scia = new Button("View scia");
        scia.addClickListener(e -> {
            getElement().executeJavaScript("scia()");
        });

        Button lastPoint = new Button("View lastPoint");
        lastPoint.addClickListener(e -> {
            getElement().executeJavaScript("lastPoint()");
        });

        Button Quartiere = new Button("View Quartiere");
        Quartiere.addClickListener(e -> {
            getElement().executeJavaScript("Quartiere()");
        });

        Label lab = new Label();
        lab.setId("QuartiereAppartenenza");

        hor.setPadding(false);
        hor.setMargin(true);
        hor.setSpacing(true);
        hor.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
        hor.setAlignSelf(FlexComponent.Alignment.CENTER);
        //hor.setId("buttons1");
        hor.add(btn1, btn2, btn3, btn4, filterPm25, filterPm10, filterCO2, filterIqa, scia, lastPoint,Quartiere,lab);
        add(hor);

        Element BsDiv = ElementFactory.createDiv();
        BsDiv.setAttribute("class", "container");
        BsDiv.setAttribute("style", "width: 1500px");
        Element Row = ElementFactory.createDiv();
        Row.setAttribute("class", "row");

        Element mappa = ElementFactory.createDiv();
        mappa.setAttribute("id", "map");
        mappa.setAttribute("class", "col-lg-10");

        Element legenda = ElementFactory.createDiv();
        legenda.setAttribute("id", "legenda");
        legenda.setAttribute("class", "col-lg-2");

        Row.appendChild(mappa);
        Row.appendChild(legenda);
        BsDiv.appendChild(Row);
        getElement().appendChild(BsDiv);
        getElement().executeJavaScript("createMap()");

    }
}