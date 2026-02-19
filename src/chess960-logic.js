/**
 * Chess960 (Fischer Random Chess) Logic Module
 * This module contains the core logic for generating valid Chess960 starting positions
 */

/**
 * Generate a valid Chess960 starting position
 * This function generates positions based on the square color pattern where:
 * position 0 = dark square, position 1 = light square, etc.
 * 
 * @returns {Array<string>} Array of 8 piece names in Chess960 order
 */
function generateChess960Position() {
    const pieces = new Array(8);

    // Place bishops on opposite colored squares
    // For Blue/Yellow: positions 0,2,4,6 are dark; 1,3,5,7 are light
    const lightSquares = [1, 3, 5, 7]; // light square positions
    const darkSquares = [0, 2, 4, 6];  // dark square positions

    // Randomly place first bishop on a light square
    const lightBishopPos = lightSquares[Math.floor(Math.random() * lightSquares.length)];
    pieces[lightBishopPos] = 'bishop';

    // Randomly place second bishop on a dark square
    const darkBishopPos = darkSquares[Math.floor(Math.random() * darkSquares.length)];
    pieces[darkBishopPos] = 'bishop';

    // Get remaining empty positions
    const emptyPositions = [];
    for (let i = 0; i < 8; i++) {
        if (!pieces[i]) emptyPositions.push(i);
    }

    // Place queen randomly in one of the remaining positions
    const queenIndex = Math.floor(Math.random() * emptyPositions.length);
    pieces[emptyPositions[queenIndex]] = 'queen';
    emptyPositions.splice(queenIndex, 1);

    // Place knights randomly in two of the remaining positions
    const knight1Index = Math.floor(Math.random() * emptyPositions.length);
    pieces[emptyPositions[knight1Index]] = 'knight';
    emptyPositions.splice(knight1Index, 1);

    const knight2Index = Math.floor(Math.random() * emptyPositions.length);
    pieces[emptyPositions[knight2Index]] = 'knight';
    emptyPositions.splice(knight2Index, 1);

    // Place rooks and king in the remaining positions (rook, king, rook order)
    // This ensures the king is between the two rooks (Chess960 rule)
    emptyPositions.sort((a, b) => a - b);
    pieces[emptyPositions[0]] = 'rook';
    pieces[emptyPositions[1]] = 'king';
    pieces[emptyPositions[2]] = 'rook';

    return pieces;
}

/**
 * Validate that a Chess960 position follows all the rules
 * 
 * @param {Array<string>} position - Array of 8 piece names
 * @returns {Object} Validation result with isValid flag and errors array
 */
function validateChess960Position(position) {
    const errors = [];

    // Check array length
    if (!Array.isArray(position) || position.length !== 8) {
        errors.push('Position must be an array of 8 pieces');
        return { isValid: false, errors };
    }

    // Check piece counts
    const pieceCounts = {};
    position.forEach(piece => {
        pieceCounts[piece] = (pieceCounts[piece] || 0) + 1;
    });

    if (pieceCounts['king'] !== 1) errors.push('Must have exactly 1 king');
    if (pieceCounts['queen'] !== 1) errors.push('Must have exactly 1 queen');
    if (pieceCounts['rook'] !== 2) errors.push('Must have exactly 2 rooks');
    if (pieceCounts['bishop'] !== 2) errors.push('Must have exactly 2 bishops');
    if (pieceCounts['knight'] !== 2) errors.push('Must have exactly 2 knights');

    // Check bishops on opposite colored squares
    const bishopPositions = [];
    position.forEach((piece, index) => {
        if (piece === 'bishop') bishopPositions.push(index);
    });

    if (bishopPositions.length === 2) {
        const bishop1Color = bishopPositions[0] % 2; // 0 = dark, 1 = light
        const bishop2Color = bishopPositions[1] % 2;
        if (bishop1Color === bishop2Color) {
            errors.push('Bishops must be on opposite colored squares');
        }
    }

    // Check king is between rooks
    const kingPos = position.indexOf('king');
    const rookPositions = [];
    position.forEach((piece, index) => {
        if (piece === 'rook') rookPositions.push(index);
    });

    if (rookPositions.length === 2 && kingPos !== -1) {
        const minRook = Math.min(...rookPositions);
        const maxRook = Math.max(...rookPositions);
        if (kingPos <= minRook || kingPos >= maxRook) {
            errors.push('King must be between the two rooks');
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Generate a traditional chess starting position
 * 
 * @returns {Array<string>} Array of 8 piece names in traditional order
 */
function generateTraditionalPosition() {
    return ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
}

// Export for Node.js (Jest) and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateChess960Position,
        validateChess960Position,
        generateTraditionalPosition
    };
}

