import joi from "joi"

const postRecommendationSchema = joi.object({
    name: joi.string().required(),
    youtubeLink: joi.string().uri().required()
})

const paramIdSchema = joi.object({
    id: joi.number().integer().positive().required()
})

export {postRecommendationSchema, paramIdSchema}