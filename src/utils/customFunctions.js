import { include, isEqual, length, ternary } from './javascript'

const b64toFile = (b64Data, type, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []
  const viewType = type ? '.' + type.split('/')?.[1] : '.png'
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  // file.url && (file?.url.split(";")?.[0].split("/")?.[1] || "jpg")
  const blob = new Blob(byteArrays, { type: contentType })
  const file = new File([blob], `${Date.now() + viewType}`, {
    type: type ? type : 'image/png',
  })
  return file
}

const fieldContactFormat = contact => {
  let char
  if (contact) {
    let numbers = contact.toString().replace(/\D/g, '')
    if (numbers.length === 10) {
      char = { 0: '', 3: '-', 6: '-' }
    } else if (numbers.length < 11) {
      char = { 0: '', 2: '-', 6: '-' }
    } else if (include([11, 12], length(numbers))) {
      char = { 0: '', 3: '-', 7: '-' }
    } else if (isEqual(length(numbers), 13)) {
      char = { 0: '', 2: '-', 5: '-', 9: '-' }
    }
    contact = ''
    let newChar = 2
    for (let i = 0; i < numbers.length; i++) {
      if (char) {
        contact += (char[i] || '') + numbers[i]
      } else {
        contact += (i === newChar ? '-' : '') + numbers[i]
        if (i === newChar) {
          newChar = newChar + 4
        }
      }
    }
  }
  return contact
}

const validationTag = lang => {
  switch (lang) {
    case 'jp':
      return 'jp-validation'

    default:
      return 'en-validation'
  }
}

const getTranslationKeyById = (id, list = []) =>
  list?.find(elem => isEqual(id, elem?.id))?.key

const modifyFileListKeys = list =>
  ternary(
    length(list),
    list?.map(file => ({
      name: file?.fileName,
      url: file?.fileUrl,
      uid: file?.dmsId,
      dmsId: file?.dmsId,
    })),
    [],
  )

const downloadReport = async reportUrl => {
  try {
    const response = await fetch(reportUrl)
    const blob = await response.blob()
    // Create an object URL for the Blob
    const blobUrl = URL.createObjectURL(blob)
    // Create a temporary link element to initiate download
    const link = document.createElement('a')
    link.href = blobUrl
    // link.setAttribute('download', filename); // Set the filename
    link.style.display = 'none'
    // Append the link to the document body
    document.body.appendChild(link)
    // Trigger a click event on the link to start the download
    link.click()
    // Clean up: remove the link and revoke the Blob URL after download starts
    document.body.removeChild(link)
    URL.revokeObjectURL(blobUrl)
  } catch (error) {
    // console.error('Error downloading the file:', error)
  }
}

export {
  b64toFile,
  fieldContactFormat,
  validationTag,
  getTranslationKeyById,
  modifyFileListKeys,
  downloadReport,
}
