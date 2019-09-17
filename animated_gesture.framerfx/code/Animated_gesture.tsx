import * as React from "react"
import {
    Frame,
    useAnimation,
    transform,
    ControlType,
    addPropertyControls,
} from "framer"

interface PropTypes {
    size: number
    color: string | object
    opacity: number
    minVelocity: number
    maxVelocity: number
    maxScale: number
    content: []
}

export const AnimatedGesture: React.FC<PropTypes> = ({
    size,
    color,
    opacity,
    minVelocity,
    maxVelocity,
    maxScale,
    content,
    ...props
}) => {
    const controls = useAnimation()

    let pos = { x: 0, y: 0 }
    let scale = { x: 1, y: 1 }
    let origin = { x: 0.5, y: 0.5 }
    let axis
    let dLock = false

    const variants = {
        def: {
            size: size,
            border: `${size / 2}px solid ${color}`,
            opacity: opacity,
            scaleX: 0,
            scaleY: 0,
            originX: 0.5,
            originY: 0.5,
            borderRadius: "50%",
        },
        off1: {
            scaleX: 1,
            scaleY: 1,
            originX: 0.5,
            originY: 0.5,
            borderRadius: "50%",
        },
        off2: {
            border: `2px solid ${color}`,
            transition: { ease: "easeOut", duration: 0.2, delay: 0.05 },
        },
        on: {
            scaleX: 1,
            scaleY: 1,
        },
    }

    function setPosition({ point }) {
        controls.set({ x: point.x - size / 2, y: point.y - size / 2 })
        controls.start("on")
    }

    function resetPosition() {
        dLock = false
        scale = { x: 1, y: 1 }
        origin = { x: 0.5, y: 0.5 }
        ;(async () => {
            await controls.stop()
            await controls.set("off1")
            await controls.start("off2")
            await controls.set("def")
        })()
    }

    function handleDrag({ point, velocity }) {
        const velocityX = Math.abs(velocity.x)
        const velocityY = Math.abs(velocity.y)
        if (!dLock) {
            if (velocityX > minVelocity) {
                axis = "x"
                dLock = true
            }
            if (velocityY > minVelocity) {
                axis = "y"
                dLock = true
            }
        }
        if (dLock) {
            const s = transform(
                Math.abs(velocity[axis]),
                [minVelocity, maxVelocity],
                [1, maxScale]
            )
            scale = { ...scale, [axis]: s }
            origin = { ...origin, [axis]: Math.sign(velocity[axis]) }
            pos = { ...pos, [axis]: point[axis] }
        } else {
            pos = point
        }
        controls.set({
            x: pos.x - size / 2,
            y: pos.y - size / 2,
            originX: origin.x,
            originY: origin.y,
            borderRadius: `${size / 2 / scale.x}px/${size / 2 / scale.y}px`,
            scaleX: scale.x,
            scaleY: scale.y,
        })
        controls.start({
            scaleX: scale.x,
            scaleY: scale.y,
            transition: { ease: "circIn", duration: 0.05 },
        })
    }

    return (
        <Frame
            onTapStart={(event, info) => setPosition(info)}
            onTap={resetPosition}
            onPan={(event, info) => handleDrag(info)}
            size={"100%"}
            style={{ zIndex: 999999999999999 }}
        >
            <Frame>{content ? content : "Add children frame"}</Frame>
            <Frame
                style={{ pointerEvents: "none", zIndex: 999999999999999 }}
                background={null}
                variants={variants}
                initial={"def"}
                animate={controls}
            />
        </Frame>
    )
}

addPropertyControls(AnimatedGesture, {
    size: {
        type: ControlType.Number,
        title: "Size",
        defaultValue: 32,
    },
    color: {
        type: ControlType.Color,
        title: "Color",
        defaultValue: "white",
    },
    opacity: {
        type: ControlType.Number,
        title: "Opacity",
        defaultValue: 0.6,
        min: 0,
        max: 1,
        step: 0.1,
        displayStepper: true,
    },
    minVelocity: {
        type: ControlType.Number,
        title: "Min velocity",
        defaultValue: 350,
    },
    maxVelocity: {
        type: ControlType.Number,
        title: "Max velocity",
        defaultValue: 700,
    },
    maxScale: {
        type: ControlType.Number,
        title: "Max scale",
        min: 1,
        defaultValue: 2,
    },
    content: {
        type: ControlType.Array,
        title: "Content",
        propertyControl: {
            type: ControlType.ComponentInstance,
        },
    },
})
