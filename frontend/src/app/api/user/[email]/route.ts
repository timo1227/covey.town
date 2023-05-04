import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';
import bcrypt from 'bcrypt';

interface ParamsType {
  params: {
    email: string;
  };
}

const validatePassword = (password: string, passwordConfirm: string) => {
  if (password !== passwordConfirm) {
    return { error: 'Passwords do not match' };
  }
};

export async function PUT(req: Request, { params }: ParamsType) {
  try {
    await dbConnect();
    const { name, email, password, passwordConfirm } = await req.json();

    if (password || passwordConfirm) {
      const error = validatePassword(password, passwordConfirm);

      if (error) {
        return new Response(JSON.stringify(error), { status: 400 });
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Update user on MongoDB with hashed password
      const updatedUser = await User.findOneAndUpdate(
        { email: params.email },
        { name, email, hashedPassword },
        { new: true },
      );
      if (!updatedUser) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ Success: 'User updated' }));
    }

    // Update user on MongoDB
    const updatedUser = await User.findOneAndUpdate(
      { email: params.email },
      { name, email },
      { new: true },
    );
    if (!updatedUser) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

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
