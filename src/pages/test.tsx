import { type NextPage } from "next";

import { api } from "../utils/api";

const Test: NextPage = () => {
  const data = api.character.getAll.useQuery();
  const mutation = api.character.create.useMutation();
  return (
    <div>
      <div className="flex gap-2">
        <pre>
          <code>{JSON.stringify(data, null, 4)}</code>
        </pre>
        <pre>
          <code>{JSON.stringify(mutation, null, 4)}</code>
        </pre>
      </div>
      <button onClick={() => mutation.mutate({ gwid: 22224, name: "qifei" })}>
        create
      </button>
    </div>
  );
};
export default Test;
