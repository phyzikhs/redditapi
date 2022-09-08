
const mongoose = require('mongoose')
const { Number, Array, String, ObjectId, Object } = require('mongoose/lib/schema/index')
const Schema = mongoose.Schema

const redditSchema = new Schema({
    title: {
        type: String,
        minlength: 1,
        maxlength: 250,
        required: true
    },
    author: {
        type: ObjectId,
        required: true,
        minLength: 1,
        maxLength: 250
    },
    content: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 1000
    },
    topic: {
        type: Array,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    comments: {
        type: Array,
        required: true,
        minItems: 0,
        items: {
            type: Object,
            properties: {
                comment: {
                    type: String,
                    minlength: 1,
                    maxlength: 500,
                    required: true
                },
                author: {
                    type: ObjectId,
                    required: true,
                    minlength: 1,
                    maxlength: 250,
                    required: true
                },
                upvotes: {
                    type: Number,
                    minimum: 0,
                    required: true
                },
                downvotes: {
                    type: Number,
                    minimum: 0,
                    required: true
                }
            }
        }
    },
    upvotes: {
        type: Number,
        minimum: 0,
        required: true
    },
    downvotes: {
        type: Number,
        minimum: 0,
        required: true
    }
}, {timestamps: true})

const Reddit = mongoose.model("Reddit", redditSchema)

module.exports = Reddit