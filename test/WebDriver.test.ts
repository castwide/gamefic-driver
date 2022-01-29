import axios from 'axios';
import { WebDriver } from '../src/WebDriver';

jest.mock("axios");

describe('WebDriver', () => {
    it('starts a plot', async () => {
        let driver = new WebDriver();
        let expected = {
            data: {
                messages: '<p>the messages</p>'
            }
        };
        axios.get.mockResolvedValueOnce(expected);
        axios.post.mockResolvedValueOnce(expected);
        let result = await driver.start();
        expect(result).toEqual(expected.data);
    });
});
