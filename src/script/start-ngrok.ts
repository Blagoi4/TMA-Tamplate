import ngrok from 'ngrok';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Определяем __dirname в контексте ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async function() {
  // Подключаемся к ngrok
  const url = await ngrok.connect(8080);
  console.log('NGROK URL:', url);

  // Опционально: обновление переменных среды (не рекомендуется для продакшена)
  process.env.NGROK_URL = url;

  // Обновление файла конфигурации
  const configFile = join(__dirname, 'src', 'config.js');
  const configData = `export const API_URL = '${url}';`;
  writeFileSync(configFile, configData);

  console.log('Updated config file with ngrok URL');
})();