import Navbar from '@/components/dashboard/shared/navbar/Navbar'
import Menu from '@/components/dashboard/shared/menu/Menu'
import Footer from '@/components/dashboard/shared/footer/Footer'

const layout = ({ children }) => {
    return (
        <div className="main">
            <Navbar />
            <div className="container">
                <div className="menuContainer">
                    <Menu />
                </div>
                <div className="contentContainer">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default layout