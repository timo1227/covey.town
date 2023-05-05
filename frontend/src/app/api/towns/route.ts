import dbConnect from '../../../utils/dbConnect';
import Town from '../../../models/Town';

export async function POST(req: Request) {
  await dbConnect();

  const { townID, townFriendlyName } = await req.json();

  const newTown = new Town({
    townID,
    townFriendlyName,
    townUsers: [],
  });

  await newTown.save().catch((err: Error) => {
    console.log('Error on save: ', err);
    return new Response(JSON.stringify({ error: 'Error on save: ' + err }), { status: 400 });
  });
  return new Response(JSON.stringify({ msg: 'Successfully created new Town: ' + newTown }));
}

export async function PUT(req: Request) {
  await dbConnect();

  const { townID, townUser } = await req.json();

  const town = await Town.findOne({ townID }).catch((err: Error) => {
    console.log('Error on findOne: ', err);
    return new Response(JSON.stringify({ error: 'Error on findOne: ' + err }), { status: 400 });
  });

  // CHECK IF TOKEN ID ALREADY EXISTS IN TOWN
  const townUserExists = town.townUsers.find(
    (user: { tokenID: any }) => user.tokenID === townUser.tokenID,
  );
  if (townUserExists) {
    console.log('Token ID already exists in Town: ', townID);
    return new Response(JSON.stringify({ msg: 'Token ID already exists in Town: ' + townID }));
  }

  // Add user to townUsers array
  town.townUsers.push(townUser);

  await town.save().catch((err: Error) => {
    console.log('Error on save: ', err);
    return new Response(JSON.stringify({ error: 'Error on save: ' + err }), { status: 400 });
  });
  return new Response(JSON.stringify({ msg: 'Successfully updated Town: ' + town }));
}
