import * as Yup from 'yup';

export const validationSchema = Yup.object({
  photo: Yup.mixed().required('Photo is required'),
  title: Yup.string().trim()
    .required('Title is required'),
  description: Yup.string().trim()
    .max(200, 'Max 200 characters')
    .required('Description is required'),
  category: Yup.string().required('Category is required'),
  country: Yup.string().required('Country is required'),
  time: Yup.number().min(1, 'Min 1 minute')
    .required('Time is required'),
  // make input helper fields non-blocking for submit:
  ingredientId: Yup.string().nullable(),
  ingredientAmount: Yup.string().trim()
    .nullable(),
  instructions: Yup.string().trim()
    .max(1000, 'Max 1000 characters')
    .required('Instructions are required'),
  ingredients: Yup.array()
    .of(Yup.object({
      id: Yup.string().required(),
      name: Yup.string().required(),
      amount: Yup.string().required()
    }))
    .min(1, 'Add at least 1 ingredient')
    .required('Add at least 1 ingredient')
});
