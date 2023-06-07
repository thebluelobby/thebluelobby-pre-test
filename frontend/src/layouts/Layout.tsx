import Sidebar from "../components/Sidebar";

interface iLayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<iLayoutProps> = (props) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            {props.children}
        </div>
    )
};

export default Layout;