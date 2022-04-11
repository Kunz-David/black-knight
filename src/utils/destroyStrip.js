import {useRecoilTransaction_UNSTABLE} from "recoil";
import {cardPrintsState, cardStripInfoState, cardStripPrintIdsState, cardStripsNamesState} from "../atoms";

export function useDestroyStrip() {
        return useRecoilTransaction_UNSTABLE(({get, set, reset}) => (cardName) => {
            get(cardStripPrintIdsState(cardName)).forEach(
                // reset prints
                printId => reset(cardPrintsState({cardName, printId}))
            )
            // print ids
            reset(cardStripPrintIdsState(cardName))
            // strip info
            reset(cardStripInfoState({cardName}))
            // delete strip name
            set(cardStripsNamesState, ((values) => values.filter(name => name !== cardName)))
        },[])
}
