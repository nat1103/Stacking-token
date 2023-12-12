import Button from "../components/Button";
import Card from "../components/Card";
import { useStackingUnstake } from "./wagmi.generated";

const UnStacking = () => {
  const { write, error: contractWriteError } = useStackingUnstake({});

  return (
    <>
      <Card title="Unstacking" className="mt-4">
        <div className="flex flex-col text-slate-50">
          <Button onClick={() => write({})} className="w-full">
            Unstack
          </Button>
        </div>
      </Card>
      {contractWriteError?.message && (
        <div className="text-red-500"> {contractWriteError.message}</div>
      )}
    </>
  );
};

export default UnStacking;
