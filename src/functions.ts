import { createTable } from './virtual';
import { FunnyData, Funny } from './interfaces';

const task: HTMLElement = document.getElementById('task');

// Prepares the appropriate structure  
export const posts = function(data: []) {
    let dateFromJson, date, time, tempData;
    let funnyData: FunnyData = {
        posts: [],
        count: 0
    };
    const dateOptions = {
        year: 'numeric', 
        day: '2-digit',
        month: '2-digit', 
    };
    const timeOptions = {
        hour: '2-digit', 
        minute:'2-digit'
    };  
    
    funnyData.count = data.length;

    data.forEach((item: any, i: number) => {
        dateFromJson = new Date(item.data.created);
        
        date = dateFromJson
                    .toLocaleDateString('pl', dateOptions)
                    .replace('/','.')
                    .replace('/','.');

        time = dateFromJson
                    .toLocaleTimeString([], timeOptions);

        tempData = {
            title: item.data.title, 
            upvotes: item.data.ups,
            score: item.data.score,
            num_comments: item.data.num_comments,
            created: date + ' ' + time
        };

        funnyData.posts.push(tempData);
    });

    return funnyData;
};


export const newestPosts = function(data: Funny[], funnyData: FunnyData) {
    const table: HTMLElement = task.querySelector("table");
    let tempFunnyData = [], tempData;
    data.forEach((item: any, i: number) => {
        tempData = {
            title: item.data.title, 
            upvotes: item.data.ups,
            score: item.data.score,
            num_comments: item.data.num_comments,
            created: item.data.created
        };

        tempFunnyData.push(tempData);
    });
    
    const toSort: Funny[] = tempFunnyData.slice(0);
    const timeNewest = toSort.sort((a: Funny, b: Funny) => a.created - b.created)[toSort.length - 1].created;
    const day = 86400000;
    const recentlyPost: Funny[] = toSort.filter((x: Funny) => x.created <= timeNewest && x.created >= timeNewest - day);

    let temp = [], found;
    for (const element in recentlyPost) {
        found = funnyData.posts.find((x: Funny) => x.title === recentlyPost[element].title);
        if (found) {
            temp.push(found);
        }
    }
    
    funnyData.posts = temp;

    if (table) {
        task.removeChild(table);
        createTable(task, funnyData);
    }
};

export const mostVoice = function(funnyData: FunnyData) {
    const toSort: Funny[] = funnyData.posts.slice(0);
    const mostVotes: Funny = toSort.sort((a: any, b: any) => (a.upvotes + a.num_comments) - (b.upvotes + b.num_comments))[toSort.length - 1];
    const checkEqual: Funny[] = toSort.filter((x: Funny) => x.upvotes + x.num_comments === mostVotes.upvotes + mostVotes.num_comments);

    if (checkEqual.length === 1) {
        return checkEqual[0].title;
    } else {
        let lookCreated: Funny[] = checkEqual.slice(0);
        lookCreated.sort((a: Funny, b: Funny) => a.created - b.created);
        return lookCreated[lookCreated.length - 1].title;
    }
};

export const sort = function(method: string, task: HTMLElement, funnyData: FunnyData) {
    const table = task.querySelector("table");
    let toSort = funnyData.posts.slice(0);
    toSort.sort((a: Funny, b: Funny) => a[method] - b[method]);
    funnyData.posts = toSort;
    task.removeChild(table);
    createTable(task, funnyData);
};

