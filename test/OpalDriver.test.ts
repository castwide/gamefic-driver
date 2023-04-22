import { OpalDriver } from '../src/OpalDriver';

let plot = {
    $ready: () => { },
    $update: () => { },
    $save: () => {
        return {
            $to_json: () => {
                return "{}";
            }
        };
    },
    $make_player_character: () => { return character },
    $introduce: (_) => {},
    $players: () => { return {
        $first: () => { return character }
    }}
}

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

let opalMock = {
    gvars: {},
    Object: {
        $const_get: (_) => { return {
            $new: ()=> { return plot },
            $restore: (_) => { return plot }
        }}
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
        const result = await driver.receive('command');
        expect(result).toBe(true);
    });

    it('notifies on updates', async () => {
        let driver = new OpalDriver(opalMock);
        let updated = false;
        driver.onUpdate(_state => {
            updated = true;
        });
        await driver.update();
        expect(updated).toBe(true);
    });
});
