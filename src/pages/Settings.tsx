import { useEffect } from "react";
import useTelegram from "../hooks/useTelegram";
import { useTonConnect } from "../hooks/useTonConnect";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
const Settings = () => {
  const { backButton } = useTelegram();
  const { t, i18n } = useTranslation();
  const { disconnect } = useTonConnect();

  useEffect(() => {
    backButton();
    console.log("Settings - Current language:", i18n.language);
  }, [backButton, i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n
      .changeLanguage(lng)
      .then(() => console.log(`Language changed to: ${lng}`));
  };

  return (
    <div className="bg-tg-bg-theme text-tg-text flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">{t("settings")}</h1>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => changeLanguage("en")}
          style={{ margin: 8 }}
        >
          EN
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => changeLanguage("ru")}
          style={{ margin: 8 }}
        >
          RU
        </Button>
        <div className="flex justify-center pt-5">
          <Link to='/TWA-Template'>
          <Button
            variant="contained"
            color="secondary"
            onClick={disconnect}
            style={{ margin: 8 }}
          >
            {t("disconnect")}
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
