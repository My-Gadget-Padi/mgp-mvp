
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

        <div className="rounded-full lg:w-4/12  md:w-8/12 sm:w-full text-sm px-2 py-1 border-[.5px] border-black text-black  text-center dark:text-white sm:text-lg  md:text-sm mb-3 font-light">{subtitle}</div>
        <h2 className="mb-2 text-3xl font-bold text-indigo-600 dark:text-white">
          {title}
        </h2>
        <p className="text-base !leading-relaxed text-slate-900 ">{paragraph}</p>
      </div>
    </>
  );
};

export default SectionTitle;
