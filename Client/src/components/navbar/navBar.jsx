const Navbar = () => {
  
    return (
      <div className="w-full h-[109px] flex flex-col items-start justify-between text-center text-21xl text-lightblue font-heading-1-roboto-36pt">
        <div className="relative bg-steelblue w-full h-[109px] z-[0]" />
        <div className="my-0 absolute top-[17.5px] right-3 left-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] w-full flex flex-row items-center justify-between z-[1]">
          <li>
            <a href="/home" className="text-white">Home</a>
          </li>
        </div>
      </div>
    );
  };
  
  export default Navbar;