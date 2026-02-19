# 4PlayerChess - Riley Edits

This is a modified version of the original [4PlayerChess](https://github.com/KylerCondran/4PlayerChess.git) project with Chess960 (Fischer Random Chess) support and comprehensive unit testing.

## Description of Changes

### **Major Additions**

#### 1. **Game Mode Selection Menu**
- Created `src/menu.html` - A landing page for selecting game modes
- Simple, minimalist design with dark cyan background (#004d4d)
- Features the "Clown meme.png" image
- Two game mode options:
  - Traditional 4-Player Chess
  - Chess960 (Fischer Random)
- Styles integrated into existing `style.css` stylesheet

#### 2. **Chess960 (Fischer Random Chess) Implementation**
- Created `src/chess960.html` - A new game mode that implements Chess960 rules
- Implemented randomized starting positions following official Chess960 rules:
  - Bishops must be placed on opposite-colored squares
  - King must be placed between the two rooks
  - 960 possible unique starting positions
  - Maintains 4-player symmetry


#### 3. **Comprehensive Unit Testing Framework**
- Added Jest testing framework with jsdom environment
- Created `src/chess960-logic.js` - Extracted testable Chess960 logic module
- Created `tests/chess960.test.js` - 12 comprehensive unit tests
- Achieved **92.53% code coverage** on Chess960 logic

### **Files Created/Modified**

**New Files:**
- `package.json` - Project configuration and Jest setup
- `src/menu.html` - Game mode selection landing page
- `src/chess960.html` - Chess960 game mode
- `src/chess960-logic.js` - Testable Chess960 logic module
- `tests/chess960.test.js` - Unit test suite (12 tests)

**Modified Files:**
- `src/chess960.html` - Fixed square color pattern bug for Red/Green players
- `src/style.css` - Added menu page styles

## Thoughts on the Existing Code

### **Strengths:**
- Clean, well-structured HTML/CSS/JavaScript implementation
- Excellent visual design with rotating board for each player's turn
- Good separation of concerns (chess.js handles game logic)
- Comprehensive move validation for all piece types
- Support for special moves (en passant, pawn promotion)
- Captured pieces tracking
- Resign functionality

### **Areas for Improvement:**
- No existing unit tests (addressed in this fork)
- Chess960 implementation had a critical bug with square color patterns (fixed)
- No package.json or dependency management (added)
- Castling not implemented (noted as acceptable by requirements)

### **Code Quality:**
The original codebase is well-written and maintainable. The game logic is sound, and the UI/UX is intuitive. The main gap was in testing, which has been addressed in this repo.

## How to Run the Project

### **Prerequisites**
- A modern web browser (Chrome, Firefox, Edge, Safari)
- Node.js and npm (for running tests)

### **Running the Game**

#### **Option 1: Using Python's Built-in Server**
```bash
# Navigate to the src directory
cd src

# Start a local web server
python -m http.server 8000

# Open your browser to:
# - Menu/Landing Page: http://localhost:8000/menu.html
# - Traditional 4-Player Chess: http://localhost:8000/index.html
# - Chess960 Mode: http://localhost:8000/chess960.html
```

#### **Option 2: Using Node.js http-server**
```bash
# Install http-server globally (one time)
npm install -g http-server

# Navigate to the src directory
cd src

# Start the server
http-server -p 8000

# Open your browser to:
# - Menu/Landing Page: http://localhost:8000/menu.html
# - Traditional 4-Player Chess: http://localhost:8000/index.html
# - Chess960 Mode: http://localhost:8000/chess960.html
```

#### **Option 3: Direct File Opening**
Simply open `src/menu.html`, `src/index.html`, or `src/chess960.html` directly in your browser (may have limitations with some browsers).

**Recommended**: Start with `menu.html` to choose your game mode!

## How to Run the Tests

### **Install Dependencies**
```bash
# Install all dependencies (including Jest)
npm install
```

### **Run Tests**
```bash
# Run all tests once
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### **Test Results**
The test suite includes **12 comprehensive tests**:
- Chess960 position generation (6 tests)
- Chess960 position validation (4 tests)
- Traditional chess position (2 tests)

All tests verify that both traditional and Chess960 board setups work correctly.

## Test Coverage

```
File               | % Stmts | % Branch | % Funcs | % Lines
-------------------|---------|----------|---------|--------
chess960-logic.js  |   92.53 |    86.84 |     100 |   96.49
```

## Game Modes

### **Menu/Landing Page**
- File: `src/menu.html`
- Simple game mode selection screen
- Dark cyan background with minimalist design
- Choose between Traditional or Chess960 mode

### **Traditional 4-Player Chess**
- File: `src/index.html`
- Standard chess starting position
- 4 players: Red, Blue, Yellow, Green
- Turn-based gameplay with board rotation

### **Chess960 (Fischer Random Chess)**
- File: `src/chess960.html`
- Randomized starting positions following Chess960 rules
- Same 4-player mechanics as traditional mode
- 960 possible unique starting positions

## Original Repository

This project is based on: [https://github.com/KylerCondran/4PlayerChess.git](https://github.com/KylerCondran/4PlayerChess.git)



