class Post {
    constructor(author, content) {
        this.author = author;
        this.content = content;
        this.date = new Date();
        this.rating = 0;
    }
}

export {Post as Post}