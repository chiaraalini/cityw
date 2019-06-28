package com.citywatcher.spring;


import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.login.AbstractLogin;
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.router.NavigationEvent;
import com.vaadin.flow.router.Router;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.server.InvalidRouteConfigurationException;
import org.springframework.beans.factory.annotation.Autowired;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.PWA;

import java.util.Set;

@Route
@PWA(name = "Project Base for Vaadin Flow with Spring", shortName = "Project Base")
public class MainView extends VerticalLayout {

    private String user="myuser";
    private String pass="mypass";
    public MainView() {

        VerticalLayout layout = new VerticalLayout();
        LoginForm log = new LoginForm();

        log.addLoginListener(e -> {
            boolean isAuthenticated = authenticate(e);

            if (isAuthenticated) {
                navigateToMainPage();
            } else {
                log.setError(true);
            }
        });


        add(log);
        setAlignItems(FlexComponent.Alignment.CENTER);
    }
    @SuppressWarnings("unused")
    private boolean authenticate(AbstractLogin.LoginEvent e) {
        if(e.getUsername().equals(user) && e.getPassword().equals(pass)) return true;
        else return false;

    }
    private void navigateToMainPage() {

            UI.getCurrent().navigate("Map");



    }


}