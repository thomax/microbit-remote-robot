function handleStop () {
    bitbot.setLedColor(0xFF0000)
    bitbot.stop(BBStopMode.Coast)
}
function handleTurn (turn: number) {
    if (turn > 0) {
        for (let index = 0; index <= 5; index++) {
            bitbot.setPixelColor(index + 6, 0xFFFF00)
        }
        bitbot.rotate(BBRobotDirection.Right, turn)
    } else {
        for (let index = 0; index <= 5; index++) {
            bitbot.setPixelColor(index, 0xFFFF00)
        }
        bitbot.rotate(BBRobotDirection.Left, Math.abs(turn))
    }
}
radio.onReceivedValue(function (name, value) {
    if (name.includes("stop")) {
        handleStop()
    }
    bitbot.ledClear()
    percentValue = Math.map(value, -1023, 1023, -100, 100)
    if (Math.abs(percentValue) > sensitivity) {
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
        bitbot.setPixelColor(5, 0x00FF00)
        bitbot.setPixelColor(11, 0x00FF00)
        bitbot.go(BBDirection.Forward, forward)
    } else {
        bitbot.setPixelColor(0, 0xFF0000)
        bitbot.setPixelColor(6, 0xFF0000)
        bitbot.go(BBDirection.Reverse, Math.abs(forward))
    }
}
let percentValue = 0
let sensitivity = 0
radio.setGroup(51)
basic.showIcon(IconNames.Happy)
bitbot.setLedColor(0x00FF00)
sensitivity = 20
