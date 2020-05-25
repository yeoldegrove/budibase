// import { builtins, builtinLibName } from "../render/builtinComponents"
import App from "./App.svelte";

/**
 * create a web application from static budibase definition files.
 * @param  {object} opts - configuration options for budibase client libary
 */
export const loadBudibase = async ({
  opts,
  frontendDefinition,
  page,
  iframebody
}) => {
  const componentLibraryModules = (opts && opts.componentLibraries) || {}

  const libraries = frontendDefinition.libraries || []

  for (let library of libraries) {
    // fetch the JavaScript for the component libraries from the server
    componentLibraryModules[library] = await import(
      `/${frontendDefinition.appId}/componentlibrary?library=${encodeURI(
        library
      )}`
    )
  }

  return new App({
    target: iframebody,
    props: {
      appPreview: true,
      components: componentLibraryModules,
      definition: page 
    }
  })
}

