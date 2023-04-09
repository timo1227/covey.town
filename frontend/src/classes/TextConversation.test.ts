import { mock, MockProxy } from 'jest-mock-extended';
import TownController from './TownController';
import TextConversation from './TextConversation';

describe('TextConversation', () => {
  let textConversation: TextConversation;
  const townController: MockProxy<TownController> = mock<TownController>();

  beforeEach(() => {
    textConversation = new TextConversation(townController);
  });

  afterEach(() => {
    textConversation.close();
  });

  it('should send a message to the server', () => {
    const emitChatMessageSpy = jest.spyOn(townController, 'emitChatMessage');
    const message = 'hello world';
    textConversation.sendMessage(message);

    expect(emitChatMessageSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        body: message,
        author: townController.userName,
      }),
    );
  });
});
