import { useIonRouter } from "@ionic/react";
import { useSelector } from "react-redux"

export const useProtected = () => {
  const {userId} = useSelector((state:any) => state.auth);
  const router = useIonRouter()
  if(!userId) {
    return () => {
        router.push('/auth');
    }
  }
}