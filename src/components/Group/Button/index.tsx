interface ButtonProps {
  t: (key: string) => string;
  handleOpenList: () => void;
}

const Button = ({ t, handleOpenList }: ButtonProps) => {
  return (
    <button
      onClick={handleOpenList}
      className="py-4 px-16 rounded-2xl text-lg min-w-[350px] border border-gray-300 cursor-pointer whitespace-nowrap"
      style={{
        backgroundColor: "var(--tg-theme-button-color)",
        color: "var(--tg-theme-button-text-color)",
      }}
    >
      {t("Open List Chat")}
    </button>
  );
};

export default Button;
