from machine import Pin, PWM
import network #import des fonction lier au wifi
import urequests	#import des fonction lier au requetes http
import utime	#import des fonction lier au temps
import ujson	#import des fonction lier aà la convertion en Json

wlan = network.WLAN(network.STA_IF) # met la raspi en mode client wifi
wlan.active(True)# active le mode client wifi

ssid = 'Freebox-1DCA76'
password = 'odoratas-fodiet3-partes-adripiendo'
wlan.connect(ssid, password) # connecte la raspi au réseau
url = "http://192.168.1.23:3000"

pwm_led = PWM(Pin(10,mode=Pin.OUT))
pwm_led2 = PWM(Pin(9,mode=Pin.OUT))
pwm_led3 = PWM(Pin(8,mode=Pin.OUT))# on prescise au programme que la pin 15 est une sortie de type PWN
pwm_led.freq(1_000)
pwm_led2.freq(1_000)
pwm_led3.freq(1_000)# dont la frequence est de 1000 (default)
pwm_led.duty_u16(0000)

maisons = {"Gryffindor": [2000, 0, 0], "Slytherin": [0, 2000, 0], "Ravenclaw": [0, 0, 2000], "Hufflepuff": [20000, 100000, 0000]}

while not wlan.isconnected():
    print("pas co")
    utime.sleep(1)
    pass

while True:
    try:
        print("GET")
        r = urequests.get(url)

        def couleur_led(rgb):
            pwm_led.duty_u16(rgb[0])
            pwm_led2.duty_u16(rgb[1])
            pwm_led3.duty_u16(rgb[2])
    
        couleur_led(maisons[r.json()["message"]])
        
    except Exception as e:
        print(e)