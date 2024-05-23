import { useEffect } from "react";
import useTelegram from "../hooks/useTelegram";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { backButton } = useTelegram();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    backButton();
    console.log('Settings - Current language:', i18n.language);
  }, [backButton, i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      console.log(`Language changed to: ${lng}`);
    });
  };

  return (
    <div className=" bg-tg-bg-secondary text-tg-text flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">{t("settings")}</h1>
      <div>
        <button
          onClick={() => changeLanguage("en")}
          className="m-2 p-2 bg-blue-500 text-white rounded"
        >
          EN
        </button>
        <button
          onClick={() => changeLanguage("ru")}
          className="m-2 p-2 bg-blue-500 text-white rounded"
        >
          RU
        </button>
      </div>
    </div>
  );
};

export default Settings;