import * as yup from "yup"

export const zoneNotLongEnough = "Zone names must be at least 6 characters"
export const zoneTooLong = "Zone names cannot exceed 20 characters"
export const zoneDescriptionNotLongEnough =
  "Zone descriptions must be at least 30 characters"
export const zoneDescriptionTooLong =
  "Zone descriptions cannot exceed 110 characters"

export const zoneCreateSchema = yup.object().shape({
  app: yup.string().required("An app is required"),
  course: yup.string().required("A course you subscribe to is required"),
  courseLevel: yup.string().required("A course level is required"),
  ageGroup: yup.string().required("Age restrictions are required"),
  zoneName: yup
    .string()
    .min(6, zoneNotLongEnough)
    .max(20, zoneTooLong)
    .required("A zone name is required"),
  zoneDescription: yup
    .string()
    .min(30, zoneDescriptionNotLongEnough)
    .max(110, zoneDescriptionTooLong)
    .required("A zone description is required")
})
