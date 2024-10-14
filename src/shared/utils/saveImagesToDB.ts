interface ImageData {
  dataUrl: string // Изображение хранится в виде строки Base64.
  id: string
}

const DB_NAME = 'imageDB'
const DB_VERSION = 1
const STORE_NAME = 'images'

/**
 * Функция для открытия или создания базы данных IndexedDB
 * @returns {Promise<IDBDatabase>} - Промис, который возвращает базу данных.
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    // Срабатывает, если база данных создается впервые или обновляется до новой версии
    request.onupgradeneeded = event => {
      const db = request.result

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' }) // Создание хранилища с ключом 'id'
      }
    }

    request.onsuccess = () => resolve(request.result) // Успешное открытие базы данных
    request.onerror = () => reject(request.error) // Ошибка при открытии базы данных
  })
}

/**
 * Функция для сохранения одного или нескольких изображений в IndexedDB
 * @param {ImageData | ImageData[]} images - Изображение или массив изображений для сохранения.
 * @returns {Promise<void>} - Промис, который завершится, когда операция сохранения завершена.
 */
export async function saveImagesToDB(images: ImageData | ImageData[]): Promise<void> {
  const db = await openDB() // Открываем базу данных

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite') // Открываем транзакцию
    const store = transaction.objectStore(STORE_NAME) // Получаем доступ к хранилищу

    if (Array.isArray(images)) {
      images.forEach(image => store.put(image)) // Сохраняем каждое изображение из массива
    } else {
      store.put(images) // Сохраняем одно изображение
    }

    transaction.oncomplete = () => resolve() // Транзакция завершена успешно
    transaction.onerror = () => reject(transaction.error) // Ошибка транзакции
  })
}

/**
 * Функция для получения одного или всех изображений из IndexedDB
 * @param {string} [id] - Идентификатор изображения (необязательный). Если указан, вернется конкретное изображение.
 * @returns {Promise<ImageData | ImageData[]>} - Промис, который возвращает одно изображение или массив изображений.
 */
export async function getImagesFromDB(id?: string): Promise<ImageData | ImageData[]> {
  const db = await openDB() // Открываем базу данных

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly') // Открываем транзакцию только для чтения
    const store = transaction.objectStore(STORE_NAME) // Получаем доступ к хранилищу

    if (id) {
      const request = store.get(id) // Получаем изображение по идентификатору

      request.onsuccess = () => resolve(request.result || null) // Успешно получено
      request.onerror = () => reject(request.error) // Ошибка при получении
    } else {
      const request = store.getAll() // Получаем все изображения

      request.onsuccess = () => resolve(request.result) // Успешно получено
      request.onerror = () => reject(request.error) // Ошибка при получении
    }
  })
}
/* Пример использования
  1 Получение всех изображений из базы данных
    async function fetchAndDisplayAllImages() {
    try {
      // Получаем все изображения из базы данных
      const images = await getImagesFromDB();

      if (Array.isArray(images)) {
        // Если изображения найдены, выводим их в консоль или на страницу
        images.forEach(image => {
          console.log('Изображение:', image);

          // Пример добавления изображения на страницу
          const imgElement = document.createElement('img');
          imgElement.src = image.dataUrl; // Используем Base64 строку для отображения изображения
          document.body.appendChild(imgElement); // Добавляем изображение на страницу
        });
      } else {
        console.log('Изображения не найдены');
      }
    } catch (error) {
      console.error('Ошибка при получении изображений:', error);
    }
  }

  // Вызов функции для получения и отображения всех изображений
  fetchAndDisplayAllImages();

  2. Получение конкретного изображения по id
    async function fetchAndDisplayImageById(imageId: string) {
    try {
      // Получаем изображение по его идентификатору
      const image = await getImagesFromDB(imageId);

      if (image) {
        console.log('Изображение найдено:', image);

        // Пример добавления изображения на страницу
        const imgElement = document.createElement('img');
        imgElement.src = image.dataUrl; // Используем Base64 строку для отображения изображения
        document.body.appendChild(imgElement); // Добавляем изображение на страницу
      } else {
        console.log('Изображение с ID не найдено');
      }
    } catch (error) {
      console.error('Ошибка при получении изображения:', error);
    }
  }

  // Вызов функции для получения и отображения изображения по ID
  fetchAndDisplayImageById('your-image-id'); // Подставьте реальный ID изображения

*/

/**
 * Функция для проверки наличия изображений в IndexedDB
 * @param {string} [storeName='images'] - Название хранилища (по умолчанию 'images').
 * @returns {Promise<boolean>} - Промис, который возвращает true, если есть сохраненные изображения, иначе false.
 */
export const checkIfImagesExistInDB = async (storeName: string = 'images'): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION) // Открываем базу данных

    request.onerror = event => {
      console.error('Database error:', event)
      reject(false) // Ошибка при открытии базы данных
    }

    request.onsuccess = event => {
      const db = (event.target as IDBOpenDBRequest).result // Получаем экземпляр базы данных
      const transaction = db.transaction([storeName], 'readonly') // Открываем транзакцию только для чтения
      const objectStore = transaction.objectStore(storeName) // Доступ к хранилищу

      const countRequest = objectStore.count() // Подсчитываем количество записей в хранилище

      countRequest.onsuccess = () => {
        resolve(countRequest.result > 0) // Если количество больше 0, значит изображения есть
      }

      countRequest.onerror = () => {
        console.error('Error counting items in the store')
        reject(false) // Ошибка при подсчете записей
      }
    }
  })
}

/* Проверка происходит вызовом асинхр. функции и дождаться результать надо. Возвращает булево  

let resultIsImage;

async function checkImages() {
  const ifExistsImages = async function isImageExistsInDB() {
    const imagesExist = await checkIfImagesExistInDB();
    return imagesExist;
  };

  const result = await ifExistsImages(); // Дожидаемся результата
  resultIsImage = result; // true или false

  console.log(resultIsImage); // Выводим результат после того, как он будет получен
}

checkImages(); // Вызываем асинхронную функцию

 */

/* BONUS: проверка что ввобще в базе данных сидит

  export async function whatIsInDB(images: ImageData | ImageData[]): Promise<void> {
  const db = await openDB(); // Открываем базу данных

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite'); // Открываем транзакцию
    const store = transaction.objectStore(STORE_NAME); // Получаем доступ к хранилищу

    if (Array.isArray(images)) {
      images.forEach(image => {
        console.log('Сохранение изображения:', image); // Log what is in DB
      });
    } else {
      console.log('Сохранение изображения:', images); // Log what is in DB
    }

    transaction.oncomplete = () => resolve(); // Транзакция завершена успешно
    transaction.onerror = () => reject(transaction.error); // Ошибка транзакции
  });
}

*/
