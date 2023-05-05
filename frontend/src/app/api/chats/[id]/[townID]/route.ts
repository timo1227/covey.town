import dbConnect from '../../../../../utils/dbConnect';
import Town from '../../../../../models/Town';

export async function GET(req: Request, { params }: { params: { id: string; townID: string } }) {
  const { id, townID } = params;
  await dbConnect();

  try {
    const town = await Town.findOne({ townID });
    if (!town) return new Response(JSON.stringify({ error: 'Town not found' }), { status: 404 });

    const townUser = town.townUsers.find((user: { tokenID: string }) => user.tokenID === id);
    if (!townUser)
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });

    const chats = await townUser.chats;
    if (!chats) return new Response(JSON.stringify({ error: 'Chat not found' }), { status: 404 });

    return new Response(JSON.stringify(chats), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: 'Error with Server' }), { status: 500 });
  }
}
