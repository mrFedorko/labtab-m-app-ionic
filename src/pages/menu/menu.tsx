import { IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import UserInfo from '../userInfo/userInfo';
import Drafts from '../drafts/drafts';
import Descr from '../descr/descr';
import { personCircleOutline, flaskOutline, bookOutline } from 'ionicons/icons'

const Menu: React.FC = () => {

    const paths = [
        {name: "Профиль", url: '/app/info', icon: personCircleOutline},
        {name: "Реактивы", url: '/app/descr', icon: flaskOutline},
        {name: "Колонки", url: '/app/columns', icon: bookOutline},
        {name: "Черновики", url: '/app/drafts', icon: bookOutline},

    ]

    return (
        <IonPage>
            <IonMenu contentId='main'>
                <IonHeader>
                    <IonToolbar color={'secondary'}>
                        <IonTitle>Навигация</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    {paths.map((item, index) =>(
                        <IonMenuToggle key = {index}>
                            <IonItem routerLink={item.url} routerDirection='none'>
                                <IonIcon slot='start' icon={item.icon}/>
                                {item.name}
                            </IonItem>
                        </IonMenuToggle>
                    ))}
                </IonContent>
            </IonMenu>
            <IonRouterOutlet id='main'>
                <Route exact path="/app/info" component = {UserInfo}></Route>
                <Route path="/app/drafts" component = {Drafts}></Route>
                <Route path="/app/descr" component = {Descr}></Route>
                <Route exact path="/app" >
                    <Redirect to="/app/info"/>
                </Route>
            </IonRouterOutlet>
        </IonPage>
    );
};

export default Menu;