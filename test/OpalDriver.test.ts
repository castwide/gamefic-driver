import { OpalDriver } from '../src/OpalDriver';

let opalMock = {
    gvars: {
        plot: {
            $ready: () => { },
            $update: () => { },
            $save: () => {
                return {
                    $to_json: () => {
                        return "{}";
                    }
                };
            }
        },
        character: {
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
    }
}

describe('OpalDriver', () => {
    it('starts a plot', () => {
        let driver = new OpalDriver(opalMock);
        return driver.start().then(result => {
            let parsed = JSON.parse(opalMock.gvars.character.$output().$to_json());
            expect(result).toEqual(parsed);
        });
    });

    it('receives input and updates', () => {
        let driver = new OpalDriver(opalMock);
        let updated = false;
        driver.onUpdate(_state => {
            updated = true;
        });
        return driver.start().then(result => {
            driver.receive('command');
            expect(updated).toBe(true);
        });
    });
});
