import { IonButton, IonText } from "@ionic/react";
import { SwiperSlide, useSwiper, } from "swiper/react";

type introButton = "next" | "finish"

interface IProps {
    onFinish?: () => void;
    image: any;
    altImage: string;
    text: string;
    type: introButton;
}

const SwiperButtonNext = ({children}: any) => {
    const swiper = useSwiper();
    return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>
}

export const IntroSwiperSlide:React.FC<IProps> = ({onFinish, image, altImage, text, type}) => {
    
    
    const handleButton = (type: introButton) => {
        if (type === "finish") {
            return (
                <IonButton
                    onClick={onFinish}
                    children = 'Пропустить'
                    color={'danger'}
                />
            )
        } else {
            return (
                <SwiperButtonNext
                    children = 'Дальше'
                />
            )
        }
    }
    
    return(
        <SwiperSlide>
            <img src={image} alt={altImage}/>
            <IonText><h3>{text}</h3></IonText>
            {handleButton(type)}
        </SwiperSlide>
    )
}