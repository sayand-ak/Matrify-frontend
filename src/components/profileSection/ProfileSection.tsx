import { IconType } from 'react-icons';

interface ProfileSectionProps {
  icons: IconType[];
  headings: string[];
  data: (string | JSX.Element | number)[];
}

function ProfileSection({ icons, headings, data }: ProfileSectionProps){
  return (
    <div className="container flex gap-4 px-16 text-[14px] md:text-[15px]">
      <div className="icons flex flex-col gap-6 text-[21px] md:text-[23px]">
        {icons.map((Icon, index) => (
          <Icon key={index} />
        ))}
      </div>

      <div className="heading flex flex-col min-w-32 md:min-w-36 gap-6">
        {headings.map((heading, index) => (
          <p key={index}>{heading}</p>
        ))}
      </div>

      <div className="data font-semibold flex flex-col gap-6 min-w-32 ">
        {data.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}

export default ProfileSection;
