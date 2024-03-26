const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string.'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5), // .optional()
  poster: z.string().url({
    mensaje: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Drama', 'Action', 'Crime', 'Adventure', 'Sci-Fi', 'Romance', 'Biography', 'Fantasy']),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be an array of enum genre'
    }
  )
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
