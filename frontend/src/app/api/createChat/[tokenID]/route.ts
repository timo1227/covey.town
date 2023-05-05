import dbConnect from '../../../../utils/dbConnect';
import Town from '../../../../models/Town';

export async function PUT(req: Request, { params: { tokenID } }: { params: { tokenID: string } }) {
  await dbConnect();
  const { townID, playerChatToken } = await req.json();

  try {
    // Find town by townID
    const town = await Town.findOne({ townID });

    // Find the Sender and User in the townUsers array
    const [townSender, townUser] = town.townUsers.filter((user: { tokenID: string }) =>
      [tokenID, playerChatToken].includes(user.tokenID),
    );

    // If the sender already has a chat with the player, return
    // const senderChatExists = townSender.chats.find(
    //   (chat: { tokenID: string }) => chat.tokenID === playerChatToken,
    // );
    // if (senderChatExists) {
    //   return new Response(JSON.stringify({ msg: 'Chat already exists between sender and player' }));
    // }

    // If the player already has a chat with the sender, return
    // townSender.chats.forEach((chat: { tokenID: string }) => {
    //   console.log('chat.tokenID: ', chat.tokenID);
    //   console.log('playerChatToken: ', playerChatToken);
    //   if (chat.tokenID === playerChatToken) {
    //     return new Response(
    //       JSON.stringify({ msg: 'Chat already exists between sender and player' }),
    //     );
    //   }
    // });

    console.log(townSender.chats);

    // Create new chats for sender and user
    const senderChat = {
      userName: townUser.userName,
      tokenID: townUser.tokenID,
    };
    const userChat = {
      userName: townSender.userName,
      tokenID: townSender.tokenID,
    };

    // Remove old townUser and townSender objects from townUsers array
    town.townUsers = town.townUsers.filter(
      (user: { tokenID: string }) => ![playerChatToken, tokenID].includes(user.tokenID),
    );

    // Replace townSender.chats and townUser.chats with new chat arrays
    townSender.chats = townSender.chats.concat(senderChat);
    townUser.chats = townUser.chats.concat(userChat);

    // Push new townUser and townSender objects to townUsers array
    town.townUsers = town.townUsers.concat(townUser, townSender);

    await Promise.all([town.save()]);

    return new Response(JSON.stringify({ msg: 'Successfully ' }));
  } catch (error) {
    console.log('Error:', error);
    return new Response(JSON.stringify({ error: 'Error: ' + error }), { status: 400 });
  }
}
