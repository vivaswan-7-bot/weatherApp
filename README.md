# Weather App

This is a React-based weather application that allows users to search for the current weather conditions in various cities. It provides details such as temperature, humidity, wind speed, and a weather icon based on the city's current conditions.

---

## Features

- **Search Weather by City:** Fetch current weather details by entering a city name.
- **Weather Details:** Displays temperature, humidity, wind speed, and corresponding weather icon.
- **Search History:** Keeps track of the last 5 searched cities for easy access.
- **Custom Weather Icons:** Dynamic icons for day and night weather conditions.
- **Responsive Design:** User-friendly interface compatible with multiple devices.

---

## Demo

### **Loading Weather Data:**
- Users can search for cities and see dynamic weather information using icons and key weather metrics.

### **Search History:**
- Recent searches can be revisited via the history interface. Users can also clear history to focus on fresh results.

---

## Technologies Used

- **React:** Frontend framework for building the application.
- **CSS:** Styling the user interface.
- **OpenWeatherMap API:** Fetching real-time weather data.

---

## Screenshots

1. **Search Interface:**
   - Shows a user-friendly input field and search button.

2. **Weather Data Display:**
   - Includes weather icons, temperature, and city-specific details.

3. **Search History Dropdown:**
   - Allows users to select from recent searches or clear the history.

---

## How It Works

1. On launch, the app loads weather data for a default city (e.g., Chennai).
2. Users can input a city name and press "Enter" or click the search icon to fetch weather data.
3. The app dynamically updates and displays weather details for the searched city.
4. The most recent 5 city searches are saved locally and displayed as a dropdown in the search history.

---

## Notes

- Weather icons dynamically update based on time of day (day/night) and the weather condition.
- Error handling is implemented to display alerts if the city is invalid or there is a failure in fetching data.
- Search history is stored locally, allowing users to revisit previous searches even after refreshing the page.
