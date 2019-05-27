export const appendAllChilds = function(...childs: any): void {
    let parent = childs[0];
    childs = childs.slice(1, childs.length);
    childs.forEach((child: any, i: number) => parent.appendChild(child));
}

// import { FunnyData, Funny } from './interfaces';

// let tempData: Funny = {
//     title: '', 
//     upvotes: 0,
//     score: 0,
//     num_comments: 0,
//     created: 0
// }

// let funnyData: FunnyData = {
//     posts: [tempData],
//     count: 0
// };
