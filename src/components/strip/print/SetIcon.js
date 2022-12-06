import classnames from "classnames"
import PropTypes from "prop-types"

const sizes = ["2x", "3x", "4x", "5x", "6x"]

function SetIcon({
    set,
    size,
    fixed = false,
    rarity,
    gradient = false,
    foil = false,
    ...props
}) {

    return (
        <i
            title={set.name}
            //alt={set.keyruneCode}
            className={
                classnames({
                    "ss": true,
                    [`ss-${set.keyruneCode}`]: true,
                    [`ss-${size}`]: sizes.includes(size),
                    "ss-fw": fixed,
                    // [`ss-${raritiesMap.get(rarity)}`]: raritiesMap.has(rarity),
                    [`ss-${rarity}`]: rarity,
                    "ss-grad": gradient || foil,
                    "ss-foil": foil
                })
            }
            aria-hidden
            {...props}
        />
    )
}

SetIcon.propTypes = {
    set: PropTypes.shape({
        name: PropTypes.string.isRequired,
        keyruneCode: PropTypes.string.isRequired,
        releaseDate: PropTypes.string.isRequired,
        setType: PropTypes.string.isRequired
        }).isRequired,
    size: PropTypes.string.isRequired,
    rarity: PropTypes.string.isRequired,
    fixed: PropTypes.bool,
    gradient: PropTypes.bool,
    foil: PropTypes.bool,
}

export default SetIcon