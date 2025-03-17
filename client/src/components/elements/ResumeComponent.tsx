type ResumeComponentProps = {
  Icon: any;
  title: string;
  placeholder: string;
  value?: string;
};

export const ResumeComponent = ({ Icon, title, value, placeholder }: ResumeComponentProps) => {
  return (
    <p className="flex items-center gap-1">
      <Icon className="size-4" />
      {title && title.length > 0 ? (
        <div>
          <span>{value} </span>
          <span>{title}</span>
        </div>
      ) : (
        placeholder
      )}
    </p>
  );
};
