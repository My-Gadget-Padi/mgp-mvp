import { Badge } from "@/components/ui/badge";

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
        className={`relative w-full ${center ? "mx-auto mt-10 text-center flex flex-wrap justify-center items-center" : ""}`}
        style={{ maxWidth: width, marginBottom: mb }}
      >
        <Badge
          variant="outline"
          className="absolute py-2 -top-10 left-1/2 transform -translate-x-1/2"
        >
          {subtitle}
        </Badge>
    
        <h2 className="mb-2 text-3xl font-bold text-indigo-600 dark:text-white">
          {title}
        </h2>
        <p className="text-base !leading-relaxed text-slate-900">{paragraph}</p>
      </div>
    </>
  );
};

export default SectionTitle;