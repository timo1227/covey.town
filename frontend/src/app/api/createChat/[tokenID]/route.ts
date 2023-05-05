import dbConnect from '../../../../utils/dbConnect';
import Town from '../../../../models/Town';

export async function PUT(req: Request, { params }: { params: { tokenID: string } }) {
  await dbConnect();
  const { townID, playerChatToken } = await req.json();

  // Find town by townID
  const town = await Town.findOne({ townID }).catch((err: Error) => {
    console.log('Error on findOne: ', err);
    return new Response(JSON.stringify({ error: 'Error on findOne: ' + err }), { status: 400 });
  });

  // Find the Sender in the townUsers array
  const townSender = town.townUsers.find(
    (user: { tokenID: string }) => user.tokenID === params.tokenID,
  );

  // If the sender already has a chat with the player, return
  const senderChatExists = townSender.chats.find(
    (chat: { tokenID: string }) => chat.tokenID === playerChatToken,
  );
  if (senderChatExists) {
    return new Response(JSON.stringify({ msg: 'Chat already exists between sender and player' }));
  }

  // Find the user in the townUsers array
  const townUser = town.townUsers.find(
    (user: { tokenID: string }) => user.tokenID === playerChatToken,
  );

  const senderChats = [
    ...townSender.chats,
    {
      userName: townUser.userName,
      tokenID: townUser.tokenID,
    },
  ];

  const userChats = [
    ...townUser.chats,
    {
      userName: townSender.userName,
      tokenID: townSender.tokenID,
    },
  ];

  // DELETE TOWNUSER AND TOWNSENDER FROM townUsers array
  town.townUsers = town.townUsers.filter(
    (user: { tokenID: string }) => user.tokenID !== playerChatToken,
  );

  // DELETE TOWNUSER AND TOWNSENDER FROM townUsers array
  town.townUsers = town.townUsers.filter(
    (user: { tokenID: string }) => user.tokenID !== params.tokenID,
  );

  // Replace townSender.chats with new senderChats array
  townSender.chats = senderChats;
  townUser.chats = userChats;

  // Push new User to townUsers array
  town.townUsers.push(townUser);
  town.townUsers.push(townSender);

  await town.save().catch((err: Error) => {
    console.log('Error on save: ', err);
    return new Response(JSON.stringify({ error: 'Error on save: ' + err }), { status: 400 });
  });

  return new Response(JSON.stringify({ msg: 'Successfully updated Town: ' + town }));
}
