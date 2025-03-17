import { z } from "zod";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { Mail, Phone, MapPin } from "lucide-react";
import { Skill } from "../reducer/action";
import html2pdf from "html2pdf.js";
import { Form } from "@/components/ui/form";
import { ResumeComponent } from "@/components/elements/ResumeComponent";
import { PersonalDetailsForm } from "@/components/elements/PersonalDetailsForm";
import { ProjectDetails } from "@/components/elements/ProjectDetails";
import { EducationDetails } from "@/components/elements/EducationDetails";
import { WorkExperience } from "@/components/elements/WorkExperience";
import { AwardsAchievements } from "@/components/elements/AwardsAchievements";
import { TechnicalSkills } from "@/components/elements/TechnicalSkills";

const formSchema = z.object({
  personalDetails: z.object({
    name: z.string().min(3, "Name is required"),
    summary: z.string().optional(),
    workProfile: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().min(10, "Phone number is required"),
    email: z.string().email("Invalid email address").min(5, "Email is required"),
  }),
  category: z.string().optional(),

  technicalSkills: z.string().min(1, "At least one skill is required"),
  education: z.array(
    z.object({
      school: z.string().min(5, "School Name is required"),
      year: z
        .string()
        .min(4, "Year is required")
        .regex(/^\d{4}$/, "Invalid Year format"),
      degree: z.string(),
      cgpa: z.string().optional(),
    }),
  ),
  projects: z.array(
    z.object({
      project: z.string().min(5, "Projects are required"),
      techStack: z.string(),
      link: z.string().optional(),
      description: z.array(z.string()),
    }),
  ),
  workExperience: z.array(
    z.object({
      companyName: z.string().min(5, "Company Name is required"),

      startDate: z
        .string()
        .min(4, "Year is required")
        .regex(/^\d{4}$/, "Invalid Year format"),
      endDate: z
        .string()
        .min(4, "Year is required")
        .regex(/^\d{4}$/, "Invalid Year format"),
      designation: z.string().min(3, "Designation is required"),
    }),
  ),
  awardsAchievements: z.array(
    z.object({
      title: z.string(),
      descriptions: z.string(),
    }),
  ),
});

export default function Resume3() {
  const [isOpen, setIsOpen] = useState(true);
  const resumeRef = useRef<HTMLDivElement>(null);
  const skills = useSelector((state: any) => state.tasks.tasks);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [selectedColor, setSelectedColor] = useState(0);
  const [previewBlob, setPreviewBlob] = useState(null);

  const colors = [
    { text: "text-violet-800", border: "border-violet-800", bg: "bg-violet-900" },
    { text: "text-pink-900", border: "border-pink-900", bg: "bg-pink-900" },
    { text: "text-yellow-900", border: "border-yellow-900", bg: "bg-yellow-900" },
    { text: "text-indigo-900", border: "border-indigo-900", bg: "bg-indigo-900" },
  ];

  const changeColor = (index: number) => {
    setSelectedColor(index);
  };

  const currentColor = colors[selectedColor];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalDetails: {
        name: "",
        summary: "",
        workProfile: "",
        address: "",
        phone: "",
        email: "",
      },
      technicalSkills: "",
      education: [
        {
          school: "",
          year: "",
          degree: "",
        },
      ],
      projects: [
        {
          project: "",
          link: "",
          description: [""],
        },
      ],
      workExperience: [
        {
          companyName: "",
          startDate: "",
          endDate: "",
          designation: "",
        },
      ],

      awardsAchievements: [
        {
          title: "",
          descriptions: "",
        },
      ],
    },
  });

  const { watch } = form;

  const summary = watch("personalDetails.summary");
  const phone = watch("personalDetails.phone");
  const projects = watch("projects");
  const workExperience = watch("workExperience");
  const education = watch("education");
  const awardsAchievements = watch("awardsAchievements");
  const showData = form.watch();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle1 = () => {
    setIsOpen1(!isOpen1);
  };

  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };
  const handleDownloadPDF = () => {
    const element = resumeRef.current;
    if (!element) {
      console.error("Resume element not found!");
      return;
    }

    element.style.width = "794";
    element.style.minHeight = "1123px";
    element.style.overflow = "hidden";

    const options = {
      filename: `${showData.personalDetails.name || "Resume"}.pdf`,
     
      html2canvas: {
        scale: 2,
        width: 794,
        height: element.offsetHeight,
        windowWidth: 794,
        windowHeight: 1123,
        logging: true,
        letterRendering: true,
        useCORS: true,
        onclone: (clonedDoc: any) => {
          clonedDoc.body.style.width = "794px";
          clonedDoc.body.style.minHeight = "1123px";
          clonedDoc.body.style.overflow = "hidden";
          clonedDoc.body.style.marginLeft = "10px";
          clonedDoc.body.style.display = "flex";
          clonedDoc.body.style.justifyContent = "center";
          clonedDoc.body.style.alignItems = "center";
        },
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        putOnlyUsedFonts: true,
        floatPrecision: 16,
      },
    };

    console.log("Generating PDF from element:", element);
    html2pdf()
      .from(element)
      .set(options)
      .outputPdf("blob")
      .then((pdfBlob: Blob) => {
        console.log("PDF Blob generated, size:", pdfBlob.size, "bytes");
        if (pdfBlob.size > 0) {
          setPreviewBlob(pdfBlob);
        } else {
          console.error("PDF Blob is empty");
        }
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <div className="m-0 px-8 py-5 dark:bg-gray-900 grid lg:flex lg:flex-row lg:space-x-10 bg-teal-700 max-h-min overflow-clip relative bottom-0">
      <div className="rounded-md lg:w-2/5 h-600 overflow-y-auto px-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <PersonalDetailsForm control={form.control} />

            <div className="border border-gray-100 rounded-md p-6 bg-white">
              <TechnicalSkills />
              <EducationDetails control={form.control} onClick={handleToggle1} Open1={isOpen1} />
              <ProjectDetails control={form.control} />
              <WorkExperience control={form.control} onClick={handleToggle2} Open2={isOpen2} />
              <AwardsAchievements control={form.control} onClick={handleToggle} Open={isOpen} />
              <div className="flex justify-end">
                <Button type="button" className="mt-2 bg-teal-600 text-white" onClick={handleDownloadPDF}>
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <div ref={resumeRef} id="resume" className="lg:w-3/5">
        <div className=" bg-white text-black rounded-md pb-6 shadow-2xl shadow-black max-h-max">
          <div className={`flex justify-between items-center px-9 py-6 ${currentColor.bg} text-white`}>
            <div>
              <p className="font-bold text-3xl text-center mb-2">
                {showData.personalDetails.name ? showData.personalDetails.name : "Your Name"}
              </p>
              <p className="ml-2">
                {" "}
                {showData.personalDetails.workProfile ? showData.personalDetails.workProfile : "workProfile"}
              </p>
            </div>

            <div className=" text-white text-sm mb-2">
              <p className="flex items-center gap-1">
                {showData.personalDetails.address && (
                  <span className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    <span>{showData.personalDetails.address}</span>
                  </span>
                )}
              </p>

              <ResumeComponent Icon={Mail} title={showData.personalDetails.email} placeholder="Email Address" />
              <ResumeComponent Icon={Phone} value="+91" title={phone} placeholder="Phone Number" />
            </div>
          </div>

          <div className="font-normal text-xs my-2 mx-8">{summary ? summary : "Summary"}</div>

          {isOpen2 && (
            <div className={`my-4 border-t-4 ${currentColor.border} mx-8 grid grid-cols-3 gap-x-4`}>
              <div className={`font-bold text-lg pl-3 px-2 py-1 col-span-1 ${currentColor.text}`}>Work Experience</div>
              <div className="ml-5 col-span-2">
                {" "}
                {workExperience &&
                  workExperience.map((title, index) => (
                    <div key={index} className="grid grid-cols-2 py-2 w-full">
                      <div className="grid justify-start">
                        <p className="text-base">{title.designation ? title.designation : "Designation"}</p>
                        <i className="ml-3 text-sm">{title.companyName ? title.companyName : "Company Name"}</i>
                      </div>

                      <div className="grid  justify-end mr-4 font-normal">
                        <div className="text-sm">
                          <i>{title.startDate ? title.startDate : "Start Date"}</i>
                          <span className="mx-1">-</span>
                          <i>{title.endDate ? title.endDate : "End Date"}</i>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className={`my-4 border-t-4 ${currentColor.border} mx-8  grid grid-cols-3 gap-x-4`}>
            <div className={`font-bold text-lg pl-3 px-2 py-1 col-span-1 ${currentColor.text}`}>Technical Skills</div>
            <ul className="mx-6  cursor-pointer list-disc text-base col-span-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {skills.length == 0 && <span className="">Add your skills here</span>}
              {skills.map((skill: Skill) => (
                <li key={skill.id}>
                  <span className="">{skill.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`my-4 border-t-4 ${currentColor.border} mx-8  grid grid-cols-3 gap-x-4`}>
            <div className={`font-bold text-lg pl-3 px-2 py-1 col-span-1 ${currentColor.text}`}>Projects</div>
            <div className="col-span-2">
              {projects &&
                projects.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center space-x-2">
                      <p className="pl-6 mt-2">{item.project ? item.project : "Project Title"}</p>
                      <span>|</span>
                      <p className="mt-2">{item.techStack ? item.techStack : "Tech Stack"}</p>
                      <span>|</span>
                      <Link to={item.link} className="underline text-indigo-800 pt-1">
                        Link
                      </Link>
                    </div>

                    <p className="pl-6 text-sm text-black leading-5">
                      {item.description &&
                        item.description.map((desc, index) => (
                          <li key={index} className="">
                            {desc || "Description"}
                          </li>
                        ))}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {isOpen1 && (
            <div className={`my-4 border-t-4 ${currentColor.border} mx-8  grid grid-cols-3 gap-x-4`}>
              <div className={`font-bold text-lg pl-4 py-1 col-span-1 ${currentColor.text}`}>Education</div>
              <div className="col-span-2">
                {education &&
                  education.map((text, index) => (
                    <div key={index}>
                      <div className="flex justify-between">
                        <p className="pl-6 pt-1">{text.school ? text.school : "School Name"}</p>

                        <i className="px-4 pt-1">{text.year ? text.year : "year"}</i>
                      </div>
                      <div className="flex items-center">
                        <p className="pl-10 pb-2 text-sm">{text.degree ? text.degree : "Degree"}</p>
                        <span className="pl-2 pb-2">|</span>
                        <p className="pl-2 pb-2 text-sm">{text.cgpa ? text.cgpa : "cgpa  "}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {isOpen && (
            <div className={`my-4 border-t-4 ${currentColor.border} mx-8  grid grid-cols-3 gap-x-4`}>
              <div className={`font-bold text-lg pl-4 px-2 py-1  col-span-1 ${currentColor.text}`}>
                Awards and Achievements
              </div>
              <div className="col-span-2">
                {awardsAchievements &&
                  awardsAchievements.map((items, index) => (
                    <div key={index} className="pt-1 text-base flex flex-col flex-wrap">
                      <li className="pl-6 text-sm">
                        {items.title ? items.title : "Share your key accomplishments and accolades here..."}
                      </li>
                      <p className="pl-12 text-sm text-black break-words">
                        {items.descriptions ? items.descriptions : "Description"}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-4 my-3 w-36 mr-8 bg-white p-4 rounded-md ">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => changeColor(index)}
              className={`w-4 h-4 rounded-full ${color.bg} hover:opacity hover:opacity-80`}
            ></button>
          ))}
        </div>
      </div>
      {previewBlob && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="relative w-full h-full">
            <PDFPreview
              pdfBlob={previewBlob}
              fileName={`${showData.personalDetails.name || "Resume"}.pdf`}
              onClose={() => setPreviewBlob(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface PDFPreviewProps {
  pdfBlob: Blob;
  fileName: string;
  onClose: () => void;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ pdfBlob, fileName, onClose }) => {
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPdfDataUrl(reader.result as string);
    };
    reader.readAsDataURL(pdfBlob);

    return () => {
      setPdfDataUrl(null);
    };
  }, [pdfBlob]);

  const downloadResumeHandler = () => {
    const link = document.createElement("a");
    link.href = pdfDataUrl!;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="fixed inset-0 w-full h-full m-0 p-0 overflow-hidden z-50">
      <button
        onClick={downloadResumeHandler}
        className="fixed top-2 right-12 z-50 px-4 py-2 bg-white border border-gray-900 text-black text-base rounded-md hover:bg-gray-100 mr-10"
      >
        Download PDF
      </button>
      <button
        onClick={onClose}
        className="fixed top-2 right-2 z-50 px-4 py-2 bg-red-500 text-white text-base rounded-md hover:bg-red-600"
      >
        Close
      </button>

      {pdfDataUrl && (
        <object data={pdfDataUrl} type="application/pdf" className="w-full h-full border-none">
          <p>
            Your browser does not support PDF preview. <a href={pdfDataUrl}>Download instead</a>.
          </p>
        </object>
      )}
    </div>
  );
};
