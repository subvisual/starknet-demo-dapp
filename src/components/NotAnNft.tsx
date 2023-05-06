import request, { gql } from "graphql-request";
import { useEffect, useState } from "react";
import { truncate } from "../lib/utils";
import Provenance from "./Provenance";

const query = gql`
  query {
    users {
      balance
      address
    }
    assets {
      assetId
      owner {
        address
      }
      minter {
        address
      }
      transfers {
        to {
          address
          balance
        }
        from {
          address
          balance
        }
        transaction {
          timestamp
        }
      }
    }
  }
`;
const ENDPOINT = "http://localhost:3000";

export default function NotAnNft() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [detail, setDetail] = useState<Asset | null>();

  async function fetchData() {
    const req = await request<MainQuery>(ENDPOINT, query);

    if (req) {
      setAssets(req.assets);
      setUsers(req.users.filter((item) => item.address !== "0x0"));
    }
  }

  const totalAssets = users.reduce((prev, item) => prev + item.balance, 0);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="my-12 text-left">
        <h2 className="text-2xl font-bold">
          Not an NFT contract
          <span className="text-sm ml-4">
            0x07430f19983c33b585d35e60ab2487110d3d57e41f24917d7aa1a49ba28abea5
          </span>
        </h2>
        <p>{totalAssets} assets minted</p>
      </header>
      <main className="flex gap-8 justify-between pb-8">
        <section className="grid gap-8 grid-cols-3">
          {assets.map((item) => (
            <div key={item.assetId} className="w-[240px]">
              <div className="artwork">
                <p>Author: {truncate(item.minter.address)}</p>
              </div>
              <div className="flex justify-between py-4 px-1">
                <button
                  className="font-bold text-md"
                  onClick={() => setDetail(item)}
                >
                  Asset {item.assetId}
                </button>
                <p>{truncate(item.owner.address)}</p>
              </div>
            </div>
          ))}
        </section>
        {detail ? (
          <Provenance asset={detail} close={() => setDetail(null)} />
        ) : (
          <section className="text-left border-l border-gray-500 pl-8 w-[300px]">
            <h4 className="font-bold text-xl mb-4">Users</h4>
            {users.map((user) => (
              <div key={user.address} className="mb-4">
                <strong>{truncate(user.address)}</strong>
                <p>Assets owned: {user.balance}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
