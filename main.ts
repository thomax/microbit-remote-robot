function handleStop () {
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
    bitbot.stop(BBStopMode.Coast)
}
function handleForward (num: number) {
    forward = num / 10
    if (forward > 0) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        bitbot.go(BBDirection.Forward, forward)
    } else {
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        bitbot.go(BBDirection.Reverse, Math.abs(forward))
    }
}
function handleTurn (num: number) {
    turn = num / 10
    if (turn > 0) {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        bitbot.rotate(BBRobotDirection.Right, turn)
    } else {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        bitbot.rotate(BBRobotDirection.Left, Math.abs(turn))
    }
}
radio.onReceivedValue(function (name, value) {
    if (name.includes("stop")) {
        handleStop()
    }
    if (Math.abs(value) < 200) {
        basic.showIcon(IconNames.Happy)
    } else {
        if (name.includes("forward")) {
            handleForward(1)
        }
        if (name.includes("turn")) {
            handleTurn(value)
        }
    }
})
let turn = 0
let forward = 0
radio.setGroup(1)
