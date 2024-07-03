const Popup = ({text, options, confirmFun, closePopupFun, className}) => {
    return (
    <div className={`${className} fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col h-fit min-w-56 w-fit max-w-full p-5 mx-auto text-center bg-white rounded-lg drop-shadow-2xl`}>
        <p className="mb-5 font-semibold">{text}</p>
        {!options && (
            <button
            className="text-white bg-green-500 w-fit mx-auto px-3 py-1 rounded-lg font-bold hover:bg-green-600"
            onClick={() => closePopupFun()}
            >
            تم
            </button>
        )}
        {options && (
            <div className="w-fit mx-auto">
                <button
                    className="text-white bg-green-500 w-fit ml-10 px-2 py-1 rounded-lg font-bold hover:bg-green-600"
                    onClick={() => confirmFun()}
                >
                    إتمام
                </button>
                <button
                    className="text-white bg-red-500 w-fit mr-10 px-2 py-1 rounded-lg font-bold hover:bg-red-600"
                    onClick={(e) => closePopupFun()}
                >
                    إلغاء
                </button>
            </div>
        )}
    </div>
    );
}

export default Popup;