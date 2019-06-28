package com.citywatcher.spring;

import com.github.appreciated.app.layout.behaviour.Behaviour;
import com.github.appreciated.app.layout.builder.AppLayoutBuilder;
import com.github.appreciated.app.layout.component.appbar.AppBarBuilder;
import com.github.appreciated.app.layout.component.menu.left.builder.LeftAppMenuBuilder;
import com.github.appreciated.app.layout.component.menu.left.builder.LeftSubMenuBuilder;
import com.github.appreciated.app.layout.component.menu.left.items.LeftClickableItem;
import com.github.appreciated.app.layout.component.menu.left.items.LeftHeaderItem;
import com.github.appreciated.app.layout.component.menu.left.items.LeftNavigationItem;
import com.github.appreciated.app.layout.entity.DefaultBadgeHolder;
import com.github.appreciated.app.layout.notification.DefaultNotificationHolder;
import com.github.appreciated.app.layout.notification.component.AppBarNotificationButton;
import com.github.appreciated.app.layout.notification.entitiy.DefaultNotification;
import com.github.appreciated.app.layout.router.AppLayoutRouterLayout;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.router.Route;

import static com.github.appreciated.app.layout.entity.Section.FOOTER;
import static com.github.appreciated.app.layout.entity.Section.HEADER;
@Route
@Push
public class MyAppLayoutRouterLayout extends AppLayoutRouterLayout {
    /**
     * Do not initialize here. This will lead to NPEs
     */
    private DefaultNotificationHolder notifications;
    private DefaultBadgeHolder badge;
    public MyAppLayoutRouterLayout() {

        //MapView mappa = new MapView();

       /* notifications = new DefaultNotificationHolder(newStatus -> {
        });
        badge = new DefaultBadgeHolder(5);
        for (int i = 1; i < 6; i++) {
            notifications.addNotification(new DefaultNotification("Test title" + i, "A rather long test description ..............." + i));
        }*/
      // LeftNavigationItem menuEntry = new LeftNavigationItem("Menu", VaadinIcon.MENU.create(),  MainView.class);
        //badge.bind(menuEntry.getBadge());
        init(AppLayoutBuilder
                .get(Behaviour.LEFT_RESPONSIVE_HYBRID)
                .withTitle("City Watcher")
                .withAppBar(AppBarBuilder.get()
                        //.add(new AppBarNotificationButton<>(VaadinIcon.BELL, notifications))
                        .build())
                .withAppMenu(LeftAppMenuBuilder.get()

                        //.addToSection(new LeftHeaderItem("","",""), HEADER)
                        .addToSection(new LeftNavigationItem("Map", VaadinIcon.MAP_MARKER.create(),  MapView.class), HEADER)
                       // .addToSection(new LeftClickableItem("Impostazioni", VaadinIcon.COG.create(), clickEvent -> Notification.show("onClick ...")), HEADER)
                        .add(LeftSubMenuBuilder.get("Menu Admin", VaadinIcon.COG.create())
                                //.add(LeftSubMenuBuilder.get("My Submenu", VaadinIcon.PLUS.create())
                                        .add(new LeftNavigationItem("Gestione stazioni mobili", VaadinIcon.COG.create(), MainView.class))
                                        .add(new LeftNavigationItem("Gestione rilevazione", VaadinIcon.COG.create(),  MainView.class))
                                        .add(new LeftNavigationItem("Gestione account", VaadinIcon.COG.create(),  MainView.class))
                                        .build())
                                //.add(new LeftNavigationItem("Contact1", VaadinIcon.CONNECT.create(),  MainView.class))
                                //.add(new LeftNavigationItem("More1", VaadinIcon.COG.create(),  MainView.class))
                                //.build())
                        //.add(menuEntry)
                        .addToSection(new LeftNavigationItem("Log Out", VaadinIcon.ARROW_BACKWARD.create(), MainView.class), FOOTER)
                        .build())

                .build());
    }
}
