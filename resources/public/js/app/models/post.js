function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Post {
    constructor(author, content) {
        this._id = getRandomInt(0, 99999);
        this.author = author;
        this.content = content;
        this.date = new Date();
        this.rating = 0;
    }
}

export {Post as Post}