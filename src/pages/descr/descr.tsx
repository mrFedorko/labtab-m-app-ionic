import { IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import DescrInfo from './descrInfo';
import Scanner from '../scanner/scanner';
import FlowForm from './flowForm';
import { scanCircle, informationCircle, pencil } from 'ionicons/icons'

const Descr: React.FC = () => {

    return (
        <IonTabs >
            <IonTabBar slot='bottom' color={"secondary"}>
                <IonTabButton tab='descrInfo' href='/app/descr/info'>
                    <IonIcon icon={informationCircle}  size='large'color='success'/>
                    <IonLabel>Информация</IonLabel>
                </IonTabButton>
                <IonTabButton tab='descrScan' href='/app/descr/scan'>
                    <IonIcon icon={scanCircle} size='large'color='danger'/>
                    <IonLabel>Сканнер</IonLabel>
                </IonTabButton>
                <IonTabButton  tab='descrFlow' href='/app/descr/flow'>
                    <IonIcon icon={pencil}  size='large'color='light'/>
                    <IonLabel><b>Списать</b></IonLabel>
                </IonTabButton>
            </IonTabBar>

            <IonRouterOutlet>
                <Route path="/app/descr/info" component={DescrInfo}/>
                <Route path="/app/descr/scan" component={Scanner}/>
                <Route path="/app/descr/flow" component={FlowForm}/>
                <Route path="/app/descr" exact>
                    <Redirect to = "/app/descr/info" />
                </Route>
            </IonRouterOutlet>
        </IonTabs>
    );
};

export default Descr