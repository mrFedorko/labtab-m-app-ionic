import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInput, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { stringifyRole } from '../../utils/stringifyRole';
import ScanButton from '../../components/intro/scanButton';

const UserInfo: React.FC = () => {
    const { email, phone, role, name, direction, department, position } = useSelector((state: any) => state.auth)
    
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'primary'}>
                    <IonButtons slot='start'>
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Ваш профиль</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonCard button>
                <IonCardHeader>
                    <IonCardSubtitle>{department} | {direction}</IonCardSubtitle>
                    <IonCardSubtitle>{position}</IonCardSubtitle>
                    <IonCardTitle>{name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <b>Логин:</b> {email}<br/>
                    <b>Телефон:</b> {phone} <br/>
                    <b>Ваши права:</b> {stringifyRole(role)} <br/>
                    <IonButton
                        color='primary'
                        children='Выйти'
                        expand='full'
                    />
                </IonCardContent>
            </IonCard>
            <ScanButton/>
            </IonContent>
        </IonPage>
    );
};

export default UserInfo;