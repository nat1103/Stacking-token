import Navigation from "./components/Navigation";
import Approve from "./web3/Approve";
import Balance from "./web3/Balance";
import Stacking from "./web3/Stacking";
import Transfert from "./web3/Transfert";
import Wagmi from "./web3/Wagmi";

function App() {
  return (
    <main className="dark:bg-stone-900 pb-2">
      <Wagmi>
        <Navigation />
        <section className="dark:bg-stone-800 w-11/12 ml-auto p-2 mr-2 rounded-xl h-[90vh]">
          <header className="flex gap-2 flex-wrap">
        <Transfert />
        <Approve />
        <Stacking />
          </header>
        <Balance />
        </section>
      </Wagmi>
    </main>
  );
}

export default App;
