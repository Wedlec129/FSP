const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');
const {loginToTwitter,collectPostsFromProfile,collectMentionsFromSearch} = require('./utils');

const dotenv = require('dotenv');
dotenv.config(); // Загружаем переменные окружения из .env

const app = express();
const PORT = 3005;

app.use(cors());
app.use(express.json());

// http://localhost:3005/api/posts/
app.post('/api/posts', async (req, res) => {

    const { url , time} = req.body; //AndriyYermak 1500

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    const username = process.env.TWITTER_EMAIL;
    const password = process.env.TWITTER_PASSWORD;

    await loginToTwitter(page, username, password,);

    const profilePosts = await collectPostsFromProfile(page, url, time);
    const mentions = await collectMentionsFromSearch(page, `@${url}`, time);

    console.log('📝 Посты с профиля:', profilePosts);
    console.log('📝 Упоминания о профиле:', mentions);

    await browser.close();

    const data = {
        posts: profilePosts,
        mentions: mentions
    }
    res.json(data)

});


app.get('/api/posts', async (req, res) => {

    res.json({
        "posts": [
            {
                "tweetContent": "Thank you, Bono and \n@U2\n ",
                "tweetDate": "2024-12-11T09:43:46.000Z",
                "tweetLikes": "1 тыс.",
                "retweets": "236\n237",
                "mediaUrls": [
                    "https://pbs.twimg.com/profile_images/1799873368264470528/i1DOJkkH_normal.jpg",
                    "https://abs-0.twimg.com/emoji/v2/svg/1f1fa-1f1e6.svg",
                    "",
                    "https://pbs.twimg.com/ext_tw_video_thumb/1866780555360059392/pu/img/qnynfqB4BPSL4oxM.jpg"
                ]
            },
            {
                "tweetContent": "",
                "tweetDate": "2024-12-10T19:03:14.000Z",
                "tweetLikes": "473",
                "retweets": "56",
                "mediaUrls": [
                    "https://pbs.twimg.com/profile_images/1799873368264470528/i1DOJkkH_normal.jpg",
                    "https://abs-0.twimg.com/emoji/v2/svg/1f4aa.svg",
                    "https://abs-0.twimg.com/emoji/v2/svg/1f4aa.svg",
                    "https://pbs.twimg.com/profile_images/1522252138390380546/bk6GtO6v_mini.jpg"
                ]
            },
            {
                "tweetContent": "У рамках ініціативи Президента України \n@BringKidsBackUA\n ще п’ятеро українських дітей разом із родинами повернулися на підконтрольну територію України.\n\nВдячний командам Офісу, Офісу Омбудсмана та усім залученим, хто зробив це повернення можливим.\n\n#BringKidsBack",
                "tweetDate": "2024-12-10T04:31:46.000Z",
                "tweetLikes": "499",
                "retweets": "75",
                "mediaUrls": [
                    "https://pbs.twimg.com/profile_images/1799873368264470528/i1DOJkkH_normal.jpg",
                    "https://pbs.twimg.com/media/GeaSVzrXEAAuz7f?format=jpg&name=small"
                ]
            },
            {
                "tweetContent": "У межах ініціативи Президента України \n@BringKidsBackUA\n вдалося повернути додому сина української військовослужбовиці, який залишався в окупації останні три роки. \n\nВдячний нашим партнерам Українській мережі за права дитини за організацію цього повернення!\n\n#BringKidsBack",
                "tweetDate": "2024-12-09T11:47:05.000Z",
                "tweetLikes": "352",
                "retweets": "44",
                "mediaUrls": [
                    "https://pbs.twimg.com/profile_images/1799873368264470528/i1DOJkkH_normal.jpg",
                    "https://pbs.twimg.com/media/GeWsY05XQAAxIML?format=jpg&name=small"
                ]
            },
            {
                "tweetContent": "During a stopover in London on my way from the United States, I met with the National Security Advisor to the Prime Minister of the United Kingdom, Jonathan Powell.\n\nDuring the meeting, we discussed strengthening defense cooperation between Ukraine and the United Kingdom.",
                "tweetDate": "2024-12-06T17:11:29.000Z",
                "tweetLikes": "430",
                "retweets": "58",
                "mediaUrls": [
                    "https://pbs.twimg.com/profile_images/1799873368264470528/i1DOJkkH_normal.jpg",
                    "https://pbs.twimg.com/media/GeIZ3WuXEAAbH4A?format=jpg&name=small"
                ]
            },
            {
                "tweetContent": "Particular attention was paid to the efforts needed to achieve a sustainable and just peace based on the Peace Formula proposed by President \n@ZelenskyyUa\n.\n\nWe also exchanged views on the results of the Ukrainian delegation’s visit to the United States.",
                "tweetDate": "2024-12-06T17:11:29.000Z",
                "tweetLikes": "58",
                "retweets": "9",
                "mediaUrls": [
                    "https://pbs.twimg.com/profile_images/1799873368264470528/i1DOJkkH_normal.jpg"
                ]
            },
            {
                "tweetContent": "Під час зупинки в Лондоні дорогою зі США зустрівся з радником Прем’єр-міністра Великої Британії з питань національної безпеки Джонатаном Пауеллом. \n\nНа зустрічі обговорили зміцнення оборонної співпраці між Україною та Великою Британією.",
                "tweetDate": "2024-12-06T17:10:38.000Z",
                "tweetLikes": "241",
                "retweets": "29",
                "mediaUrls": [
                    "https://pbs.twimg.com/profile_images/1799873368264470528/i1DOJkkH_normal.jpg",
                    "https://pbs.twimg.com/media/GeIZq2bWsAA7BQU?format=jpg&name=small"
                ]
            },
            {
                "tweetContent": "Окрема увага – зусиллям, яких слід докласти, щоб досягнути сталого та справедливого миру на основі Формули миру, запропонованої Президентом \n@ZelenskyyUa\n.\n\nТакож обмінялися думками щодо результатів візиту української делегації до США.",
                "tweetDate": "2024-12-06T17:10:39.000Z",
                "tweetLikes": "36",
                "retweets": "5",
                "mediaUrls": [
                    "https://pbs.twimg.com/profile_images/1799873368264470528/i1DOJkkH_normal.jpg"
                ]
            },
            {
                "tweetContent": "Brazilian parliamentarians who visited Kyiv held debates in support of Ukraine. This is very important for us.\n\nThank you. Joga bonito",
                "tweetDate": "2024-12-06T08:10:57.000Z",
                "tweetLikes": "3 тыс.",
                "retweets": "461",
                "mediaUrls": [
                    "https://pbs.twimg.com/profile_images/1799873368264470528/i1DOJkkH_normal.jpg",
                    "https://abs-0.twimg.com/emoji/v2/svg/1f91d.svg",
                    "https://abs-0.twimg.com/emoji/v2/svg/1f1e7-1f1f7.svg",
                    "https://abs-0.twimg.com/emoji/v2/svg/1f1fa-1f1e6.svg",
                    "",
                    "https://pbs.twimg.com/ext_tw_video_thumb/1864945572286771200/pu/img/etgiyFHstrsNTqcF.jpg"
                ]
            },
            {
                "tweetContent": "З Днем ЗСУ \n\nДякую Вам за Україну ",
                "tweetDate": "2024-12-06T06:56:24.000Z",
                "tweetLikes": "904",
                "retweets": "91",
                "mediaUrls": [
                    "https://pbs.twimg.com/profile_images/1799873368264470528/i1DOJkkH_normal.jpg",
                    "https://abs-0.twimg.com/emoji/v2/svg/1fa96.svg",
                    "https://abs-0.twimg.com/emoji/v2/svg/1f1fa-1f1e6.svg"
                ]
            },
            {
                "tweetContent": " Washington, New York, Florida. Two days of meetings with key members of \n@realDonaldTrump\n’s team and U.S. business circles. No names yet — a gentleman’s agreement ;)",
                "tweetDate": "2024-12-05T21:56:32.000Z",
                "tweetLikes": "712",
                "retweets": "149",
                "mediaUrls": [
                    "https://pbs.twimg.com/profile_images/1799873368264470528/i1DOJkkH_normal.jpg",
                    "https://abs-0.twimg.com/emoji/v2/svg/1f1fa-1f1e6.svg",
                    "https://abs-0.twimg.com/emoji/v2/svg/1f1fa-1f1f8.svg",
                    "https://pbs.twimg.com/media/GeERhNBXIAAREtG?format=jpg&name=small"
                ]
            },
            {
                "tweetContent": "Additionally, I met with the Veterans Caucus, congressmen, senators, military veterans, and representatives of the Democratic Party. I was pleased to meet \n@RepJeffries\n, the leader of the Democratic Party in the U.S. House of Representatives.",
                "tweetDate": "2024-12-05T21:56:36.000Z",
                "tweetLikes": "87",
                "retweets": "8",
                "mediaUrls": [
                    "https://pbs.twimg.com/profile_images/1799873368264470528/i1DOJkkH_normal.jpg"
                ]
            }
        ],
        "mentions": [
            {
                "mentionText": "",
                "authorName": "kuti lászló",
                "tweetDate": "2024-12-12T05:03:16.000Z",
                "mentionLikes": ""
            },
            {
                "mentionText": "",
                "authorName": "those_eyes",
                "tweetDate": "2024-12-12T04:42:15.000Z",
                "mentionLikes": ""
            },
            {
                "mentionText": "Цікаво, а чому обдовбаний нарік-\n@ZelenskyyUa\n з сцуками московського урода-\n@AndriyYermak\n вважають, що списки є лише у Портнова?",
                "authorName": "Nezabuta",
                "tweetDate": "2024-12-12T04:11:02.000Z",
                "mentionLikes": "1"
            },
            {
                "mentionText": "@AndriyYermak\n take a bow, no Sean Penn.",
                "authorName": "aLLiSoN",
                "tweetDate": "2024-12-12T01:38:03.000Z",
                "mentionLikes": ""
            },
            {
                "mentionText": "@AndriyYermak\n BRAVO!!",
                "authorName": "aLLiSoN",
                "tweetDate": "2024-12-12T01:37:22.000Z",
                "mentionLikes": ""
            },
            {
                "mentionText": "@AndriyYermak\n BRAVO!!!",
                "authorName": "aLLiSoN",
                "tweetDate": "2024-12-12T01:37:03.000Z",
                "mentionLikes": ""
            },
            {
                "mentionText": "You're losing the war, and you're here on X promoting U2. What's the point?",
                "authorName": "Whatever you say.",
                "tweetDate": "2024-12-12T00:16:59.000Z",
                "mentionLikes": ""
            },
            {
                "mentionText": "Absolutely breathtaking",
                "authorName": "JenBNYC",
                "tweetDate": "2024-12-11T23:50:33.000Z",
                "mentionLikes": "1"
            },
            {
                "mentionText": "All of it is wait & see what happens\nI'm not for waiting for another American presidents permission or lead anymore.\nUkraine is already frozen out of NATO. This need for confirmation is harming Ukrainian lives and Ukraine's security. Answer is there. Stop bargaining/denialism",
                "authorName": "Fufufnyk ",
                "tweetDate": "2024-12-11T23:21:08.000Z",
                "mentionLikes": "2"
            },
            {
                "mentionText": "",
                "authorName": "KaktusTinka",
                "tweetDate": "2024-12-11T23:10:25.000Z",
                "mentionLikes": ""
            },
            {
                "mentionText": "A lot of things at play. Let’s wait and see what happens.\n\n1) They may try to get Trump on their side to get weapons escalation before the war freezes.\n\n2) If they are frozen out of NATO, they can use it as public justification to enact Article X and go nuclear.\n\nTaking",
                "authorName": "Oleg Kostour ",
                "tweetDate": "2024-12-11T23:01:09.000Z",
                "mentionLikes": "4"
            },
            {
                "mentionText": ".\n@Podolyak_M\n  \n@mylovanov\n \n@andriyyermak\n \n@zelenskyyua\n are repeating everything they said and did in 2019\n\nThere is no diplomatic solutions with russians. Ask the Japanese about Kuril Islands. Ask the Finn's about Karelia. Ukrainian leadership has no right to do this again. Treason.",
                "authorName": "Fufufnyk ",
                "tweetDate": "2024-12-11T22:09:05.000Z",
                "mentionLikes": "2"
            },
            {
                "mentionText": "Чотоб ти здох разом із зеленою соплею",
                "authorName": "Ded_Strelok",
                "tweetDate": "2024-12-11T22:05:14.000Z",
                "mentionLikes": ""
            },
            {
                "mentionText": "Idź w dupie, bydło.",
                "authorName": "Ded_Strelok",
                "tweetDate": "2024-12-11T22:03:17.000Z",
                "mentionLikes": ""
            },
            {
                "mentionText": "Теж сподобалась.",
                "authorName": "Viktoria B",
                "tweetDate": "2024-12-11T21:11:24.000Z",
                "mentionLikes": ""
            },
            {
                "mentionText": "No greater band in the world than U2. Their humanitarian efforts are an example to everyone! God bless U2! \n@U2",
                "authorName": "Kaila Weisz L",
                "tweetDate": "2024-12-11T21:03:46.000Z",
                "mentionLikes": ""
            }
        ]
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



