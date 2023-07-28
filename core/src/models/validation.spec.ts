import { Guardable, GuardClause, PresenceValidator } from "./validation";

class SampleGuardable extends Guardable<SampleGuardable> {
    get guards(): GuardClause<any>[] {
    return [
        new GuardClause<SampleGuardable>(c => c.name, [PresenceValidator]),
    ];
    }

    constructor(private name: string) {
        super();
        this.guard();
    }
}
describe("Validation", () => {
    it("Should throw error", () => {
        expect(() => {
            new SampleGuardable("asdf");
        }).not.toThrowError();
        expect(() => {
            new SampleGuardable(null);
        }).toThrowError();
    })
})