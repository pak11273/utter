import * as yup from "yup"

const zoneNotLongEnough = "Zone names must be at least 6 characters"
const zoneTooLong = "Zone names cannot exceed 20 characters"
const zoneDescriptionNotLongEnough =
  "Zone descriptions must be at least 30 characters"
const zoneDescriptionTooLong = "Zone descriptions cannot exceed 110 characters"

export const rezoneSchema = yup.object().shape({
  username: yup.string().required("A username is required")
})

export const zoneCreateSchema = yup.object().shape({
  ageGroup: yup.string().required("Age restrictions are required"),
  app: yup.string().required("An app is required"),
  course: yup.string().required("A course you subscribe to is required"),
  courseLevel: yup.string().required("A course level is required"),
  zoneName: yup
    .string()
    .min(3, zoneNotLongEnough)
    .max(40, zoneTooLong)
    .required("A zone name is required"),
  zoneDescription: yup
    .string()
    .min(30, zoneDescriptionNotLongEnough)
    .max(110, zoneDescriptionTooLong)
    .required("A zone description is required")
})
