import axios from 'axios';
import { WebDriver } from '../src/WebDriver';

jest.mock("axios");
const mockedAxios = axios as any;

describe('WebDriver', () => {
    it('starts a plot', async () => {
        let driver = new WebDriver();
        mockedAxios.post.mockResolvedValueOnce(true);
        let result = await driver.start();
        expect(result).toBe(true);
    });

    it('receives commands', async () => {
        let driver = new WebDriver();
        mockedAxios.post.mockResolvedValue(true);
        let received = await driver.receive('command');
        expect(received).toBe(true);
    });

    it('notifies on updates', async() => {
        let driver = new WebDriver();
        let updated = false;
        driver.onUpdate(_state => {
            updated = true;
        });
        mockedAxios.post.mockResolvedValue(true);
        await driver.update();
        expect(updated).toBe(true);
    });
});
