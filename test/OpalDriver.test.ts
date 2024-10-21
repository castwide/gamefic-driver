import { OpalDriver } from '../src/OpalDriver';

let character = {
    $output: () => {
        return {
            $to_json: () => {
                return JSON.stringify({
                    messages: "<p>the messages</p>",
                    queue: []
                });
            }
        };
    },
    $queue: () => {
        return {
            $push: (_input) => { }
        }
    }
}

let plot = {
    $new: () => { return plot },
    $save: () => {
        return {
            $to_json: () => {
                return "{}";
            }
        };
    },
    $introduce: (_) => { return character },
    $players: () => {
        return {
            $first: () => { return character }
        }
    }
}

let narrator = {
    $new: () => { return narrator },
    $start: () => { },
    $finish: () => { }
}

let opalMock = {
    gvars: {},
    Object: {
        $const_get: (name) => {
            if (name == 'Gamefic::Plot') return plot;
            if (name == 'Gamefic::Narrator') return narrator;
            throw(`Constant ${name} not defined in opalMock`);
        }
    }
}

describe('OpalDriver', () => {
    it('starts a plot', async () => {
        let driver = new OpalDriver(opalMock);
        const result = await driver.start();
        expect(result).toBe(true);
    });

    it('receives commands', async () => {
        let driver = new OpalDriver(opalMock);
        await driver.start();
        const result = await driver.receive('command');
        expect(result).toBe(true);
    });

    it('notifies on updates', async () => {
        let driver = new OpalDriver(opalMock);
        await driver.start();
        let updated = false;
        driver.onUpdate(_state => {
            updated = true;
        });
        await driver.update();
        expect(updated).toBe(true);
    });
});
