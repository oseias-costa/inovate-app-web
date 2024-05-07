import Image from "next/image";
import PulseLoader from "react-spinners/PulseLoader";
import LogoI from '@/public/assets/logo-i.png'

export default function Spinner(){
    return(
            <div style={{
            position: 'fixed',
            zIndex: 1000,
            backgroundColor: 'rgb(255,255,255,0.6)',
            width: '100%',
            height: '100%',
            transition: '0.2s linear',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
           }}>
            <div>

              <Image src={LogoI} width={50} alt="Logo" />
            <PulseLoader 
              color="#00264B"
              size={10}
              loading={true}
              />
              </div>
              </div> 
    )
}