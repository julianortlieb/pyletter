# pyletter
<img src="https://upload.wikimedia.org/wikipedia/de/thumb/1/1d/DHBW-Logo.svg/2880px-DHBW-Logo.svg.png" alt="drawing" width="200"/>

Ein Projekt für das Fach "Einführung in die künstliche Intelligenz" an der DHBW Lörrach.

Von folgenden Teammitgliedern:
- Benedikt Kupfer
- Jonas Schlachter
- Julian Ortlieb
- Patrick Egen

## Grundlagen
### Neuronales Netz
Das neuronale Netz soll auf Tensorflow und den MNIST-Datensatz beruhen.

> Der MNIST-Datensatz ist ein Datensatz mit vielen handgeschriebenen Ziffern und wird oft als Einstieg für die neuronale Netzte verwendet.

Das Netz muss trainiert werden und das abgespeicherte Netz dann für die laufende Anwendung verwendet werden.

### GUI
--TODO--

## Aufgabe
Folgende Anforderungen sind in diesem Projekt zu lösen (Auswahl):
- Theorieteil zur Klassifikation bzw. Erkennung handschriftlicher Zeichen,
- Implementierung in Java (mit deepLearning4Java) oder Python (z.B., via keras oder einem anderen geeigneten Package)
- Aufbau einer Test- und Trainingsmenge für die Modellierung und dessen Evaluation,
- Implementierung eines GUI zur Eingabe handschriftlicher Ziffern und gleichzeitig die Ausgabe der erkannten und konvertierten Ziffer in Form von Maschinentext.

## Starten des Webservers
``` bash
cd src/
python manage.py runserver
```