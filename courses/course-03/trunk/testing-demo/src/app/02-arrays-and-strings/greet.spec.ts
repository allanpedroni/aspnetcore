import { greet } from './greet';

describe('greet', () => {
    it('should inlude the name in the message', () => {
        const result = greet('Allan');
        expect(result).toContain('Allan');
    });
});
