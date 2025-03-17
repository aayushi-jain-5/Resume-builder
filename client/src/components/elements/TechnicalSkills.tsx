import { addSkill, deleteSkill, Skill } from "../../reducer/action";
import { useDispatch, useSelector } from "react-redux";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { FormLabel } from "../ui/form";

const skillSuggestions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "CSS",
  "HTML",
  "Python",
  "Java",
  "Go",
  "Docker",
  "AWS",
  "Git",
  "SQL",
  "GraphQL",
  "Redux",
  "Jest",
];

export const TechnicalSkills = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state: any) => state.tasks.tasks);
  const [inputSkill, setInputSkill] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(skillSuggestions);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputSkill(value);

    if (value.length > 0) {
      setFilteredSuggestions(skillSuggestions.filter((skill) => skill.toLowerCase().includes(value.toLowerCase())));
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions(skillSuggestions);
    }
  };

  const handleFocus = () => {
    setShowSuggestions(!showSuggestions);
    setFilteredSuggestions(skillSuggestions);
  };

  const handleAddSkill = () => {
    if (inputSkill.trim() !== "") {
      dispatch(addSkill(inputSkill));
      setInputSkill("");
    }
  };

  const handleDeleteSkill = (skillId: number) => {
    dispatch(deleteSkill(skillId));
  };

  const handleSelectSuggestion = (suggestion: string) => {
    dispatch(addSkill(suggestion));
    setShowSuggestions(!showSuggestions);
    setInputSkill("");
    setFilteredSuggestions([]);
  };
  return (
    <div>
      <div className="cursor-pointer">
        <FormLabel className=" text-md md:text-xl font-bold dark:text-white">Technical Skills</FormLabel>
        <hr />
        <div>
          <input
            value={inputSkill}
            onChange={handleInputChange}
            onClick={handleFocus}
            placeholder="Add Skills ..."
            className={`flex h-9 w-full rounded-md border border-input px-3 py-1 text-base shadow-sm  focus-visible:outline-none focus-visible:ring-blue-500  md:text-sm mt-5  focus-visible:ring-1 `}
          />

          <div className="flex justify-end">
            <Plus
              onClick={handleAddSkill}
              className={`pt-5 size-9 -ml-9 font-bold -my-12 ${inputSkill.length > 0 ? "" : "hidden"}`}
              type="button"
            />
          </div>
        </div>
      </div>

      {filteredSuggestions.length > 0 && showSuggestions && (
        <ul className="mt-1 w-full bg-white border border-gray-300 rounded-md shadow-sm max-h-60 overflow-y-auto z-10">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      <ul className="flex flex-wrap gap-x-2 cursor-pointer">
        {skills.map((skill: Skill) => (
          <li
            key={skill.id}
            className="inline-flex gap-x-1 items-center justify-center text-sm px-1 pb-0.5 text-white bg-teal-500 rounded-3xl text-center mt-2 max-w-max"
          >
            <span className="pl-2">{skill.text}</span>
            <X className="size-4 pt-0.5" onClick={() => handleDeleteSkill(skill.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
