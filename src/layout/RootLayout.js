import { NavLink, Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <>
            <nav className="rounded-md flex justify-between bg-gray-100">
                <div className="text-center block flex-1 ml-0.5">
                    <NavLink 
                        to="/" 
                        className={`block p-3 rounded-md font-semibold hover:bg-main-color`}
                        >
                            الشراء
                    </NavLink>
                </div>
                <div className="text-center rounded-md flex-1">
                    <NavLink
                        to="sales"
                        className={`block p-3 rounded-md font-semibold hover:bg-main-color`}
                    >
                        المبيعات
                    </NavLink>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;