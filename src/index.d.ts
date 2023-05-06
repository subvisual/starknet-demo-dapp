type User = {
  address: string;
  balance: number;
};

type Transfer = {
  to: User;
  from: User;
  transaction: {
    timestamp: number;
  };
};

type Asset = {
  id: string;
  assetId: string;
  transfers: Transfer[];
  owner: User;
  minter: User;
};

type MainQuery = {
  assets: Asset[];
  users: User[];
};
