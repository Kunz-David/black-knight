import classnames from "classnames"

const sizes = ["2x", "3x", "4x", "5x", "6x"]

function SetIcon({
    setName,
    keyruneCode,
    size,
    fixed = false,
    rarity,
    gradient = false,
    foil = false,
    className,
    ...props
  }) {

    return (
        <i
            title={setName}
            alt={keyruneCode}
            className={classnames(className, {
            "ss": true,
            [`ss-${keyruneCode}`]: true,
            [`ss-${size}`]: sizes.includes(size),
            "ss-fw": fixed,
            // [`ss-${raritiesMap.get(rarity)}`]: raritiesMap.has(rarity),
            [`ss-${rarity}`]: rarity,
            "ss-grad": gradient || foil,
            "ss-foil": foil
            })}
            aria-hidden
            {...props}
        />
      );
}

export default SetIcon;