package com.ngelemar.reddit
package models

case class Post(id: Long,
                content: String,
                author: String,
                comments: List[Comment],
                likes: List[String],
                dislikes: List[String]) {
  def like(username: String): Unit = likes += username

  def dislike(username: String): Unit = dislikes += username
}
