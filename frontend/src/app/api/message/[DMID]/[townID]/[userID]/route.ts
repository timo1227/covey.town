import dbConnect from '../../../../../../utils/dbConnect';
import Town from '../../../../../../models/Town';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { DMID: string; townID: string; userID: string };
  },
) {
  try {
    await dbConnect();
    // Get the town
    const town = await Town.findOne({ townID: params.townID });
    if (!town) return new Response(JSON.stringify({ error: 'Town not found' }), { status: 404 });
    // Get the town user
    const townUser = town.townUsers.find(
      (user: { tokenID: string }) => user.tokenID === params.userID,
    );
    if (!townUser)
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    // Get All Messages from with DMID in townUser.messages
    const dmMessages = townUser.messages.filter(
      (message: { tokenID: string }) => message.tokenID === params.DMID,
    );

    return new Response(JSON.stringify({ dmMessages }));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: 'Error with Server' }), { status: 500 });
  }
}
