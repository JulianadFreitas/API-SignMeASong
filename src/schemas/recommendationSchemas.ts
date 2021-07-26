import joi from "joi"

const postRecommendSchema = joi.object({
    name: joi.string().required(),
    youtubeLink: joi.string().uri().required()
});

const paramIdSchema = joi.object({
    id: joi.number().integer().positive().required()
});

const getRandRecommendSchema = joi.object({
    id: joi.number().integer().positive().required(),
    name: joi.string().required(),
    youtubeLink: joi.string().uri().required(),
    score: joi.number().integer().required(),
});

const paramAmountSchema = joi.object({
    param: joi.number().integer().positive().required()
});

export {postRecommendSchema, paramIdSchema, getRandRecommendSchema, paramAmountSchema}