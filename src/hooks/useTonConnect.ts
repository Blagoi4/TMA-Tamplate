import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address, Sender, SenderArguments } from "@ton/core";

export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
  network: string | null;
  address: string | null;
  disconnect: () => void;
} {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  // Функция для отправки транзакций
  const send = async (args: SenderArguments) => {
    tonConnectUI.sendTransaction({
      messages: [
        {
          address: args.to.toString(),
          amount: args.value.toString(),
          payload: args.body?.toBoc().toString("base64"),
        },
      ],
      validUntil: Date.now() + 5 * 60 * 1000,
    });
  };

  // Функция для отключения
  const disconnect = () => {
    tonConnectUI.disconnect();  // Предположим, что такой метод существует
  };

  return {
    sender: { send, address: wallet?.account.address ? Address.parse(wallet?.account.address as string) : undefined },
    connected: tonConnectUI.connected,
    address: wallet?.account.address ?? null,
    network: wallet?.account.chain ?? null,
    disconnect,
  };
}