import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { scan } from 'ionicons/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ScanButton from '../../components/intro/scanButton';

const DescrInfo: React.FC = () => {
    const {itemId, type, standartType, name, CAS, cat, lot, manufacturer, fromDate, toDate, units, restUnits, container, warn, price, isolate, location} = useSelector((state: any) => state.activeReagent)
    const [details, setDetails] = useState(false)

    if(!itemId) {
        return (
            <IonContent>
                <IonLabel
                    children= "Отсканируйте штрих-код, чтобы увидеть информацию"
                />
            </IonContent>
        )
    }

    const handleDetails = () => {
      setDetails(!details);
    }
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'primary'}>
                    <IonButtons slot='start'>
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Информация о реактиве</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonListHeader>
                        <IonLabel>{name}, <p>{itemId}</p></IonLabel>
                        <IonLabel>{type}, {!!standartType && standartType}</IonLabel>
                        <IonButton 
                            color={'secondary'}
                            onClick={handleDetails}
                        >{details ? 'Подробнее' : 'Скрыть'}</IonButton>
                    </IonListHeader>
                    <IonItem>
                        <IonLabel>
                            Остаток: {restUnits}, {units}
                        </IonLabel>
                    </IonItem>
                    {details && <>
                        <IonItem>
                            <IonLabel>: {CAS}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Производитель: {manufacturer}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Кат.№: {cat}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Серия: {lot}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>от {fromDate}  до {toDate}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Расположение{location}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Упаковка: {container} {units}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>{warn}</IonLabel>
                        </IonItem>
                    </>}
                </IonList>
                <ScanButton/>
            </IonContent>
        </IonPage>
    );
};

export default DescrInfo;DescrInfo