import * as yup from "yup"

/* const invalidLogin = "invalid login" */

/* export const invalidEmail = "email must be a valid email" */
export const zoneNotLongEnough = "Zone name must be at least 10 characters"
export const zoneDescriptionNotLongEnough =
  "Zone description must be at least 100 characters"
export const zoneDescriptionTooLong =
  "Zone description cannot exceed 350 characters"
export const zoneTooLong = "Zone name cannot exceed 100 characters"

export const zoneCreateSchema = yup.object().shape({
  zoneName: yup
    .string()
    .min(10, zoneNotLongEnough)
    .max(100, zoneTooLong)
    .required("A zone name is required"),
  zoneDescription: yup
    .string()
    .min(100, zoneDescriptionNotLongEnough)
    .max(350, zoneDescriptionTooLong)
    .required("A zone description is required")
})
