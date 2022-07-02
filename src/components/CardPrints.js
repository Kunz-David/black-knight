import { Suspense } from 'react'
import { useRecoilValue } from 'recoil'
import { cardStripPrintIdsState } from "../atoms"
import CardPrint from "./CardPrint"
import HorizontalScroll from "./header/HorizontalScroll"
import PropTypes from "prop-types"


CardPrints.propTypes = {
    cardName: PropTypes.string
}

function CardPrints({ cardName }) {

    const cardPrintIds = useRecoilValue(cardStripPrintIdsState(cardName))

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <HorizontalScroll>
                    {cardPrintIds.map((printId) =>
                        <CardPrint key={cardName + printId.toString()} cardName={cardName} printId={printId} />)}
                </HorizontalScroll>
            </Suspense>
        </div>
    )
}


export default CardPrints