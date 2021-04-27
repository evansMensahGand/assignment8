import server from "../server";
const chai = require("chai");
const chaiHttp = require("chai-http");

// styling method
chai.should();

// middleware
chai.use(chaiHttp);

describe("Testing POST Controller", () => {
  describe("Get App Post", () => {
    it("Should return all posts", (done) => {
      chai
        .request(server)
        .get("/posts")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");

          done();
        });
    });

    it("Should not return any post", (done) => {
      chai
        .request(server)
        .get("/post")
        .end((err, res) => {
          res.should.have.status(404);

          done();
        });
    });
  });

  describe("Get Single Post", () => {
    it("Should return single post", (done) => {
      const postId = "60632eb349c9ab37007b83f4";

      chai
        .request(server)
        .get(`/posts/${postId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");

          done();
        });
    });

    it("Should not return any post", (done) => {
      const postId = "60632eb349c9ab37007b83f8";

      chai
        .request(server)
        .get(`/posts/${postId}`)
        .end((err, res) => {
          res.should.have.status(404);

          done();
        });
    });
  });

  describe("Create Post", () => {
    it("Should create a post", (done) => {
      const post = {
        title: "First Post Title",
        content: "Content from the first post.",
      };

      chai
        .request(server)
        .post(`/posts`)
        .send(post)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an("object");

          done();
        });
    });

    it("Should not create post", (done) => {
      const post = {
        content: "Content from the first post.",
      };

      chai
        .request(server)
        .post(`/posts`)
        .send(post)
        .end((err, res) => {
          res.should.have.status(400);

          done();
        });
    });
  });

  describe("Update Post", () => {
    it("Should update a post", (done) => {
      const postId = "60632eb349c9ab37007b83f4";
      const post = {
        title: "First Post Title",
      };

      chai
        .request(server)
        .patch(`/posts/${postId}`)
        .send(post)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");

          done();
        });
    });

    it("Should not update post", (done) => {
      const postId = "60632eb349c9ab37007b83f1";
      const post = {
        content: "Content from the first post.",
      };

      chai
        .request(server)
        .patch(`/posts/${postId}`)
        .send(post)
        .end((err, res) => {
          res.should.have.status(404);

          done();
        });
    });
  });

  describe("Delete Post", () => {
    it("Should delete a post", (done) => {
      const postId = "60632eb349c9ab37007b83f4";

      chai
        .request(server)
        .delete(`/posts/${postId}`)
        .end((err, res) => {
          res.should.have.status(200);

          done();
        });
    });

    it("Should not update post", (done) => {
      const postId = "60632eb349c9ab37007b83f1";

      chai
        .request(server)
        .delete(`/posts/${postId}`)
        .end((err, res) => {
          res.should.have.status(404);

          done();
        });
    });
  });
});
