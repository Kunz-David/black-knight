import {Suspense} from 'react';
import {useRecoilValue} from 'recoil';
import {cardStripPrintIdsState} from "../atoms";
import CardPrint from "./CardPrint"
import HorizontalScroll from "./HorizontalScroll";
import {range} from "lodash";


function CardPrints({cardName}) {

    const cardPrintIds = useRecoilValue(cardStripPrintIdsState(cardName))

    console.log("cardPrintIds in CardPrints: " + cardPrintIds)

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <HorizontalScroll>
                    {range(cardPrintIds).map((printId) =>
                        <CardPrint key={cardName + printId.toString()} cardName={cardName} printId={printId}/>)}
                </HorizontalScroll>
            </Suspense>
        </div>
    )
}


export default CardPrints;