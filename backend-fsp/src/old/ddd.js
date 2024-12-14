// const puppeteer = require('puppeteer');
// const dotenv = require('dotenv');
// dotenv.config(); // Загружаем переменные окружения из .env
//
// // Функция для сбора данных с профиля пользователя
// async function collectPostsFromProfile(page, username) {
//     try {
//         // Переходим на страницу пользователя
//         console.log(`1🔄 Переход на страницу профиля ${username}...`);
//         await page.goto(`https://x.com/${username}`, { waitUntil: 'networkidle2' });
//
//         // Ждем, пока загрузятся твиты
//         console.log('2🔄 Ожидание загрузки твитов...');
//         await page.waitForSelector('article', { timeout: 15000 });
//
//         // Собираем все твиты
//         const posts = await page.$$eval('article', (articles) => {
//             return articles.map((article) => {
//                 const tweetContent = article.querySelector('div[lang]') ? article.querySelector('div[lang]').innerText : '';
//                 const tweetDate = article.querySelector('time') ? article.querySelector('time').getAttribute('datetime') : '';
//                 const tweetLikes = article.querySelector('[aria-label*="likes"]') ? article.querySelector('[aria-label*="likes"]').innerText : '';
//                 const tweetRetweets = article.querySelector('[aria-label*="retweets"]') ? article.querySelector('[aria-label*="retweets"]').innerText : '';
//
//                 return {
//                     tweetContent,
//                     tweetDate,
//                     tweetLikes,
//                     tweetRetweets
//                 };
//             });
//         });
//
//         console.log('3✅ Собрано:', posts);
//         return posts;
//     } catch (error) {
//         console.error('❌ Ошибка при сборе твитов с профиля:', error);
//     }
// }
//
// // Функция для сбора ответов на твиты
// async function collectRepliesFromSearch(page, searchQuery) {
//     try {
//         // Переходим на страницу поиска с результатами для запроса
//         console.log(`4🔄 Переход на страницу поиска для ${searchQuery}...`);
//         await page.goto(`https://x.com/search?q=${encodeURIComponent(searchQuery)}&src=typed_query&f=live`, { waitUntil: 'networkidle2' });
//
//         // Ждем, пока загрузятся твиты и ответы
//         console.log('5🔄 Ожидание загрузки ответов...');
//         await page.waitForSelector('article', { timeout: 15000 });
//
//         // Собираем все ответы на твиты
//         const replies = await page.$$eval('article', (articles) => {
//             return articles.map((article) => {
//                 const replyContent = article.querySelector('div[lang]') ? article.querySelector('div[lang]').innerText : '';
//                 const replyDate = article.querySelector('time') ? article.querySelector('time').getAttribute('datetime') : '';
//                 const replyLikes = article.querySelector('[aria-label*="likes"]') ? article.querySelector('[aria-label*="likes"]').innerText : '';
//
//                 return {
//                     replyContent,
//                     replyDate,
//                     replyLikes
//                 };
//             });
//         });
//
//         console.log('6✅ Собрано:', replies);
//         return replies;
//     } catch (error) {
//         console.error('❌ Ошибка при сборе ответов на твиты:', error);
//     }
// }
//
// // Главная функция для запуска всего процесса
// async function main() {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.setViewport({ width: 1280, height: 800 });
//
//     const username = process.env.TWITTER_EMAIL;
//     const password = process.env.TWITTER_PASSWORD;
//
//     // Выполняем вход в Twitter
//     await loginToTwitter(page, username, password, 'wedlec');
//
//     // Собираем твиты с профиля
//     const posts = await collectPostsFromProfile(page, 'AndriyYermak');
//
//     // Собираем ответы на твиты
//     const replies = await collectRepliesFromSearch(page, '@AndriyYermak');
//
//     console.log('Посты с профиля:', posts);
//     console.log('Ответы на твиты:', replies);
//
//     // Закрываем браузер после выполнения
//     await browser.close();
// }
//
// // Функция авторизации в Twitter
// async function loginToTwitter(page, username, password, nik) {
//     try {
//         // 1️⃣ Переходим на страницу логина
//         console.log('1🔄 Переход на страницу входа в Twitter...');
//         await page.goto('https://x.com/login', { waitUntil: 'networkidle2' });
//
//         // 2️⃣ Подождать, пока появится поле для логина
//         console.log('2🔄 Ожидание поля для логина...');
//         await page.waitForSelector('input[autocomplete="username"]', { timeout: 15000 });
//
//         // 3️⃣ Вводим логин
//         console.log('3🖊️ Ввод логина...');
//         await page.type('input[autocomplete="username"]', username, { delay: 100 });
//
//         // 4️⃣ Нажимаем кнопку "Далее"
//         console.log('4🖱️ Нажатие на кнопку "Далее"...');
//         const nextButton = await page.$$('button');
//         await nextButton[3].click();
//
//         // 5️⃣ Ожидаем капчи, если она есть
//         console.log("5️⃣ Введите капчу, если будет предложено...");
//
//         await page.waitForNavigation({ waitUntil: 'networkidle2' });
//
//         // 6️⃣ Вводим пароль
//         console.log('6🖊️ Ввод пароля...');
//         await page.type('input[type="password"]', password, { delay: 100 });
//
//         // 7️⃣ Нажимаем кнопку "Войти"
//         console.log('7🖱️ Нажатие на кнопку "Войти"...');
//         const loginButtons = await page.$$('div[role="button"]');
//         await loginButtons[loginButtons.length - 1].click();
//
//         // 8️⃣ Ждем, пока страница загрузится после авторизации
//         console.log('8🔄 Ожидание загрузки после авторизации...');
//         await page.waitForNavigation({ waitUntil: 'networkidle2' });
//
//         console.log('9✅ Успешный вход в аккаунт Twitter');
//     } catch (error) {
//         console.error('❌ Ошибка при авторизации в Twitter:', error);
//     }
// }
//
// (async () => {
//     await main();
// })();





///


/ const puppeteer = require('puppeteer');
// const dotenv = require('dotenv');
// dotenv.config(); // Загружаем переменные окружения из .env
//
// // Функция для сбора данных с профиля пользователя
// async function collectPostsFromProfile(page, username) {
//     try {
//         // Переходим на страницу пользователя
//         console.log(`1🔄 Переход на страницу профиля ${username}...`);
//         await page.goto(`https://x.com/${username}`, { waitUntil: 'networkidle2' });
//
//         // Ждем, пока загрузятся твиты
//         console.log('2🔄 Ожидание загрузки твитов...');
//         await page.waitForSelector('article', { timeout: 15000 });
//
//         // Собираем все твиты
//         const posts = await page.$$eval('article', (articles) => {
//             return articles.map((article) => {
//                 const tweetContent = article.querySelector('div[lang]') ? article.querySelector('div[lang]').innerText : '';
//                 const tweetDate = article.querySelector('time') ? article.querySelector('time').getAttribute('datetime') : '';
//                 const tweetLikes = article.querySelector('[aria-label*="likes"]') ? article.querySelector('[aria-label*="likes"]').innerText : '';
//                 const tweetRetweets = article.querySelector('[aria-label*="retweets"]') ? article.querySelector('[aria-label*="retweets"]').innerText : '';
//
//                 return {
//                     tweetContent,
//                     tweetDate,
//                     tweetLikes,
//                     tweetRetweets
//                 };
//             });
//         });
//
//         console.log('3✅ Собрано:', posts);
//         return posts;
//     } catch (error) {
//         console.error('❌ Ошибка при сборе твитов с профиля:', error);
//     }
// }
//
// // Функция для сбора ответов на твиты
// async function collectRepliesFromSearch(page, searchQuery) {
//     try {
//         // Переходим на страницу поиска с результатами для запроса
//         console.log(`4🔄 Переход на страницу поиска для ${searchQuery}...`);
//         await page.goto(`https://x.com/search?q=${encodeURIComponent(searchQuery)}&src=typed_query&f=live`, { waitUntil: 'networkidle2' });
//
//         // Ждем, пока загрузятся твиты и ответы
//         console.log('5🔄 Ожидание загрузки ответов...');
//         await page.waitForSelector('article', { timeout: 15000 });
//
//         // Собираем все ответы на твиты
//         const replies = await page.$$eval('article', (articles) => {
//             return articles.map((article) => {
//                 const replyContent = article.querySelector('div[lang]') ? article.querySelector('div[lang]').innerText : '';
//                 const replyDate = article.querySelector('time') ? article.querySelector('time').getAttribute('datetime') : '';
//                 const replyLikes = article.querySelector('[aria-label*="likes"]') ? article.querySelector('[aria-label*="likes"]').innerText : '';
//
//                 return {
//                     replyContent,
//                     replyDate,
//                     replyLikes
//                 };
//             });
//         });
//
//         console.log('6✅ Собрано:', replies);
//         return replies;
//     } catch (error) {
//         console.error('❌ Ошибка при сборе ответов на твиты:', error);
//     }
// }
//
// // Главная функция для запуска всего процесса
// async function main() {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.setViewport({ width: 1280, height: 800 });
//
//     const username = process.env.TWITTER_EMAIL;
//     const password = process.env.TWITTER_PASSWORD;
//
//     // Выполняем вход в Twitter
//     await loginToTwitter(page, username, password, 'wedlec');
//
//     // Собираем твиты с профиля
//     const posts = await collectPostsFromProfile(page, 'AndriyYermak');
//
//     // Собираем ответы на твиты
//     const replies = await collectRepliesFromSearch(page, '@AndriyYermak');
//
//     console.log('Посты с профиля:', posts);
//     console.log('Ответы на твиты:', replies);
//
//     // Закрываем браузер после выполнения
//     await browser.close();
// }
//
// // Функция авторизации в Twitter
// async function loginToTwitter(page, username, password, nik) {
//     try {
//         // 1️⃣ Переходим на страницу логина
//         console.log('1🔄 Переход на страницу входа в Twitter...');
//         await page.goto('https://x.com/login', { waitUntil: 'networkidle2' });
//
//         // 2️⃣ Подождать, пока появится поле для логина
//         console.log('2🔄 Ожидание поля для логина...');
//         await page.waitForSelector('input[autocomplete="username"]', { timeout: 15000 });
//
//         // 3️⃣ Вводим логин
//         console.log('3🖊️ Ввод логина...');
//         await page.type('input[autocomplete="username"]', username, { delay: 100 });
//
//         // 4️⃣ Нажимаем кнопку "Далее"
//         console.log('4🖱️ Нажатие на кнопку "Далее"...');
//         const nextButton = await page.$$('button');
//         await nextButton[3].click();
//
//         // 5️⃣ Ожидаем капчи, если она есть
//         console.log("5️⃣ Введите капчу, если будет предложено...");
//
//         await page.waitForNavigation({ waitUntil: 'networkidle2' });
//
//         // 6️⃣ Вводим пароль
//         console.log('6🖊️ Ввод пароля...');
//         await page.type('input[type="password"]', password, { delay: 100 });
//
//         // 7️⃣ Нажимаем кнопку "Войти"
//         console.log('7🖱️ Нажатие на кнопку "Войти"...');
//         const loginButtons = await page.$$('div[role="button"]');
//         await loginButtons[loginButtons.length - 1].click();
//
//         // 8️⃣ Ждем, пока страница загрузится после авторизации
//         console.log('8🔄 Ожидание загрузки после авторизации...');
//         await page.waitForNavigation({ waitUntil: 'networkidle2' });
//
//         console.log('9✅ Успешный вход в аккаунт Twitter');
//     } catch (error) {
//         console.error('❌ Ошибка при авторизации в Twitter:', error);
//     }
// }
//
// (async () => {
//     await main();
// })();




//
// const puppeteer = require('puppeteer');
// const dotenv = require('dotenv');
// dotenv.config(); // Загружаем переменные окружения из .env
//
// // 🔥 Автоматическая прокрутка страницы вниз на протяжении заданного времени
// async function autoScrollPage(page, scrollTime = 1000) {
//     const startTime = Date.now();
//     console.log(`🔄 Начало автоматической прокрутки страницы на ${scrollTime / 1000} секунд...`);
//     while (Date.now() - startTime < scrollTime) {
//         await page.evaluate(() => {
//             window.scrollBy(0, window.innerHeight); // Прокручиваем страницу вниз на высоту окна
//         });
//         await new Promise(resolve => setTimeout(resolve, 100)); // Небольшая задержка, чтобы контент успел загрузиться
//     }
//     console.log(`✅ Прокрутка страницы завершена.`);
// }
//
// // 📝 Функция для сбора данных с профиля пользователя
// async function collectPostsFromProfile(page, username, scrollTime = 1000) {
//     try {
//         console.log(`1️⃣ Переход на страницу профиля ${username}...`);
//         await page.goto(`https://x.com/${username}`, { waitUntil: 'networkidle2' });
//
//         console.log('2️⃣ Ждем загрузки твитов...');
//         await page.waitForSelector('article', { timeout: 15000 });
//
//         // 🔥 Листаем страницу вниз в течение scrollTime
//         await autoScrollPage(page, scrollTime);
//
//         // 📝 Собираем все твиты
//         const posts = await page.$$eval('article', (articles) => {
//             return articles.map((article) => {
//                 const tweetContent = article.querySelector('div[lang]') ? article.querySelector('div[lang]').innerText : '';
//                 const tweetDate = article.querySelector('time') ? article.querySelector('time').getAttribute('datetime') : '';
//                 const tweetLikes = article.querySelector('[aria-label*="likes"]') ? article.querySelector('[aria-label*="likes"]').innerText : '';
//                 const tweetRetweets = article.querySelector('[aria-label*="retweets"]') ? article.querySelector('[aria-label*="retweets"]').innerText : '';
//
//                 return {
//                     tweetContent,
//                     tweetDate,
//                     tweetLikes,
//                     tweetRetweets
//                 };
//             });
//         });
//
//         console.log(`3️⃣ ✅ Собрано ${posts.length} твитов`);
//         return posts;
//     } catch (error) {
//         console.error('❌ Ошибка при сборе твитов с профиля:', error);
//     }
// }
//
// // 📝 Функция для сбора ответов на твиты
// async function collectRepliesFromSearch(page, searchQuery, scrollTime = 1000) {
//     try {
//         console.log(`4️⃣ Переход на страницу поиска для ${searchQuery}...`);
//         await page.goto(`https://x.com/search?q=${encodeURIComponent(searchQuery)}&src=typed_query&f=live`, { waitUntil: 'networkidle2' });
//
//         console.log('5️⃣ Ждем загрузки ответов...');
//         await page.waitForSelector('article', { timeout: 15000 });
//
//         // 🔥 Листаем страницу вниз в течение scrollTime
//         await autoScrollPage(page, scrollTime);
//
//         // 📝 Собираем все ответы на твиты
//         const replies = await page.$$eval('article', (articles) => {
//             return articles.map((article) => {
//                 const replyContent = article.querySelector('div[lang]') ? article.querySelector('div[lang]').innerText : '';
//                 const replyDate = article.querySelector('time') ? article.querySelector('time').getAttribute('datetime') : '';
//                 const replyLikes = article.querySelector('[aria-label*="likes"]') ? article.querySelector('[aria-label*="likes"]').innerText : '';
//
//                 return {
//                     replyContent,
//                     replyDate,
//                     replyLikes
//                 };
//             });
//         });
//
//         console.log(`6️⃣ ✅ Собрано ${replies.length} ответов`);
//         return replies;
//     } catch (error) {
//         console.error('❌ Ошибка при сборе ответов на твиты:', error);
//     }
// }
//
// // 🧩 Главная функция для запуска всего процесса
// async function main() {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.setViewport({ width: 1280, height: 800 });
//
//     const username = process.env.TWITTER_EMAIL;
//     const password = process.env.TWITTER_PASSWORD;
//
//     // 🚪 Выполняем вход в Twitter
//     await loginToTwitter(page, username, password, 'wedlec');
//
//     // 📄 Собираем твиты с профиля
//     const posts = await collectPostsFromProfile(page, 'AndriyYermak', 0); // Листать 15 секунд
//
//     // 📄 Собираем ответы на твиты
//     const replies = await collectRepliesFromSearch(page, '@AndriyYermak', 0); // Листать 15 секунд
//
//     console.log('📝 Посты с профиля:', posts);
//     console.log('📝 Ответы на твиты:', replies);
//
//     await browser.close();
// }
//// // 🟢 Запуск основного процесса
// // (async () => {
// //     await main();
// // })();
//
// //
// //
// // const puppeteer = require('puppeteer');
// // const dotenv = require('dotenv');
// // dotenv.config(); // Загружаем переменные окружения из .env
// //
// // // 🔥 Прокрутка страницы вниз
// // async function autoScrollPage(page, existingItems, scrollTime = 10000) {
// //     const startTime = Date.now();
// //     console.log(`🔄 Прокрутка страницы в течение ${scrollTime / 1000} секунд...`);
// //     while (Date.now() - startTime < scrollTime) {
// //         await page.evaluate(() => window.scrollBy(0, window.innerHeight)); // Прокрутка вниз на 1 экран
// //         await new Promise(resolve => setTimeout(resolve, 100)); // Ожидание 100 мс
// //     }
// //     console.log(`✅ Прокрутка завершена. Всего элементов: ${existingItems.size}`);
// // }
// //
// // // 📄 Сбор постов с профиля
// // async function collectPostsFromProfile(page, username, scrollTime = 10000) {
// //     try {
// //         console.log(`1️⃣ Переход на страницу профиля ${username}...`);
// //         await page.goto(`https://x.com/${username}`, { waitUntil: 'networkidle2' });
// //
// //         console.log('2️⃣ Ждем загрузки твитов...');
// //         await page.waitForSelector('article', { timeout: 15000 });
// //
// //         let posts = new Set();
// //
// //         // 📄 Сбор всех постов на экране (до скролла)
// //         const collectPostData = async () => {
// //             const newPosts = await page.$$eval('article', (articles) => {
// //                 return articles.map((article) => {
// //                     const tweetContent = article.querySelector('div[lang]') ? article.querySelector('div[lang]').innerText : '';
// //                     const tweetDate = article.querySelector('time') ? article.querySelector('time').getAttribute('datetime') : '';
// //                     const tweetLikes = article.querySelector('[aria-label*="likes"]') ? article.querySelector('[aria-label*="likes"]').innerText : '';
// //                     const tweetRetweets = article.querySelector('[aria-label*="retweets"]') ? article.querySelector('[aria-label*="retweets"]').innerText : '';
// //
// //                     // Извлекаем все вложения (фото, видео)
// //                     const mediaElements = article.querySelectorAll('img, video');
// //                     const mediaUrls = Array.from(mediaElements).map(media => media.src);
// //
// //                     return {
// //                         tweetContent,
// //                         tweetDate,
// //                         tweetLikes,
// //                         tweetRetweets,
// //                         mediaUrls
// //                     };
// //                 });
// //             });
// //
// //             newPosts.forEach(post => posts.add(JSON.stringify(post)));
// //         };
// //
// //         // 📄 Сначала собираем посты перед скроллом
// //         await collectPostData();
// //
// //         // 🔥 Прокрутка страницы и сбор новых постов
// //         await autoScrollPage(page, posts, scrollTime);
// //         await collectPostData(); // Еще раз собираем данные после скролла
// //
// //         // 📄 Преобразуем Set обратно в массив объектов
// //         const uniquePosts = Array.from(posts).map(post => JSON.parse(post));
// //
// //         console.log(`3️⃣ ✅ Собрано ${uniquePosts.length} уникальных постов с профиля`);
// //         return uniquePosts;
// //     } catch (error) {
// //         console.error('❌ Ошибка при сборе твитов с профиля:', error);
// //     }
// // }
// //
// // // 📄 Сбор упоминаний из поиска
// // async function collectMentionsFromSearch(page, query, scrollTime = 10000) {
// //     try {
// //         console.log(`4️⃣ Переход на страницу поиска по запросу "${query}"...`);
// //         await page.goto(`https://x.com/search?q=${encodeURIComponent(query)}&src=typed_query&f=live`, { waitUntil: 'networkidle2' });
// //
// //         console.log('5️⃣ Ждем загрузки упоминаний...');
// //         await page.waitForSelector('article', { timeout: 15000 });
// //
// //         let mentions = new Set();
// //
// //         // 📄 Сбор всех упоминаний на экране (до скролла)
// //         const collectMentionData = async () => {
// //             const newMentions = await page.$$eval('article', (articles) => {
// //                 return articles.map((article) => {
// //                     const mentionText = article.querySelector('div[lang]') ? article.querySelector('div[lang]').innerText : '';
// //                     const authorName = article.querySelector('div[dir="ltr"] > span') ? article.querySelector('div[dir="ltr"] > span').innerText : '';
// //                     const mentionLikes = article.querySelector('[aria-label*="likes"]') ? article.querySelector('[aria-label*="likes"]').innerText : '';
// //
// //                     return {
// //                         mentionText,
// //                         authorName,
// //                         mentionLikes
// //                     };
// //                 });
// //             });
// //
// //             newMentions.forEach(mention => mentions.add(JSON.stringify(mention)));
// //         };
// //
// //         await collectMentionData();
// //         await autoScrollPage(page, mentions, scrollTime);
// //         await collectMentionData();
// //
// //         const uniqueMentions = Array.from(mentions).map(mention => JSON.parse(mention));
// //
// //         console.log(`6️⃣ ✅ Собрано ${uniqueMentions.length} уникальных упоминаний`);
// //         return uniqueMentions;
// //     } catch (error) {
// //         console.error('❌ Ошибка при сборе упоминаний:', error);
// //     }
// // }
// //
// // // 🔥 Основной процесс
// // async function main() {
// //     const browser = await puppeteer.launch({ headless: false });
// //     const page = await browser.newPage();
// //     await page.setViewport({ width: 1280, height: 800 });
// //
// //     const username = process.env.TWITTER_EMAIL;
// //     const password = process.env.TWITTER_PASSWORD;
// //
// //     await loginToTwitter(page, username, password, 'wedlec');
// //
// //     // 📄 Сбор постов с профиля
// //     const profilePosts = await collectPostsFromProfile(page, 'AndriyYermak', 1500); // Листать 15 секунд
// //
// //     // 📄 Сбор упоминаний
// //     const mentions = await collectMentionsFromSearch(page, '@AndriyYermak', 1500); // Листать 15 секунд
// //
// //     console.log('📝 Посты с профиля:', profilePosts);
// //     console.log('📝 Упоминания о профиле:', mentions);
// //
// //     await browser.close();
// // }
// //
// //
// // // 🟢 Запуск основного процесса
// // (async () => {
// //     await main();
// // })();


//async function parseTwitter(page) {
//     return await page.evaluate(() => {
//         let data = [];
//         let elements = document.querySelectorAll('article');
//         elements.forEach(element => {
//             let postTextElement = element.querySelector('div[lang]');
//             let postText = postTextElement ? postTextElement.innerText : null;
//
//             let timeElement = element.querySelector('time');
//             let time = timeElement ? timeElement.getAttribute('datetime') : null;
//
//             let repliesElement = element.querySelector('[data-testid="reply"]');
//             let replies = repliesElement ? repliesElement.innerText : '0';
//
//             let retweetsElement = element.querySelector('[data-testid="retweet"]');
//             let retweets = retweetsElement ? retweetsElement.innerText : '0';
//
//             let likesElement = element.querySelector('[data-testid="like"]');
//             let likes = likesElement ? likesElement.innerText : '0';
//
//             let mediaUrls = [];
//             let mediaElements = element.querySelectorAll('img[src*="media"]');
//             mediaElements.forEach(media => {
//                 if (media.tagName.toLowerCase() === 'img') {
//                     mediaUrls.push(media.src);
//                 }
//             });
//
//             if (postText || mediaUrls.length > 0) {
//                 data.push({
//                     postText,
//                     time,
//                     replies,
//                     retweets,
//                     likes,
//                     mediaUrls
//                 });
//             }
//         });
//         return data;
//     });
// }
//
// module.exports = parseTwitter;