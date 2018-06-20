module.exports = function (fileInfo, api, options) {
  console.log('hello from', fileInfo.path)
  return fileInfo.source
}
