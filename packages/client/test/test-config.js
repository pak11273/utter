;[".css", ".scss", ".png", ".jpg", ".JPG", ".svg"].forEach(ext => {
  require.extensions[ext] = () => null
})
