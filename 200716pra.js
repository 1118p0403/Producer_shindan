'use strict';
const producerNameInput = document.getElementById('producer-name');
const shindanButton = document.getElementById('shindan');
const resultDivided = document.getElementById('result-area');
const idolImageDivided = document.getElementById('idol-image-area');
const tweetDivided = document.getElementById('tweet-area');

const idols = [
    ['天海春香', 'haruka'],
    ['如月千早', 'chihaya'],
    ['星井美希', 'miki'],
    ['高槻やよい', 'yayoi'],
    ['菊地真', 'makoto'],
    ['水瀬伊織', 'iori'],
    ['萩原雪歩', 'yukiho'],
    ['四条貴音', 'takane'],
    ['双海真美', 'mami'],
    ['我那覇響', 'hibiki'],
    ['双海亜美', 'ami'],
    ['秋月律子', 'ritsuko'],
    ['三浦あずさ', 'azusa']
];

/**
 * 指定した要素の子供を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

shindanButton.onclick = () => {
    const producerName = producerNameInput.value;
    if (producerName.length === 0) {
        return;
    }

/// 診断結果エリア
removeAllChildren(resultDivided);
const header = document.createElement('h3');
header.innerText = '診断結果ですよっ、診断結果！';
resultDivided.appendChild(header);

const paragraph = document.createElement('p');
const result = shindan(producerName);
paragraph.innerText = result;
resultDivided.appendChild(paragraph);

/// ツイートエリア
removeAllChildren(tweetDivided);
const a = document.createElement('a');
const href = 
    'https://twitter.com/intent/tweet?button_hashtag=765' + encodeURIComponent('プロ相性診断') + 
    '&ref_src=twsrc%5Etfw';

a.setAttribute('href', href);
a.className = ('twitter-hashtag-button');
a.setAttribute('data-text', result);
a.innerText = 'Tweet #765プロ相性診断';
tweetDivided.appendChild(a);

const script = document.createElement('script');
script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
tweetDivided.appendChild(script);
};

producerNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        shindanButton.onclick();
    }
};

/**
 * プロデューサー名の文字列を渡すと診断結果を返す関数
 * @param {string} producerName
 * @return {string} 診断結果
 */
function shindan(producerName) {
    let sumOfCharCode = 0;
    for (let i = 0; i < producerName.length; i++) {
        sumOfCharCode = sumOfCharCode + producerName.charCodeAt(i);
    }
    const index = sumOfCharCode % idols.length;
    var answers = idols[index];
    let result = ('{producerName}Pにおすすめのアイドルは、' + answers[0] + 'です。');
    result = result.replace(/\{producerName\}/g, producerName);
    return result;
}

console.assert(
    shindan('KH') ===
    'KHPにおすすめのアイドルは、菊地真です。',
    '違いますよ、プロデューサーさん！'
);

console.assert(
    shindan('KH') === shindan('KH'),
    'これも違いますよ～'
);
