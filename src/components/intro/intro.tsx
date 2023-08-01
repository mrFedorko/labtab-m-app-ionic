import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css'
import logo from '../../assets/logo.svg'
import { IntroSwiperSlide } from './introSwiperSlide';
import './intro.scss'

interface IContainerProps {
    onFinish: () => void;

}

const SwiperButtonNext = ({children}: any) => {
    const swiper = useSwiper();
    return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>
}

const Intro: React.FC<IContainerProps> = ({onFinish}) => {
    return (
        <Swiper>
            <SwiperSlide>
                <img src={logo} alt='alt img 1'/>
                <IonText><h3>some text here 1</h3></IonText>
                <SwiperButtonNext
                    children="ДАЛЬШЕ"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img src={logo} alt='alt img 1'/>
                <IonText><h3>some text here 1</h3></IonText>
                <SwiperButtonNext
                    children="ДАЛЬШЕ"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img src={logo} alt='alt img 1'/>
                <IonText><h3>some text here 1</h3></IonText>
                <IonButton
                    children="ПРОПУСТИТЬ"
                    onClick= {onFinish}
                />
            </SwiperSlide>
        </Swiper>
    );
};

export default Intro;