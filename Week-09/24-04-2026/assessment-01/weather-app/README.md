# Angular Weather Component

## Question

An array of objects is passed as a prop to the component, where each object is a weather record for a single city. The object has 4 properties:

- **name:** The name of the city. [STRING]
- **temperature:** The temperature in the city. [STRING]
- **wind:** The wind in the city. [STRING]
- **humidity:** The humidity in the city. [STRING]

There is an input field for the city name where the user can type the name of a city to search the weather data for. (The city name is case-insensitive.)

If data exists for the typed input, render the weather details as below:
- `{temperature}` where {temperature} is the value from the weather record.
- `Wind: {wind}` where {wind} is the value from the weather record.
- `Humidity: {humidity}` where {humidity} is the value from the weather record.

If no data exists for the typed input, do not render the weather details but instead render **No Results Found**.

At component render, since nothing is typed, do not render above 2 divs.

### Testing Requirements
- The city name input should have the data-test-id attribute `app-input`
- The div containing weather details should have the data-test-id attribute `weather-details`
- The div containing temperature should have the data-test-id attribute `output-temperature`
- The div containing wind should have the data-test-id attribute `output-wind`
- The div containing humidity should have the data-test-id attribute `output-humidity`
- The No Results Found div should have the data-test-id attribute `no-results`

---

## Environment
- Angular CLI Version: 10
- Node Version: 18+
- Default Port: 8000

---

## What I Did

Built the weather search component in Angular 15. The component takes an array of city weather objects as an `@Input()` prop. A search input filters cities by name in a case-insensitive manner using a TypeScript getter. If a match is found, the weather details card is displayed. If no match is found, a No Results Found message is shown. On initial load, neither is rendered. All required `data-test-id` attributes are implemented. The UI is styled with a dark glassmorphism theme using Bebas Neue and Nunito fonts with orange accents.

---

## Project Structure

```
weather-app/
├── src/
│   └── app/
│       ├── app.module.ts
│       ├── app.component.ts
│       ├── app.component.html
│       ├── app.component.css
│       └── weather/
│           ├── weather.component.ts
│           ├── weather.component.html
│           └── weather.component.css
├── tsconfig.json
├── angular.json
└── package.json
```

---

## Commands

```bash
npm install -g @angular/cli@10 --legacy-peer-deps
ng new weather-app --style=css --routing=false
cd weather-app
ng generate component weather --skip-tests
ng serve --port 8000
```

---

## Test IDs

| Element | data-test-id |
|---|---|
| City search input | `app-input` |
| Weather details wrapper | `weather-details` |
| Temperature display | `output-temperature` |
| Wind display | `output-wind` |
| Humidity display | `output-humidity` |
| No results message | `no-results` |