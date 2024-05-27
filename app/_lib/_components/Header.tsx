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
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        paddingLeft: '28px',
        width: '100vw'
    },
    logo: {
        height: '50px',
        width: 'auto',
        paddingLeft: '58px',
        marginRight: '0 auto',
        marginTop: 'auto'
    },
}