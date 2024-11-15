import Header from './Header';

const Layout = ({children}) => {
    return (
        <div className='lay w-full max-h-screen'>
            <Header />
            {children}
        </div>
    )
}

export default Layout;