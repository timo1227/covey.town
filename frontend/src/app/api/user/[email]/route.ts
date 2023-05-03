import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';

interface ParamsType {
  params: {
    email: string;
  };
}

interface UserData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export async function PUT(req: Request, { params }: ParamsType) {
  try {
    // await dbConnect();
    const { name, email, password, passwordConfirm } = await req.json();

    console.log(' name: ', name);
    console.log(' email: ', email);

    return new Response(JSON.stringify({ Success: 'User updated' }));
  } catch (error) {
    console.log('dbConnect error: ', error);
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }
}

export async function DELETE(req: Request, { params }: ParamsType) {
  try {
    await dbConnect();
    // Delete user from database
    const deletedUser = await User.findOneAndDelete({ email: params.email });
    if (!deletedUser) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(deletedUser));
  } catch (error) {
    console.log('dbConnect error: ', error);
    return Response.error();
  }
}
