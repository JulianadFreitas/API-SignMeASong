import joi from "joi"

const postRecommendationSchema = joi.object({
    name: joi.string().required(),
    youtubeLink: joi.string().uri().required()
})


export {postRecommendationSchema}