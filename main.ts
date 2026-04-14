input.onButtonPressed(Button.A, function () {
    strip.showColor(neopixel.colors(NeoPixelColors.Green))
    weather = 0
})
input.onButtonPressed(Button.AB, function () {
    PlanetX_AILens.learnObject(PlanetX_AILens.learnID.ID1)
})
input.onButtonPressed(Button.B, function () {
    strip.showColor(neopixel.colors(NeoPixelColors.Red))
    weather = 1
})
let Water_level = 0
let weather = 0
let strip: neopixel.Strip = null
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("MKSTEAM", "sh232488")
ESP8266_IoT.connectSmartiot("7RK9hU74PDw1H96RjEin", "1")
PlanetX_AILens.initModule()
music.setVolume(67)
strip = neopixel.create(DigitalPin.P1, 1, NeoPixelMode.RGB)
PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Things)
basic.forever(function () {
    Water_level = pins.analogReadPin(AnalogReadWritePin.P4)
    PlanetX_AILens.cameraImage()
    if (weather == 0) {
        if (PlanetX_AILens.objectCheck(PlanetX_AILens.learnID.ID1)) {
            basic.showIcon(IconNames.Heart)
        }
    } else {
        if (PlanetX_AILens.objectCheck(PlanetX_AILens.learnID.ID1)) {
            basic.showIcon(IconNames.Angry)
            music.play(music.builtinPlayableSoundEffect(soundExpression.sad), music.PlaybackMode.UntilDone)
        }
    }
    if (Water_level < 400) {
        music.play(music.builtinPlayableSoundEffect(soundExpression.mysterious), music.PlaybackMode.UntilDone)
        basic.showIcon(IconNames.Ghost)
    }
})
basic.forever(function () {
    ESP8266_IoT.setSmartIotUploadData(
    pins.analogReadPin(AnalogReadWritePin.P4)
    )
    ESP8266_IoT.uploadSmartIotData()
})
