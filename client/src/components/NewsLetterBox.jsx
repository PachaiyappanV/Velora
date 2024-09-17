const NewsLetterBox = () => {
  return (
    <section className="text-center">
      <p className="text-xl md:text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <form className="w-full sm:w-1/2 flex items-center my-6 mx-auto pl-3 border">
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
          onClick={(e) => e.preventDefault()}
        >
          SUBSCRIBE
        </button>
      </form>
    </section>
  );
};

export default NewsLetterBox;
