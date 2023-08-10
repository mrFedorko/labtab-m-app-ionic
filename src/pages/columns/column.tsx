import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { informationCircle, pencil, scanCircle } from 'ionicons/icons';
import React from 'react';
import { Redirect, Route } from 'react-router';
import ColumnDescr from './colDescr';
import Scanner from '../scanner/scanner';
import ColumnFlowForm from './colFlow';

const Column: React.FC = () => {

    return (
        <IonTabs >
            <IonTabBar slot='bottom' color={"secondary"}>
                <IonTabButton tab='descrInfo' href='/app/column/info'>
                    <IonIcon icon={informationCircle}  size='large'color='success'/>
                    <IonLabel>Информация</IonLabel>
                </IonTabButton>
                <IonTabButton tab='descrScan' href='/app/column/scan'>
                    <IonIcon icon={scanCircle} size='large'color='danger'/>
                    <IonLabel>Сканнер</IonLabel>
                </IonTabButton>
                <IonTabButton  tab='descrFlow' href='/app/column/flow'>
                    <IonIcon icon={pencil}  size='large'color='light'/>
                    <IonLabel><b>Списать</b></IonLabel>
                </IonTabButton>
            </IonTabBar>

            <IonRouterOutlet>
                <Route path="/app/column/info" component={ColumnDescr}/>
                <Route path="/app/column/scan" component={Scanner}/>
                <Route path="/app/column/flow" component={ColumnFlowForm}/>
                <Route path="/app/column" exact>
                    <Redirect to = "/app/column/info" />
                </Route>
            </IonRouterOutlet>
        </IonTabs>
    );
};

export default Column;