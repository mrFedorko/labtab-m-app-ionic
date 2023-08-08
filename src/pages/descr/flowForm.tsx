import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ScanButton from '../../components/intro/scanButton';

const FlowForm: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={"primary"}>
                    <IonButtons slot='start'>
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Форма расхода</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <ScanButton/>
            </IonContent>
        </IonPage>
    );
};

export default FlowForm;FlowForm