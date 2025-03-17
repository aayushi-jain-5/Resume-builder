
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img6 from "../assets/img6.jpg";
import img10 from "../assets/img10.webp";
import Image from "../assets/image.avif";


export default function About() {

  return (
    <div className=" dark:bg-gray-900 overflow-x-hidden">
      <div className="grid md:grid-cols-2 space-x-2 mx-8 mt-4 items-center lg:mr-16">
        <div className="flex justify-center">
          <img src={Image} className="h-60 lg:h-72 rounded-lg items-center ml-3 md:ml-0 lg:ml-12 xl:ml-36" />
        </div>

        <div className="dark:text-white xl:pr-20">
          <h1 className="font-bold mt-6 text-5xl mb-6 text-gray-700 dark:text-white">
            About <span className="text-teal-500">Us</span>
          </h1>
          <p className="text-lg lg:text-xl mb-4 font-semibold">
            Resume Builder is the ultimate tool for job seekers. Get access to:
          </p>
          <ul className="list-disc pl-6 lg:pl-6 text-sm lg:text-base font-medium mb-4 leading-8 xl:leading-9 text-gray-700 dark:text-white ">
            <li>Our advanced resume builder tool</li>
            <li>Professionally designed resume templates and examples created by certified resume experts</li>
            <li>Expert tips from industry recruiters and career coaches</li>
          </ul>
          <p className="text-base lg:text-lg font-medium sm:mx-4 md:mx-0 lg:mb-6">
            The Resume Builder app shows you how to make an ideal resume, including what keywords and relevant
            experience you should use.
          </p>
        </div>
      </div>
      <div className="px-9 mt-6 lg:mx-12 text-lg lg:text-3xl mb-6 font-semibold dark:text-white lg:leading-relaxed md:px-16 md:mb-10 xl:mb-16">
        More than 1 million job seekers have created resumes with Resume Builder. They've landed jobs at companies
        including:
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-3 text-black mx-20 md:mx-24 items-center gap-6 md:gap-4 md:pl-12 lg:pl-1 lg:gap-x-6 lg:mt-9 dark:bg-white dark:py-4">
        <img src={img1} className="h-4 sm:h-7 dark:pl-4 md:ml-4" />
        <img src={img2} className="h-4 sm:h-8" />
        <img src={img10} className="h-3 sm:h-6 lg:ml-3 ml-2" />
        <img src={img4} className="h-4 sm:h-8 r-2" />
        <img src={img5} className="h-3 sm:h-6 mb-2 ml-2" />
        <img src={img6} className="h-5 sm:h-10" />
      </div>
      
    </div>
  );
}