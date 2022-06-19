import Joi from "joi"

const AddShowToListSchema = Joi.object({
  showId: Joi.number().required()
})

export default AddShowToListSchema
