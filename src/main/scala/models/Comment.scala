package com.ngelemar.reddit
package models

case class Comment(id: Long,
                   content: String,
                   author: User,
                   post: Post)
