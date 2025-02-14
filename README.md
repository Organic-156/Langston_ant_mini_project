# 🐜 Langton's Ant Simulation

A **Rust + WebAssembly (WASM)** implementation of **Langton's Ant**, a simple **Turing-complete cellular automaton**. This simulation uses **HTML, JavaScript, and Canvas** to visualize the ant's movement.

## 🚀 Features
- 🟦 **Dynamic grid animation** with smooth transitions.
- 🐜 **Ant movement with directional rotation.**
- 🎨 **Customizable grid size, colors, and speed.**
- 🎮 **Interactive controls (Start, Pause, Reset, Speed Adjust).**

---

## 🛠️ Installation

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

### **2️⃣ Install Rust & WebAssembly Tools**
Ensure you have **Rust** installed along with `wasm-pack`:
```sh
cargo install wasm-pack  # Install wasm-pack if not installed
```

---

## 🔨 Building the Project
Run the following command **whenever you make changes**:
```sh
wasm-pack build --target web
```

---

## ▶️ Hosting Locally
Choose one of the following methods to serve the project:

### **Option 1: Using Python HTTP Server**
```sh
python -m http.server 8000
```
Then open **http://localhost:8000/index.html** in your browser.

### **Option 2: Using Node.js (`http-server`)**
```sh
npm install -g http-server  # Install once
http-server
```
Then open **http://localhost:8080/index.html**.

---

## 🎮 Controls
| **Button**      | **Function** |
|---------------|-------------|
| **Start** | Starts the ant simulation. |
| **Pause** | Stops the simulation temporarily. |
| **Reset** | Resets the simulation back to the initial state. |
| **Speed Slider** | Adjusts the simulation speed dynamically. |

---

## 🎨 Customization

### **1️⃣ Adjust Grid Size**
Modify these values in `index.js`:
```js
const width = 25;  // Number of columns
const height = 25; // Number of rows
```

### **2️⃣ Change Colors**
Modify these values in `index.js`:
```js
const GRID_COLOR = "#BBBBBB";    // Grid lines
const WHITE_COLOR = "#F8F8F8";   // White squares
const BLACK_COLOR = "#333333";   // Black squares
const ANT_COLOR = "#FF4500";     // Ant color
```

### **3️⃣ Adjust Speed**
Modify the transition duration in `index.js`:
```js
const TRANSITION_DURATION = 200;  // Milliseconds
```
