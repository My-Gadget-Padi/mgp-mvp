
const SectionTitle = ({
  subtitle,
  title,
  paragraph,
  width = "570px",
  center,
  mb = "40px",
}: {
  subtitle: string;
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
}) => {
  return (
    <>
      <div
        className={`w-full ${center ? "mx-auto text-center flex flex-wrap justify-center items-center" : ""}`}
        style={{ maxWidth: width, marginBottom: mb }} 
      >

        <div className="rounded-full text-sm px-5 py-1 border-[.5px] bg-white text-black  text-center dark:text-white sm:text-lg  md:text-sm mb-3 font-light">{subtitle}</div>
        <h2 className="mb-2 text-2xl font-bold daark:text-indigo-600 text-white">
          {title}
        </h2>
        <p className="text-base font-thin text-white dark:text-slate-900 ">{paragraph}</p>
      </div>
    </>
  );
};

export default SectionTitle;
