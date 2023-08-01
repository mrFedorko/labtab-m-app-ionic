import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import DraftItem from './draftItem';

const Drafts: React.FC = () => {

    return (
        <IonPage>
            <IonHeader >

                <IonToolbar color={'primary'}>
                    <IonButtons slot='start'>
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Drafts</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonSearchbar placeholder='Введите наименование'/>
                <DraftItem/>
                <DraftItem/>
                <DraftItem/>
            </IonContent>
        </IonPage>
    );
};

export default Drafts;