function handleStop () {
    bitbot.setLedColor(0xFF0000)
    bitbot.stop(BBStopMode.Coast)
}
function handleForward (num: number) {
    forward = num / 10
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
function handleTurn (num: number) {
    turn = num / 10
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
    if (Math.abs(value) > 200) {
        bitbot.ledClear()
        if (name.includes("forward")) {
            handleForward(forward)
        }
        if (name.includes("turn")) {
            handleTurn(value)
        }
    }
})
let turn = 0
let forward = 0
radio.setGroup(1)
basic.showIcon(IconNames.Happy)
bitbot.setLedColor(0x00FF00)
