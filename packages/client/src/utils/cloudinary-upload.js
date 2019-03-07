export const handleCloudinaryUpload = (file, type, folder) => {
  return new Promise(resolve => {
    var formdata = new FormData()

    formdata.append("file", file)
    formdata.append("folder", folder)
    formdata.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME)
    formdata.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET)

    // NOTE: You need to add the event listeners before calling open() on the request. Otherwise the progress events will not fire.

    var xhr = new XMLHttpRequest()

    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${
        process.env.CLOUDINARY_CLOUD_NAME
      }/${type}/upload`,
      true
    )

    xhr.onload = () => {
      resolve(JSON.parse(xhr.response))
    }

    xhr.onerror = () => {
      resolve(undefined)
    }

    xhr.send(formdata)
  })
}
