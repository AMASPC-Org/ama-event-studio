import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('System Health', () => {
    it('renders without crashing', () => {
        render(<div>Mission Control Online</div>);
        expect(screen.getByText('Mission Control Online')).toBeInTheDocument();
    });
});
