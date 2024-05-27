import Header from "../_lib/_components/Header";
import Menu from "../_lib/_components/Menu";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
            <div style={{paddingLeft: '0px'}}>
                <Header />
                <div style={{paddingTop: '2px', display: 'flex'}}>
                    <Menu />
                    <div style={{paddingLeft: '300px', paddingTop: '30px'}}>
                        {children}
                    </div>
                </div>
            </div>
    )
}