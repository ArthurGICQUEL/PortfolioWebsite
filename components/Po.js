import React from 'react'
import Unity, { UnityContext } from 'react-unity-webgl'

const unityContext = new UnityContext({
  loaderUrl: '/gameBuilds/Po/Build/PoBuildUncompressed.loader.js',
  dataUrl: '/gameBuilds/Po/Build/PoBuildUncompressed.data',
  frameworkUrl: '/gameBuilds/Po/Build/PoBuildUncompressed.framework.js',
  codeUrl: '/gameBuilds/Po/Build/PoBuildUncompressed.wasm',
})

export default function Po() {
  return <Unity unityContext={unityContext} className="w-full" />
}
