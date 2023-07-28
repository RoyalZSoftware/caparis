import 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';

describe('ProductListItem', () => {
    it('Renders', () => {
        render(<Text testID={'text'}>Hallo</Text>);

        expect(screen.getByTestId('text')).toHaveTextContent('Hallo');
    })
});
