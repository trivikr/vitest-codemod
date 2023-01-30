import { API, FileInfo } from "jscodeshift";

const transformer = async (file: FileInfo, api: API) => {
  const j = api.jscodeshift.withParser("babylon");
  const source = j(file.source);

  // ToDo: Add the transform logic here
  
  return source.toSource();
}

export default transformer;