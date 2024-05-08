export default function createFormData(object: any): FormData {
  const formData: FormData = new FormData()

  for(let [key, value] of Object.entries(object)) {
    if(value instanceof FileList) {
      for(let file in value) if(value[file] instanceof File) formData.append('file', value[file])
    } else formData.append(key, value as string)
  }
  return formData
}