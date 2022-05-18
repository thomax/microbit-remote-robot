function handleStart () {
    running = true
    soundExpression.soaring.play()
    basic.showIcon(IconNames.Happy)
    bitbot.setLedColor(0x00FF00)
}
function handleStop () {
    running = false
    soundExpression.yawn.play()
    basic.showIcon(IconNames.No)
    bitbot.setLedColor(0xFF0000)
    bitbot.stop(BBStopMode.Coast)
}
function handleTurn (turn: number) {
    if (turn > 0) {
        bitbot.rotate(BBRobotDirection.Right, turn)
        for (let index = 0; index <= 5; index++) {
            bitbot.setPixelColor(index + 6, 0xFFFF00)
        }
    } else {
        bitbot.rotate(BBRobotDirection.Left, Math.abs(turn))
        for (let index = 0; index <= 5; index++) {
            bitbot.setPixelColor(index, 0xFFFF00)
        }
    }
}
radio.onReceivedValue(function (name, value) {
    if (name.includes("running")) {
        if (value == 1) {
            handleStart()
        } else {
            handleStop()
        }
    }
    if (running) {
        bitbot.ledClear()
        percentValue = Math.map(value, -1023, 1023, -100, 100)
        if (name.includes("forward")) {
            handleStraight(percentValue)
        }
        if (name.includes("turn")) {
            handleTurn(percentValue)
        }
    }
})
function handleStraight (forward: number) {
    if (forward > 0) {
        bitbot.go(BBDirection.Forward, forward)
        bitbot.setPixelColor(5, 0x00FF00)
        bitbot.setPixelColor(11, 0x00FF00)
    } else {
        bitbot.go(BBDirection.Reverse, Math.abs(forward))
        bitbot.setPixelColor(0, 0x00FF00)
        bitbot.setPixelColor(6, 0x00FF00)
    }
}
let percentValue = 0
let running = false
radio.setGroup(91)
handleStop()
