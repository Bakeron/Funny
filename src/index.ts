import { posts } from "./functions";
import { createDom } from "./virtual";

const task: HTMLElement = document.getElementById('task');
const xhr = new XMLHttpRequest();

export class FunnyTask {
    constructor() {}

    funnyUrl: string = "https://www.reddit.com/r/funny.json";

    download() {
        xhr.open("GET", this.funnyUrl, true);

        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(this.response).data.children;
                createDom(data, task, posts(data));
            }
        }

        xhr.send(null);
    }
}

let openTask = new FunnyTask();

openTask.download();
