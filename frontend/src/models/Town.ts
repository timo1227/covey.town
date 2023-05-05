import mongoose from 'mongoose';

interface Chat {
  userName: string;
  tokenID: string;
}

interface Users {
  userName: string;
  tokenID: string;
  chats: Array<Chat>;
  messages: [
    {
      userName: string;
      tokenID: string;
      message: string;
      timestamp: string;
    },
  ];
}

const TownSchema = new mongoose.Schema({
  townID: { type: String, required: true },
  townFriendlyName: { type: String, required: true },
  townUsers: { type: Array<Users>(), required: true },
});

const Town = mongoose.models.Town || mongoose.model('Town', TownSchema);

export default Town;
