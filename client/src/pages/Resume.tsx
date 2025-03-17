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

export default function Resume() {
  const [isOpen, setIsOpen] = useState(true);
  const skills = useSelector((state: any) => state.tasks.tasks);
  const [isOpen1, setIsOpen1] = useState(true);
    const resumeRef = useRef<HTMLDivElement>(null);
  const [isOpen2, setIsOpen2] = useState(true);
  const [previewBlob, setPreviewBlob] = useState(null);


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
  console.log(watch("projects"));
  // const summary = watch("personalDetails.summary");
  const workProfile = watch("personalDetails.workProfile");
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
          const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);
        reader.onloadend = () => {
          const base64PDF = reader.result; 
          saveResumeDataToFirestore(base64PDF);
        };
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
                <Button type="submit" className="mt-2 bg-teal-600 text-white" onClick={handleDownloadPDF}>
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <div ref={resumeRef} id="resume" className="lg:w-3/5 bg-white text-gray-600 rounded-md py-6 shadow-2xl shadow-black max-h-max">
        <p className="font-bold text-3xl text-center mb-2">
          {showData.personalDetails.name ? showData.personalDetails.name : "Your Name"}{" "}
        </p>
        <div className="flex space-x-4 items-center justify-center text-gray-500 text-sm mb-2">
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
        <div className="text-center font-bold text-lg my-2">{workProfile ? workProfile : "Work Profile"}</div>

        {isOpen2 && (
          <div className="mb-3 border-t-2 border-gray-400 mx-12">
            <div className="font-bold text-lg pl-3 px-2 py-1">Work Experience</div>
            {workExperience &&
              workExperience.map((title, index) => (
                <div key={index}>
                  <div className="flex justify-between  text-base">
                    <p className="pl-6">{title.designation ? title.designation : "Designation"}</p>
                    <div>
                      <i className="pl-4 pr-2 text-sm">{title.startDate ? title.startDate : "Start Date"}</i>
                      <span>-</span>
                      <i className="pl-2 pr-4 text-sm">{title.endDate ? title.endDate : "End Date"}</i>
                    </div>
                  </div>
                  <i className="pl-8 text-sm">{title.companyName ? title.companyName : "Company Name"}</i>
                </div>
              ))}
          </div>
        )}

        <div className="mb-3 border-t-2 border-gray-400 mx-12">
          <div className="font-bold text-lg pl-3 px-2 py-1">Technical Skills</div>
          <ul className="mx-6  cursor-pointer list-disc text-base pl-3">
            {skills.length == 0 && <span className="pl-3">Add your skills here</span>}
            {skills.map((skill: Skill) => (
              <li key={skill.id}>
                <span className="">{skill.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-3 border-t-2 border-gray-400 mx-12">
          <div className="font-bold text-lg pl-3 px-2 py-1">Projects</div>
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

                <p className="pl-6 text-sm text-gray-600 leading-5">
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

        {isOpen1 && (
          <div className="mb-3 border-t-2 border-gray-400 mx-12">
            <div className="font-bold text-lg pl-4 py-1">Education</div>
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
        )}

        {isOpen && (
          <div className="mb-3 border-t-2 border-gray-400 mx-12">
            <div className="font-bold text-lg pl-4 px-2 py-1">Awards and Achievements</div>
            {awardsAchievements &&
              awardsAchievements.map((items, index) => (
                <div key={index} className="pt-1 text-base flex flex-col flex-wrap">
                  <li className="pl-6 text-sm">
                    {items.title ? items.title : "Share your key accomplishments and accolades here..."}
                  </li>
                  <p className="pl-12 text-sm text-gray-500 break-words">
                    {items.descriptions ? items.descriptions : "Description"}
                  </p>
                </div>
              ))}
          </div>
        )}
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


