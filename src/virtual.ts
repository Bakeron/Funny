import { appendAllChilds } from "./helpers";
import { newestPosts, mostVoice, sort } from "./functions";
import { FunnyData, Funny } from './interfaces';

const div: HTMLElement = document.createElement("div");

div.setAttribute('id', 'buttons');

export const createDom = function(data: Funny[], task: HTMLElement, funnyData: FunnyData) {
    virtualSort(task, funnyData); // Can be upvotes, num_comments, score and created
    mostVoiceButton(task, funnyData); // Look for title in the most voice dodatnich i ujemnych
    newestPostsButton(data, funnyData); // Screen the newest post last day

    task.appendChild(div);
    createTable(task, funnyData); // Prepares the appropriate structure and creates a table from it
}

const newestPostsButton = function(data: Funny[], funnyData: FunnyData) {
    const buttonNewest = document.createElement("a");
    const buttonText = document.createTextNode('Najnowsze 24 godzinne posty');
    buttonNewest.appendChild(buttonText);
    div.appendChild(buttonNewest);

    buttonNewest.addEventListener('click', () => newestPosts(data, funnyData));
}

const mostVoiceButton = function(task: HTMLElement, funnyData: FunnyData) {
    const buttonVoice = document.createElement("a");
    const buttonText = document.createTextNode('Najwyższe głosy');
    buttonVoice.appendChild(buttonText);
    div.appendChild(buttonVoice);

    function voice() {
        const table: HTMLElement = task.querySelector("table");
        const title = mostVoice(funnyData);
        const p = document.createElement("h2");
        const text = document.createTextNode(title);

        p.setAttribute('class', 'title');
        p.appendChild(text);

        task.insertBefore(p, table);

        buttonVoice.removeEventListener('click', voice);
    }

    buttonVoice.addEventListener('click', voice);
}

const virtualSort = function(task: HTMLElement, funnyData: FunnyData) {
    const select = document.createElement("select");

    const upvotes = document.createElement("option");
    const upvotesText = document.createTextNode("upvotes");
    upvotes.appendChild(upvotesText);

    const num_comments = document.createElement("option");
    const num_commentsText = document.createTextNode("num_comments");
    num_comments.appendChild(num_commentsText);

    const score = document.createElement("option");
    const scoreText = document.createTextNode("score");
    score.appendChild(scoreText);

    const created = document.createElement("option");
    const createdText = document.createTextNode("created");
    created.appendChild(createdText);

    appendAllChilds(select, upvotes, num_comments, score, created)

    div.appendChild(select);

    select.addEventListener('change', (event: any) => sort(event.target.value, task, funnyData));
}

export const createTable = function(task: HTMLElement, funnyData: FunnyData) {
    const table = document.createElement("table");
    const caption = document.createElement("caption");
    const textCaption = document.createTextNode("Funny data");
    caption.appendChild(textCaption);

    const textColumn = ['title', 'upvotes', 'score', 'num_comments', 'created'];
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    let th, thText;

    for (let i = 0; i < 5; i++) {
        th = document.createElement("th");
        thText = document.createTextNode(textColumn[i]);
        
        th.appendChild(thText);
        tr.appendChild(th);
    }

    thead.appendChild(tr);

    const tbody: HTMLElement = document.createElement("tbody");
    let trTbody, td1, td2, td3, td4, td5;
    let td1Text, td2Text, td3Text, td4Text, td5Text;

    funnyData.posts.forEach((data: Funny, i: number) => {
        trTbody = document.createElement("tr");

        td1 = document.createElement("td");
        td2 = document.createElement("td");
        td3 = document.createElement("td");
        td4 = document.createElement("td");
        td5 = document.createElement("td");

        td1Text = document.createTextNode(data.title);
        td2Text = document.createTextNode(data.upvotes);
        td3Text = document.createTextNode(data.score);
        td4Text = document.createTextNode(data.num_comments);
        td5Text = document.createTextNode(data.created);

        td1.appendChild(td1Text);
        td2.appendChild(td2Text);
        td3.appendChild(td3Text);
        td4.appendChild(td4Text);
        td5.appendChild(td5Text);
        
        appendAllChilds(trTbody, td1, td2, td3, td4, td5);

        tbody.appendChild(trTbody);
    })

    appendAllChilds(table, caption, thead, tbody)

    task.appendChild(table);
};
