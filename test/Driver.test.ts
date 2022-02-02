import { Driver } from '../src/Driver';

class TestDriver extends Driver {
    update() {
        this.notify({
            updated: true
        });
        return null;
    }

    start() { return null; }

    receive(_input) { return null; }

    snapshot() { return null; }

    restore(_data) { return null; }
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
