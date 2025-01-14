import { t } from "i18next";


interface ConfirmModaleProps {
    onSave: () => void;
    onClose: () => void;
}

export default function ConfirmModale({onSave, onClose}: ConfirmModaleProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="relative w-3/5 bg-bgPrimary p-6 rounded-lg shadow-lg max-w-lg">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 transition-all hover:text-white focus:outline-none border-none"
            >
                &#x2715;
            </button>
            <h2 className="text-white text-3xl mt-5 mb-7 font-thin text-center">Confirm action</h2>
            <div className="mt-6 flex justify-center gap-4">
                <button
                    onClick={onSave}
                    className="bg-red-600 text-white px-6 py-2 rounded-full border-none hover:shadow-lg hover:shadow-slate-700 hover:scale-105 transition"
                >
                    {t("Confirm")}
                </button>
                <button
                    onClick={onClose}
                    className="bg-bgSecondary text-white px-6 py-2 rounded-full border-none"
                >
                    {t("Cancel")}
                </button>
            </div>
        </div>
    </div>
  )
}