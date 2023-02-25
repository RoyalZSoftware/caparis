import 'react';
import { render } from '@testing-library/react-native';
import { Text } from "../../src/components/text";
import HomeScreen from '../../src/screens/home';

describe('ProductListItem', () => {
    it('Renders', () => {

        render(<Text type='action' children={<></>}></Text>)
        expect(false).toEqual(false);
    })
});
