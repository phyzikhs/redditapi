package com.ngelemar.reddit
package models

case class Post(id: Long,
                content: String,
                author: String,
                comments: List[Comment],
                likes: List[String],
                dislikes: List[String]) {
  def like(username: String): List[String] =
    if (likes.contains(username)) likes :+ username
    else likes

  def dislike(username: String): List[String] =
    if (dislikes.contains(username)) dislikes :+ username
    else dislikes
}
