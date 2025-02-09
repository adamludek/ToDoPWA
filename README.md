# 📌 ToDo PWA

## 📖 Opis projektu
ToDo PWA to progresywna aplikacja webowa (**PWA**) umożliwiająca użytkownikom zarządzanie listą zadań.  
Aplikacja działa **offline**, wspiera **powiadomienia push**, a dane są przechowywane w **IndexedDB**,  
co zapewnia trwałość nawet po odświeżeniu strony.

---

## 🚀 Funkcjonalności
- **📱 PWA (Progressive Web App)** – Możliwość instalacji na urządzeniach mobilnych i desktopowych.
- **📌 Dodawanie, edycja, usuwanie zadań** – Zadania przechowywane są w IndexedDB.
- **🔄 Synchronizacja między oknami** – Dzięki `BroadcastChannel`, zmiany w jednej zakładce pojawiają się w innych.
- **📍 Geolokalizacja** – Przy dodawaniu zadania można pobrać nazwę miasta.
- **🔔 Powiadomienia push** – Informują o dodaniu i usunięciu zadania.
- **📳 Wibracje** – Telefon wibruje po usunięciu zadania (jeśli obsługuje `navigator.vibrate`).
- **⚡ Strategia cache Network First** – Aplikacja działa zarówno online, jak i offline.
- **📊 Trzy główne widoki aplikacji:**
  - 📝 **Lista zadań** – przeglądanie zapisanych zadań.
  - ➕ **Dodawanie zadania** – formularz do wprowadzania nowych zadań.
  - 📈 **Statystyki** – wizualizacja danych dotyczących wykonanych zadań.
- **📏 Responsywność** – Zapewniona przez **Tailwind CSS**, co gwarantuje poprawne wyświetlanie aplikacji na różnych urządzeniach.

---

## 🖼 Zrzuty ekranu

### 📋 Lista zadań
![Lista zadań](screenshots/todo_list.png)

### ➕ Dodawanie zadania
![Dodawanie zadania](screenshots/add_task.png)

### 📊 Statystyki
![Statystyki](screenshots/stats.png)

---

## 🛠 Technologie i języki programowania

Aplikacja została stworzona w oparciu o **JavaScript** i wykorzystuje nowoczesne technologie webowe:

- **🟡 JavaScript (ES6+)** – główny język programowania aplikacji.
- **⚛ React.js** – framework do budowy interfejsu użytkownika.
- **📜 HTML5** – struktura aplikacji.
- **🎨 CSS3 + Tailwind CSS** – stylowanie interfejsu, responsywność.
- **🗄 IndexedDB + idb** – lokalna baza danych do przechowywania zadań.
- **📡 Service Worker** – cache i obsługa trybu offline.
- **🔔 Web Push API** – obsługa powiadomień push.
- **📍 Geolocation API** – pobieranie lokalizacji użytkownika.
- **🔄 BroadcastChannel API** – synchronizacja danych między zakładkami.

Aplikacja jest **Progressive Web App (PWA)**, co oznacza, że działa **offline**,  
może być **instalowana na telefonie** i obsługuje **powiadomienia push**.

---

## 📦 Instalacja i uruchomienie lokalne

1. **Sklonuj repozytorium**
   ```sh
   git clone https://github.com/TwojUser/ToDoPWA.git
   cd ToDoPWA
2. **Zainstaluj zależności**
   ```sh
   npm install
3. **Uruchom aplikację w trybie deweloperskim**
   ```sh
   npm run dev
4. **Wersja produkcyjna** (z build i podglądem)
   ```sh
   npm run build
   npm run preview -- --host
5. **Dostęp do aplikacji na telefonie**
  - Sprawdź lokalny adres IP komputera (np. `192.168.0.51`).
  - Otwórz `http://192.168.0.51:4173/` na telefonie.

---

## 🌍 Wdrożenie na Netlify

1. **Zaloguj się na [Netlify](https://www.netlify.com/)**
2. **Połącz konto z repozytorium GitHub**
3. **Ustawienia kompilacji:**
   - `Build command`: `npm run build`
   - `Publish directory`: `dist` (lub `build`)
4. **Zatwierdź i wdroż aplikację**

---

## ⚡ Strategia cache w Service Worker

Aplikacja wykorzystuje **Network First**:
- **Jeśli połączenie internetowe jest dostępne**, dane są pobierane z sieci i zapisywane w cache.
- **Jeśli użytkownik jest offline**, dane są ładowane z cache.
- Pliki statyczne (`index.html`, `manifest.json`, ikony) są cache'owane podczas instalacji Service Workera.

---



## 🗄 IndexedDB – Jak przechowywane są dane?

Aplikacja wykorzystuje **IndexedDB** do przechowywania danych lokalnie.

### **Instalacja biblioteki IDB**
Do obsługi IndexedDB wykorzystywana jest biblioteka `idb`. Jeśli nie jest zainstalowana, można to zrobić za pomocą:
```sh
npm install idb
```
**Format danych w IndexedDB**
Każde zadanie ma następującą strukturę:
```json
{
  "id": 1700000000000,
  "name": "Przykładowe zadanie",
  "description": "Opis zadania",
  "deadline": "2024-06-15",
  "priority": { "color": "bg-red-500" },
  "city": "Warszawa"
}
```
  -	id – Unikalny identyfikator zadania (generowany na podstawie timestampu).
	-	name – Nazwa zadania (minimum 3 znaki).
	-	description – Opcjonalny opis zadania.
	-	deadline – Data wykonania zadania.
	-	priority – Priorytet zadania (kolor kafelka).
	-	city – Miasto, w którym dodano zadanie (pobrane przez geolokalizację).
- Dane przechowywane są lokalnie i nie znikają po odświeżeniu strony.
- Synchronizacja między zakładkami realizowana jest przez BroadcastChannel.
	
---


## 📱 Jak zainstalować PWA na telefonie?

### **📌 Android (Chrome, Edge, Brave, Firefox Mobile, Opera)**
1. Otwórz aplikację w przeglądarce **Chrome**.
2. Kliknij **`⋮`** (trzy kropki) → **Dodaj do ekranu głównego**.
3. Nadaj nazwę i zatwierdź – aplikacja pojawi się jak natywna aplikacja!

### **📌 iPhone (Safari – ograniczone PWA)**
1. Otwórz aplikację w **Safari**.
2. Kliknij **`Udostępnij`** (ikona kwadratu ze strzałką) → **Dodaj do ekranu początkowego**.
3. Nadaj nazwę i dodaj – aplikacja pojawi się na ekranie głównym.

---

## 📌 TODO / Planowane ulepszenia
✅ Obsługa kont użytkowników (logowanie przez Firebase).  
✅ Integracja z backendem dla synchronizacji danych.  
✅ Powiadomienia push z zewnętrznym serwerem (np. Firebase Cloud Messaging).  
✅ Obsługa przypomnień dla zadań.  
✅ Rozszerzona obsługa wibracji dla różnych akcji użytkownika.

---

## 📜 Licencja

Projekt open-source na licencji **MIT**. Możesz dowolnie modyfikować i używać kodu.
