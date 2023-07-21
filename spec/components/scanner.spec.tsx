import { render, screen } from "@testing-library/react-native";
import ScannerScreen from "../../src/screens/scanner";

describe('ScanScreen', () => {
    it('ScanScreen renders', () => {
        expect(() => {
            render(<ScannerScreen></ScannerScreen>);
        }).not.toThrowError();
    });

    it('has a bar code scanner', () => {
        render(<ScannerScreen></ScannerScreen>);
        
        const scanner = screen.getByTestId('scanner');
        
        expect(scanner).toBeVisible();
    });

    it('passing in a bar code will open the details page for capturing', () => {
        render(<ScannerScreen></ScannerScreen>);
    })
})