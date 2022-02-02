import axios from 'axios';
import { WebDriver } from '../src/WebDriver';

jest.mock("axios");
const mockedAxios = axios as any;

describe('WebDriver', () => {
    it('starts a plot', async () => {
        let driver = new WebDriver();
        let expected = {
            data: {
                messages: '<p>the messages</p>'
            }
        };
        mockedAxios.get.mockResolvedValueOnce(expected);
        mockedAxios.post.mockResolvedValueOnce(expected);
        let result = await driver.start();
        expect(result).toEqual(expected.data);
    });

    it('receives input and updates', async () => {
        let driver = new WebDriver();
        let updated = false;
        driver.onUpdate(_state => {
            updated = true;
        });
        mockedAxios.post.mockResolvedValue({
            data: {
                queue: []
            }
        });
        await driver.receive('command');
        expect(updated).toBe(true);
    });
});
