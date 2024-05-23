import { useNavigate } from "react-router-dom";

const tg = window.Telegram.WebApp;

const useTelegram = () => {
  const navigate = useNavigate();

  const onClose = () => {
    tg.close();
  };

  const backButton = () => {
    tg.BackButton.onClick(() => {
      navigate(-1); 
      tg.BackButton.hide()
    });
  
    tg.BackButton.show();
  };

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show;
    }
  };

  return {
    onClose,
    onToggleButton,
    backButton,
    tg,
    userId: tg.initDataUnsafe?.user,
  };
};

export default useTelegram;
