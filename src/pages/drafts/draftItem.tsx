import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Units } from '../../types/units.type';

export interface IDraftProps {
    reagent: string;
    name: string;
    itemId: string;
    units: Units;
    destination: {
        name: string,
        code: string,
    };
    quan: number;
    test: string;
    date: string;
    
}

const DraftItem: React.FC = () => {

    return (
        <IonCard button>
            <IonCardHeader>
                <IonCardSubtitle>от 28.07.2023 14:15</IonCardSubtitle>
                <IonCardTitle>Аммоний уксуснокислый <br/>id: 277110</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <b>Назначение:</b> 1.001.001.001, Sodium citrate trihydrate<br/>
                <b>Испытание:</b> Quntification and Quntification of different very strange things by high perfomance liquid chromatography
                <IonInput
                    className='ion-margin-top'
                    type='number'
                    label='кол-во, г'
                    placeholder='0,000'
                    labelPlacement='floating'
                    fill='outline'
                />
                <IonButton
                    color='primary'
                    children='Списать'
                    expand='full'
                />
            </IonCardContent>
        </IonCard>    
    );
};

export default DraftItem;