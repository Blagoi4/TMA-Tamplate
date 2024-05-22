import { useNavigate } from "react-router-dom";

const tg = window.Telegram.WebApp;

const useTelegram = () => {
  const navigate = useNavigate();

  const onClose = () => {
    tg.close();
  };

  const backButton = () => {
    // Установить обработчик нажатия на кнопку назад
    tg.BackButton.onClick(() => {
      navigate(-1); // Переход на предыдущую страницу
    });
    // Показать кнопку назад
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
