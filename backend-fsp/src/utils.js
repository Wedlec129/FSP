
//  Функция авторизации в Twitter
async function loginToTwitter(page, username, password ) {
    try {
        console.log('1️⃣ Переход на страницу входа в Twitter...');
        await page.goto('https://x.com/login', { waitUntil: 'networkidle2' });

        console.log('2️⃣ Ожидание поля для логина...');
        await page.waitForSelector('input[autocomplete="username"]', { timeout: 15000 });

        console.log('3️⃣ Ввод логина...');
        await page.type('input[autocomplete="username"]', username, { delay: 100 });

        console.log('4️⃣ Нажатие на кнопку "Далее"...');
        const nextButton = await page.$$('button');
        await nextButton[3].click();

        console.log('5️⃣ Введите капчу, если будет предложено...');

        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        console.log('6️⃣ Ввод пароля...');
        await page.type('input[type="password"]', password, { delay: 100 });

        console.log('7️⃣ Нажатие на кнопку "Войти"...');
        const loginButtons = await page.$$('div[role="button"]');
        await loginButtons[loginButtons.length - 1].click();

        console.log('8️⃣ Ожидание загрузки после авторизации...');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        console.log('✅ Успешный вход в аккаунт Twitter');
    } catch (error) {
        console.error('❌ Ошибка при авторизации в Twitter:', error);
    }
}

//  Прокрутка страницы вниз
async function autoScrollPage(page, existingItems, scrollTime = 10000) {
    const startTime = Date.now();
    console.log(`🔄 Прокрутка страницы в течение ${scrollTime / 1000} секунд...`);
    while (Date.now() - startTime < scrollTime) {
        await page.evaluate(() => window.scrollBy(0, window.innerHeight)); // Прокрутка вниз на 1 экран
        await new Promise(resolve => setTimeout(resolve, 100)); // Ожидание 100 мс
    }
    console.log(`✅ Прокрутка завершена. Всего элементов: ${existingItems.size}`);
}

//  Сбор постов с профиля
async function collectPostsFromProfile(page, username, scrollTime = 10000) {
    try {
        console.log(`1️⃣ Переход на страницу профиля ${username}...`);
        await page.goto(`https://x.com/${username}`, { waitUntil: 'networkidle2' });

        console.log('2️⃣ Ждем загрузки твитов...');
        await page.waitForSelector('article', { timeout: 15000 });

        let posts = new Set();

        const collectPostData = async () => {
            const newPosts = await page.$$eval('article', (articles) => {
                return articles.map((article) => {
                    const tweetContent = article.querySelector('div[lang]') ? article.querySelector('div[lang]').innerText : '';
                    const tweetDate = article.querySelector('time') ? article.querySelector('time').getAttribute('datetime') : '';

                    // 🔥 Исправлен способ извлечения лайков
                    let likesElement = article.querySelector('[data-testid="like"]');
                    let tweetLikes = likesElement ? likesElement.innerText : '0';

                    let retweetsElement = article.querySelector('[data-testid="retweet"]');
                    let retweets = retweetsElement ? retweetsElement.innerText : '0';

                    // Извлекаем все вложения (фото, видео)
                    const mediaElements = article.querySelectorAll('img, video');
                    const mediaUrls = Array.from(mediaElements).map(media => media.src);

                    return {
                        tweetContent,
                        tweetDate,
                        tweetLikes,
                        retweets,
                        mediaUrls
                    };
                });
            });

            newPosts.forEach(post => posts.add(JSON.stringify(post)));
        };

        await collectPostData();

        await autoScrollPage(page, posts, scrollTime);
        await collectPostData();

        const uniquePosts = Array.from(posts).map(post => JSON.parse(post));

        console.log(`3️⃣ ✅ Собрано ${uniquePosts.length} уникальных постов с профиля`);
        return uniquePosts;
    } catch (error) {
        console.error('❌ Ошибка при сборе твитов с профиля:', error);
    }
}

//  Сбор упоминаний из поиска
async function collectMentionsFromSearch(page, query, scrollTime = 10000) {
    try {
        console.log(`4️⃣ Переход на страницу поиска по запросу "${query}"...`);
        await page.goto(`https://x.com/search?q=${encodeURIComponent(query)}&src=typed_query&f=live`, { waitUntil: 'networkidle2' });

        console.log('5️⃣ Ждем загрузки упоминаний...');
        await page.waitForSelector('article', { timeout: 15000 });

        let mentions = new Set();

        const collectMentionData = async () => {
            const newMentions = await page.$$eval('article', (articles) => {
                return articles.map((article) => {
                    const mentionText = article.querySelector('div[lang]') ? article.querySelector('div[lang]').innerText : '';

                    const authorName = article.querySelector('div[dir="ltr"] > span') ? article.querySelector('div[dir="ltr"] > span').innerText : '';

                    // 🕒 Извлечение даты поста
                    const tweetDate = article.querySelector('time') ? article.querySelector('time').getAttribute('datetime') : '';

                    let likesElement = article.querySelector('[data-testid="like"]');
                    let mentionLikes = likesElement ? likesElement.innerText : '0';

                    return {
                        mentionText,
                        authorName,
                        tweetDate,
                        mentionLikes,

                    };
                });
            });

            newMentions.forEach(mention => mentions.add(JSON.stringify(mention)));
        };

        await collectMentionData();
        await autoScrollPage(page, mentions, scrollTime);
        await collectMentionData();

        const uniqueMentions = Array.from(mentions).map(mention => JSON.parse(mention));

        console.log(`6️⃣ ✅ Собрано ${uniqueMentions.length} уникальных упоминаний`);
        return uniqueMentions;
    } catch (error) {
        console.error('❌ Ошибка при сборе упоминаний:', error);
    }
}

module.exports = {
    loginToTwitter: loginToTwitter,
    collectPostsFromProfile: collectPostsFromProfile,
    collectMentionsFromSearch: collectMentionsFromSearch
};


