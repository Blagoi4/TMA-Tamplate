import { useEffect } from "react";
import useTelegram from "../hooks/useTelegram";
// import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { backButton } = useTelegram();

  useEffect(() => {
    backButton();
  }, [backButton]);

  return (
    <div className="App">
      <h1>Настройки</h1>
    </div>
  );
};

export default Settings;
