import classnames from "classnames"
import PropTypes from "prop-types"

const sizes = [`2x`, `3x`, `4x`, `5x`, `6x`]
const loyalties = ['loyalty-up', 'loyalty-down', 'loyalty-zero', 'loyalty-start']

const verboseMana = {
    w: "white",
    u: "blue",
    b: "black",
    r: "red",
    g: "green",
}

ManaSymbol.propTypes = {
    symbol: PropTypes.string,
    size: PropTypes.string,
    cost: PropTypes.bool,
    half: PropTypes.bool,
    shadow: PropTypes.bool,
    fixed: PropTypes.bool,
    loyalty: PropTypes.bool,
}

function ManaSymbol({
    symbol = ``,
    size = ``,
    cost = false,
    shadow = false,
    half = false,
    fixed = false,
    loyalty = null,
    ...props
}) {
    return (
        <i
            title={verboseMana[symbol]}
            alt={verboseMana[symbol]}
            className={classnames({
                "ms": true,
                [`ms-${symbol}`]: true,
                [`ms-${size}`]: sizes.includes(size),
                "ms-cost": half || shadow || cost,
                "ms-shadow": shadow,
                "ms-half": half,
                "ms-fw": fixed,
                [`ms-loyalty-${parseInt(loyalty, 10)}`]:
                    loyalties.includes(symbol) &&
                    typeof loyalty === `number` &&
                    loyalty >= 0 &&
                    loyalty <= 20
            })}
            aria-hidden
            {...props}
        />
    )
}

export default ManaSymbol