import Image from "../assets/img.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Image2 from "../assets/resume.webp";
import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";
import { Carousel, CarouselItem, CarouselContent } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import AddImage from "@/assets/add.webp";
import CreateImage from "@/assets/create.png";
import SendImage from "@/assets/send.webp";

const Arrays = [
  { title: "Select a template from our collection." },
  { title: "Build you resume using our easy to use resume builder." },
  { title: "Download your resume." },
];

const style = "px-3 py-1.5 bg-slate-100 rounded-md mr-1 text-sm font-medium h-8 dark:bg-gray-800 dark:text-white";

export default function Home() {
  const navigate = useNavigate();
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const storedToken = localStorage.getItem("token");

  const handleSelectTemplate = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      {/* main-section */}
      <div className="grid lg:space-x-16 lg:grid-cols-2 px-10 py-4 md:py-20 md:px-24 lg:px-28 lg:pt-8 dark:bg-gray-900 lg:overflow-hidden">
        <div>
          <h1 className="text-4xl md:text-6xl lg:text-5xl lg:pt-4 text-center font-semibold dark:text-white">
            Your resume in three <span className="text-teal-500">easy</span> steps
          </h1>
          <p className="text-gray-500 text-base md:text-sm font-normal leading-6 mt-8 text-center">
            Resume builder tools that assemble well-formatted resume. Through a resume builder, you can create a
            professional-looking resume in a few easy steps. This resume builder offer different template options, so
            you can select the template that best fits your needs and style.
          </p>
          <div className="leading-10 mt-7 dark:text-gray-400">
            <Step />
          </div>
        </div>
        <div className="2xl:px-32">
          <img src={Image} className="h-96 w-full text-center mx-6" />
        </div>
      </div>
      <div>
        <div className="">
          <p className="dark:border-white font-bold text-3xl text-center mt-12 dark:text-white dark:mt-8 md:mt-16 lg:mt-0">
            Create <span className="text-teal-500">ATS-Optimized</span> Resumes in 3 Easy Steps
          </p>
          <p className="mx-28 mt-4">
            We make it easy to create professional, ATS-friendly resumes tailored for platforms like LinkedIn, Naukri,
            and Workday. Highlight your skills and experience to stand out to recruiters in the USA, India, UK, and
            beyond. Save time with instant keyword optimization and job-specific templates.
          </p>
        </div>
        <div className="grid md:grid-cols-2 col-span-3 items-center mx-20 mt-6">
          <div className="flex justify-center items-center">
            <img src={Image2} className="rounded-xl md:px-2 px-2 lg:my-4 w-80 h-80" />
          </div>

          <div className="md:mx-4 min-w-44 lg:max-w-md">
            <Carousel
              plugins={[plugin.current]}
              className=""
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {Array.from({ length: 3 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <Card className="border-none">
                      <CardContent className="flex items-center justify-center">
                        <div className="">
                          {index === 0 && (
                            <div>
                              <div className="text-2xl mb-2">Create Unlimited Resumes</div>
                              <p className="mb-10">
                                Stand out in today’s competitive job market with KudosWall. Easily create unlimited,
                                job-specific resumes and tailored cover letters in minutes. Our AI ensures each document
                                is optimized for ATS systems, helping you apply to more jobs faster and with confidence.
                              </p>
                            </div>
                          )}
                          {index === 1 && (
                            <div>
                              <div className="text-2xl mb-2">Build your resume</div>
                              <p className="mb-10">
                                Building a strong resume is essential to showcasing your skills, experiences, and
                                achievements to potential employers. With expert guidance, you can create a resume that
                                highlights your strengths and presents your qualifications in the most compelling way.{" "}
                              </p>
                            </div>
                          )}
                          {index === 2 && (
                            <div>
                              <div className="text-2xl mb-2">Download resume</div>
                              <p className="mb-10">
                                Once you've perfected your resume, it's time to finalize it and download a copy for your
                                job applications. With a polished resume, you can confidently submit your details to
                                potential employers, ensuring that your qualifications and experience are presented in
                                the best possible light.
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
              <button className="carousel-arrow left-0" onClick={() => plugin.current.prev()}>
                &#8592;
              </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
              <button className="carousel-arrow right-0" onClick={() => plugin.current.next()}>
                &#8594;
              </button>
            </div> */}
          </div>
        </div>
        <div className="flex justify-center mb-24">
          <Button className="bg-gradient-to-br from-teal-500 to-gray-500 py-6 px-8 text-lg" onClick={handleSelectTemplate}>
            <span>{!storedToken ? "Login and Build your Resume" : "Build your Resume"}</span>
          </Button>
        </div>
      </div>
      <div className="mx-28 grid grid-cols-3 space-x-8 mt-2">
        <img src={AddImage} className="w-60 h-60" />
        <img src={CreateImage} className="w-60 h-60" />
        <img src={SendImage} className="w-60 h-60" />
      </div>
      <div className="mx-28 grid grid-cols-3 space-x-8 mt-8 mb-16">
        <p className="pr-6">
          <div className="font-bold text-2xl">1. Add</div>
          Add your work experience, education, and accomplishments using AI-powered suggestions. Import your resume or
          LinkedIn profile to automatically enhance it with relevant keywords.
        </p>
        <p>
          <div className="font-bold text-2xl">2. Create</div>2. Create Choose from a library of professional templates
          designed for ATS compatibility. Generate a fully formatted resume, cover letter, or LinkedIn profile that's
          customized for your target job.
        </p>
        <p>
          <div className="font-bold text-2xl">3. Send</div>3. Send Download your resume as PDF, DOC, or TXT, and
          confidently share it with recruiters. Showcase your online portfolio to impress hiring managers and secure
          your dream job!
        </p>
      </div>
    </>
  );
}
const Step = () => {
  return (
    <div>
      {Arrays.map((item, index) => (
        <div key={index} className="flex my-2 items-center">
          <span className={`${style}`}>{index + 1}</span>
          <p className="leading-5">{item.title}</p>
        </div>
      ))}
    </div>
  );
};
