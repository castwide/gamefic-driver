import { Driver } from '../src/Driver';

class TestDriver extends Driver {
    update() {
        this.notify({
            updated: true
        });
    }

    start() { return null; }

    receive(_input) { }

    snapshot() { return null; }

    restore(_data) { }
}

describe('Driver', () => {
    it('runs callbacks', () => {
        let driver = new TestDriver();
        let updated = false;
        driver.onUpdate((state) => {
            updated = state.updated;
        })
        driver.update();
        expect(updated).toBe(true);
    });
});
