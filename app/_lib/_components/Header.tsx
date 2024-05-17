import Image from "next/image"
import Logo from '@/public/auth/logo-clean.png'

export default function Header(){
    return(
        <header style={styles.container}>
            <Image src={Logo} style={styles.logo} alt="" />
        </header>
    )
}

const styles = {
    container: {
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        height: '72px',
        paddingLeft: '28px',
        width: '100vw'
    },
    logo: {
        height: '60px',
        width: 'auto',
        paddingLeft: '8px',
        marginLeft: '0 auto',
        marginRight: '0 auto',
        marginTop: 'auto'
    },
}