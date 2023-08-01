import { IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg'
import Intro from '../../components/intro/intro';
import { Preferences } from '@capacitor/preferences';
import { Device } from '@capacitor/device';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../redux/api/authApi.js';
import { isAuthCh, setCredentials, userIdCh } from '../../redux/store/authSlice';


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

  const [login, setLogin] = useState('3@mail.ru');
  const [pass, setPass] = useState('123123');
  const [introSeen, setIntroSeen] = useState(false);
  const [present, dismiss] = useIonLoading();
  const dispatch = useDispatch();
  const [logging, _ ] = useLoginMutation();

  const handleAuth = async (e: any) => {
    
    e.preventDefault();
    
    console.log('logging...');


    setTimeout(async () => {
      dismiss();
    }, 2000);
    const id = Device.getId();
    console.log(id)
    

  };

  const handleLogin = async (e: any) =>  {
      e.preventDefault();
      console.log('logging...');

      if(!login || !pass){
         console.log('error')
         return
      }
      console.log(login, pass);
      try {
        const userData = await logging({email: login, password: pass}).unwrap();
            dispatch(setCredentials({...userData, email:login}));
            dispatch(isAuthCh(true));
            dispatch(userIdCh(userData));
            setLogin('');
            setPass('');
            router.push('/app', 'forward')
          
      } catch (error) {
          console.log(error);
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
              <form onSubmit={handleLogin}>
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