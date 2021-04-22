import './App.css';

function App() {
  return (
    <div className="h-screen">
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl">Tailblocks</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900">First Link</a>
            <a className="mr-5 hover:text-gray-900">Second Link</a>
            <a className="mr-5 hover:text-gray-900">Third Link</a>
            <a className="mr-5 hover:text-gray-900">Fourth Link</a>
          </nav>
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Button
          </button>
        </div>
      </header>

      <div className="container pt-16 md:pt-32 m-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-1/2 justify-center items-start overflow-y-hidden">
          <h1 className="my-4 text-5xl lg:text-6xl text-blue text-left">
            NFT assets collateralized lending and rent protocol on Ethereum
          </h1>
          <div className="flex flex-row space-x-4 py-5"></div>
        </div>
      </div>
      <footer className="container flex py-8 mx-auto">
        <div className="flex flex-grow space-x-4">
          <p className="text-black text-opacity-80">Github</p>
          <p className="text-black text-opacity-80">Twitter</p>
          <p className="text-black text-opacity-80">Medium</p>
          <p className="text-black text-opacity-80">Discord</p>
        </div>

        <p className="text-black">&copy; Unfold.finance 2021</p>
      </footer>
    </div>
  );
}

export default App;
