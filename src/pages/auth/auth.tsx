import { IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg'
import Intro from '../../components/intro/intro';
import { Preferences } from '@capacitor/preferences';
import { Device } from '@capacitor/device';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../redux/api/authApi.js';
import { isAuthCh, setCredentials, userIdCh } from '../../redux/store/authSlice';
import { Http, HttpResponse } from '@capacitor-community/http';
import { CapacitorHttp } from '@capacitor/core'
import { HttpMethod, useQuery } from '../../queries/base.query';
import { CapacitorCookies } from '@capacitor/core';

const INTRO_KEY = 'intro-seen'

const Auth: React.FC = () => {

  const router = useIonRouter();

  useEffect(() => {
    const chekStorage = async () => {
      const seen = await Preferences.get({key: INTRO_KEY})
      if (seen.value && parseInt(seen.value)) setIntroSeen(true);
    };
    chekStorage();
  }, [])

  const dispatch = useDispatch();
  const [login, setLogin] = useState('admin');
  const [pass, setPass] = useState('admin');
  const [introSeen, setIntroSeen] = useState(false);
  const [present, dismiss] = useIonLoading();

  const userState = useSelector((state: any) => state.auth)

  const handleAuth = async (e:any) => {
    
    e.preventDefault()
    
    const response: HttpResponse = await useQuery({
      url: '/auth',
      data: {email: login, password: pass},
      method: HttpMethod.POST,
    });
    
    if(response.status !== 200){
      console.log(response.data,'  ', response.status);
      return console.log('request error');
      
    } else {
      console.log('request status ok');
      dispatch(setCredentials({...response.data, email: login}))
      router.push('/app/info')
    }

  };
  
  const handleFinishIntro = () => {
    console.log('finish intro');
    Preferences.set({key: INTRO_KEY, value: '1'})
    setIntroSeen(true);
  }

  const handleAgainIntro = () => {
    setIntroSeen(false);
    Preferences.remove({key: INTRO_KEY});
  }



  return (
    <> {!introSeen ? <Intro onFinish={handleFinishIntro}/> :
      <IonPage>
        <IonHeader>
          <IonToolbar color={'secondary'}>
            <IonTitle className='ion-text-center ion-padding'>
              Вход в систему
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-text-center ion-padding">
          <img 
            src={logo} 
            alt='labtab logo'
            style={{width: '50%'}}
          />
        </div> 
        <IonContent className='ion-justify-content-center ion-align-items-center ion-padding' scrollY={false}>
          <IonCard>
            <IonCardContent>
              <form onSubmit={handleAuth}>
                <IonInput
                  className='ion-margin-top' 
                  label='Логин'
                  type='text'
                  placeholder='логин или e-mail'
                  labelPlacement='floating'
                  fill='outline'
                />
                <IonInput 
                  className='ion-margin-top'
                  label='Пароль'
                  type='password'
                  placeholder='пароль'
                  labelPlacement='floating'
                  fill='outline'
                />
                <IonButton
                  color={'success'}
                  className='ion-margin-top'
                  type='submit'
                  children='Войти'
                  expand='full'
                />
                <IonButton
                  color={'primary'}
                  className='ion-margin-top'
                  children='Сканировать QR-код'
                  expand='full'
                  type='button'
                  routerLink='/setApp'
                  onClick={handleAuth}
                />
                <IonButton
                  color={'medium'}
                  size='small'
                  className='ion-margin-top'
                  children='Посмотреть заново'
                  expand='full'
                  type='button'
                  onClick={handleAgainIntro}
                />
              </form>
            </IonCardContent>
          </IonCard>
        </IonContent>
      
      </IonPage>}
    </>
  );
};

export default Auth;