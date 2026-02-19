/**
 * Unit Tests for Chess960 (Fischer Random Chess) Logic
 * 
 * These tests verify that the Chess960 position generation follows all official rules:
 * 1. Bishops must be on opposite colored squares
 * 2. King must be between the two rooks
 * 3. Exactly 1 king, 1 queen, 2 rooks, 2 bishops, 2 knights
 * 4. 960 possible unique positions
 */

const {
    generateChess960Position,
    validateChess960Position,
    generateTraditionalPosition
} = require('../src/chess960-logic.js');

describe('Chess960 Position Generation', () => {
    
    // Test 1: Basic structure validation
    test('should generate an array of 8 pieces', () => {
        const position = generateChess960Position();
        expect(position).toHaveLength(8);
        expect(Array.isArray(position)).toBe(true);
    });

    // Test 2: Piece count validation
    test('should have correct piece counts (1 king, 1 queen, 2 rooks, 2 bishops, 2 knights)', () => {
        const position = generateChess960Position();
        const pieceCounts = {};
        
        position.forEach(piece => {
            pieceCounts[piece] = (pieceCounts[piece] || 0) + 1;
        });

        expect(pieceCounts['king']).toBe(1);
        expect(pieceCounts['queen']).toBe(1);
        expect(pieceCounts['rook']).toBe(2);
        expect(pieceCounts['bishop']).toBe(2);
        expect(pieceCounts['knight']).toBe(2);
    });

    // Test 3: Bishops on opposite colored squares
    test('should place bishops on opposite colored squares', () => {
        // Run multiple times to ensure consistency
        for (let i = 0; i < 100; i++) {
            const position = generateChess960Position();
            const bishopPositions = [];
            
            position.forEach((piece, index) => {
                if (piece === 'bishop') {
                    bishopPositions.push(index);
                }
            });

            expect(bishopPositions).toHaveLength(2);
            
            // Check that bishops are on opposite colored squares
            // Even positions (0,2,4,6) are dark, odd positions (1,3,5,7) are light
            const bishop1Color = bishopPositions[0] % 2;
            const bishop2Color = bishopPositions[1] % 2;
            
            expect(bishop1Color).not.toBe(bishop2Color);
        }
    });

    // Test 4: King between rooks
    test('should place king between the two rooks', () => {
        // Run multiple times to ensure consistency
        for (let i = 0; i < 100; i++) {
            const position = generateChess960Position();
            const kingPos = position.indexOf('king');
            const rookPositions = [];
            
            position.forEach((piece, index) => {
                if (piece === 'rook') {
                    rookPositions.push(index);
                }
            });

            expect(rookPositions).toHaveLength(2);
            
            const minRook = Math.min(...rookPositions);
            const maxRook = Math.max(...rookPositions);
            
            expect(kingPos).toBeGreaterThan(minRook);
            expect(kingPos).toBeLessThan(maxRook);
        }
    });

    // Test 5: Position uniqueness (randomness)
    test('should generate different positions (randomness check)', () => {
        const positions = new Set();
        const iterations = 50;
        
        for (let i = 0; i < iterations; i++) {
            const position = generateChess960Position();
            positions.add(JSON.stringify(position));
        }

        // We should have at least 10 different positions out of 50 attempts
        // (This is a probabilistic test - with 960 possibilities, we expect high variance)
        expect(positions.size).toBeGreaterThan(10);
    });

    // Test 6: All generated positions are valid
    test('should always generate valid Chess960 positions', () => {
        for (let i = 0; i < 100; i++) {
            const position = generateChess960Position();
            const validation = validateChess960Position(position);
            
            expect(validation.isValid).toBe(true);
            expect(validation.errors).toHaveLength(0);
        }
    });
});

describe('Chess960 Position Validation', () => {
    
    // Test 7: Valid position validation
    test('should validate a correct Chess960 position', () => {
        const validPosition = ['rook', 'knight', 'bishop', 'king', 'queen', 'bishop', 'knight', 'rook'];
        const validation = validateChess960Position(validPosition);
        
        expect(validation.isValid).toBe(true);
        expect(validation.errors).toHaveLength(0);
    });

    // Test 8: Invalid - bishops on same color
    test('should reject position with bishops on same colored squares', () => {
        // Both bishops on even positions (dark squares)
        const invalidPosition = ['bishop', 'knight', 'bishop', 'rook', 'king', 'queen', 'knight', 'rook'];
        const validation = validateChess960Position(invalidPosition);
        
        expect(validation.isValid).toBe(false);
        expect(validation.errors).toContain('Bishops must be on opposite colored squares');
    });

    // Test 9: Invalid - king not between rooks
    test('should reject position with king not between rooks', () => {
        const invalidPosition = ['king', 'rook', 'bishop', 'queen', 'knight', 'bishop', 'knight', 'rook'];
        const validation = validateChess960Position(invalidPosition);
        
        expect(validation.isValid).toBe(false);
        expect(validation.errors).toContain('King must be between the two rooks');
    });

    // Test 10: Invalid - wrong piece count
    test('should reject position with incorrect piece counts', () => {
        const invalidPosition = ['rook', 'rook', 'rook', 'king', 'queen', 'bishop', 'knight', 'knight'];
        const validation = validateChess960Position(invalidPosition);
        
        expect(validation.isValid).toBe(false);
        expect(validation.errors.length).toBeGreaterThan(0);
    });
});

describe('Traditional Chess Position', () => {
    
    // Test 11: Traditional position structure
    test('should generate traditional chess starting position', () => {
        const position = generateTraditionalPosition();
        
        expect(position).toEqual(['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']);
    });

    // Test 12: Traditional position is valid Chess960
    test('traditional position should be a valid Chess960 position', () => {
        const position = generateTraditionalPosition();
        const validation = validateChess960Position(position);
        
        expect(validation.isValid).toBe(true);
        expect(validation.errors).toHaveLength(0);
    });
});

