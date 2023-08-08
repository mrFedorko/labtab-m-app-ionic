import {  IonFab, IonFabButton,  IonIcon, useIonRouter, } from '@ionic/react';
import { scan } from 'ionicons/icons';
import React from 'react';

const ScanButton: React.FC = () => {

    const router = useIonRouter()

    const handleScanBtn = () => {
      router.push('/app/descr/scan')
    }

    return (
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton onClick={handleScanBtn}>
                <IonIcon icon={scan}></IonIcon>
            </IonFabButton>
        </IonFab>
    );
};

export default ScanButton;