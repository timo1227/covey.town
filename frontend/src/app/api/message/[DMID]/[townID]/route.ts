import dbConnect from '../../../../../utils/dbConnect';
import Town from '../../../../../models/Town';

export async function POST(req: Request, { params }: { params: { DMID: string; townID: string } }) {
  const { DMID, townID } = params;
  const { message, tokenID } = await req.json();
  try {
    await dbConnect();
    // Get the town
    const town = await Town.findOne({ townID });
    if (!town) return new Response(JSON.stringify({ error: 'Town not found' }), { status: 404 });
    // Get the town user
    const townUser = town.townUsers.find((user: { tokenID: string }) => user.tokenID === tokenID);
    if (!townUser)
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    // Get the DM user
    const dmUser = town.townUsers.find((user: { tokenID: string }) => user.tokenID === DMID);
    if (!dmUser) return new Response(JSON.stringify({ error: 'DM not found' }), { status: 404 });

    const dmMessages = [
      ...dmUser.messages,
      {
        userName: townUser.userName,
        tokenID: townUser.tokenID,
        message,
        timestamp: new Date().toISOString(),
      },
    ];

    const townMessages = [
      ...townUser.messages,
      {
        userName: townUser.userName,
        tokenID: dmUser.tokenID,
        message,
        timestamp: new Date().toISOString(),
      },
    ];

    // DELETE TOWNUSER AND TOWNSENDER FROM townUsers array
    town.townUsers = town.townUsers.filter((user: { tokenID: string }) => user.tokenID !== DMID);

    // DELETE TOWNUSER AND TOWNSENDER FROM townUsers array
    town.townUsers = town.townUsers.filter((user: { tokenID: string }) => user.tokenID !== tokenID);

    dmUser.messages = dmMessages;
    townUser.messages = townMessages;

    // Push the new townUser to the townUsers array
    town.townUsers.push(townUser);
    town.townUsers.push(dmUser);

    await town.save();
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: 'Error with Server' }), { status: 500 });
  }
  return new Response(JSON.stringify({ msg: 'Message Sent' }));
}
