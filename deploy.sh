#!/bin/bash

ng build --base-href "https://kalitva.github.io/weather-client/" || exit
npx ngh --dir dist/weather-client
