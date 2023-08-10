import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonAlert, useIonRouter, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import { useAuthQuery } from '../../queries/base.query';
import { useDispatch,  } from 'react-redux';
import { reagentFill } from '../../redux/store/activeReagSlice';
import { columnFill } from '../../redux/store/activeColumnSlice';
import './scanner.scss'

const Scanner: React.FC = () => {

  useIonViewDidEnter(() => {
    askUser();
  });

  useIonViewWillLeave(() => {
    stopScan();
  });

  const [presentAlert] = useIonAlert();
  
  const dispatch = useDispatch();
  const authQuery = useAuthQuery()
  const router = useIonRouter();
  const handleGetReagent = async (id: number | string) => {
    
    const response = await authQuery({
      url: `/reagent/getOneById/${id}`,
    });

    const colResponse = await authQuery({
      url: `/column/getOneById/${id}`
    });
    
    if(response?.status === 200 && response.data?.reagent){
      dispatch(reagentFill(response.data.reagent));
      router.push('/app/descr/info');
    } else if (colResponse?.status === 200 && colResponse.data?.column ){
      dispatch(columnFill(colResponse.data.column));
      router.push('/app/column/info');
    } else {
      presentAlert({
        header: 'Не найдено',
        subHeader: 'Не найден реактив с данным ID. Попробуйте еще раз',
        message: 'Возможно кто-то удалил его до вас',
        buttons: [
          {
            text: "Назад",
            handler: () => router.push('/app/descr/info'),
            role: "cancel"
          },
          {
            text: "Еще раз",
            handler: () => {startScan(); return true},
            role:"confirm"
          }
        ],
      })
    }
  }

    const prepare = () => {
        BarcodeScanner.prepare();
      };
      
      const startScan = async () => {
        const body = document.querySelector('body')
        if (body){
            body.classList.add('scanner-active');
        }
        BarcodeScanner.hideBackground();
        
        const result = await BarcodeScanner.startScan();
        if (result.hasContent) {
            await handleGetReagent(result.content)
            stopScan();
        }
      };
      
      const stopScan = () => {
        const body = document.querySelector('body')
        if (body){
            body.classList.remove('scanner-active');
        }
        BarcodeScanner.showBackground();
        BarcodeScanner.stopScan();

      };
      
      const askUser = () => {
        prepare();
      
        const c = confirm('Сканировать штрих-код?');
      
        if (c) {
          startScan();
        } else {
          stopScan();
        }
      };
      

    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'primary'}>
                    <IonButtons slot='start'>
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Сканировать код...</IonTitle>
                    
                </IonToolbar>
                <IonContent className="ion-justify-content-center ion-align-items-center ">
                    <IonCard className='scanner-card'>

                    </IonCard>
                </IonContent>
            </IonHeader>
        </IonPage>
    );
};

export default Scanner;