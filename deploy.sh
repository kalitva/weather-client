#!/bin/bash

ng build --base-href "https://kalitva.github.io/weather-client/" || exit
ngh --dir dist/weather-client
