package com.ngelemar.reddit
package controllers

import com.ngelemar.reddit.models.{Comment, Post}

//import javax.inject.Inject

class PostController {

  var posts: Seq[Post] = Seq(
    Post(
      id = 1,
      content = "Hello World!",
      author = "alice",
      comments = List[Comment],
      likes = List[String],
      dislikes = List[String]
    ),
    Post(
      id = 2,
      content = "I love Scala",
      author = "bob",
      comments = List[Comment],
      likes = List[String],
      dislikes = List[String]
    ),
  )

//  def getPosts = Action {
//    Ok(Json.toJson(posts))
//  }
//
//  def addPost(author: String, content: String) = Action {
//    val id = posts.size + 1
//    val post = Post(id, author, content, List[Comment], List[String], List[String])
//    posts = posts :+ post
//    Created(Json.toJson(post))
//  }
//
//  def deletePost(id: Int) = Action {
//    posts = posts.filter(_.id != id)
//    NoContent
//  }

}
