export const handleCloudinaryUpload = async file => {
  var formdata = new FormData()

  formdata.append("file", file)
  formdata.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME)
  formdata.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET)

  // NOTE: You need to add the event listeners before calling open() on the request. Otherwise the progress events will not fire.

  var xhr = new XMLHttpRequest()

  xhr.open(
    "POST",
    `https://api.cloudinary.com/v1_1/${
      process.env.CLOUDINARY_CLOUD_NAME
    }/image/upload`,
    true
  )

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const data = JSON.parse(xhr.response)
      console.log("from cloud data: ", data)
      return data
    }
  }

  xhr.send(formdata)
}
