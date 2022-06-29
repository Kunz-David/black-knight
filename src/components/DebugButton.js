import { Button } from "@chakra-ui/react"

const { useRecoilCallback } = require("recoil")

function DebugButton() {
    const onClick = useRecoilCallback(({ snapshot }) => async () => {
        console.debug('Atom values:')
        for (const node of snapshot.getNodes_UNSTABLE()) {
            const value = await snapshot.getPromise(node)
            console.debug(node.key, value)
        }
    }, [])

    return <Button onClick={onClick}>Dump State</Button>
}

export default DebugButton