import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const SetApp: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/'/>

                    </IonButtons>
                    <IonTitle>Отсканируйте QR-код</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                UI goes here...
            </IonContent>
        </IonPage>
    );
};

export default SetApp;