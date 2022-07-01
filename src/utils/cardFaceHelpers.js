import { pick, range } from "lodash"

export function getFaceObject(faces, faceKeys) {
    return range(0, faces.length).map((value) => {
        return pick(faces[value], faceKeys)
    })
}

