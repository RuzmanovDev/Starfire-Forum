const idGenerator = function *() {
    let index = 1;
    while (true) {
        yield index++;
    }
}();

class Post {
    constructor(author, content) {
        this._id = idGenerator.next().value;
        this.author = author;
        this.content = content;
        this.date = new Date();
        this.rating = 0;
    }
}

export {Post as Post}