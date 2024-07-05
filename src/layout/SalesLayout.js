import { NavLink, Outlet } from "react-router-dom";

const SalesLayout = () => {
    return (
        <>
            <div className="rounded-md mt-5 flex justify-between bg-white">
                <div className="text-center block flex-1 ml-0.5">
                    <NavLink 
                        to="/sales" 
                        end
                        className={`block p-3 rounded-md font-semibold bg-gray-200 hover:bg-main-color`}
                        >
                            ملخص عمليات البيع
                    </NavLink>
                </div>
                <div className="text-center rounded-l-md flex-1 ml-0.5">
                    <NavLink
                        to="sales-history"
                        className={`block p-3 rounded-md font-semibold bg-gray-200 hover:bg-main-color`}
                    >
                        تفاصيل عمليات البيع والحذف
                    </NavLink>
                </div>
                <div className="text-center rounded-l-md flex-1">
                    <NavLink
                        to="discounted-sales"
                        className={`block p-3 rounded-md font-semibold bg-gray-200 hover:bg-main-color`}
                    >
                        المبيعات المخفّضة
                    </NavLink>
                </div>
            </div>
            <div className="p-3 mb-2 bg-gray-100 rounded-md mt-11">
                <Outlet />
            </div>
        </>
    );
}

export default SalesLayout;